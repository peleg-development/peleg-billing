---@diagnostic disable: undefined-global
local Framework = nil
local QB = nil
local ESX = nil
local VRP = nil

---@return string framework 'qb'|'esx'|'oldesx'|'vrp'|'unknown'
local function detectFramework()
	if Framework then return Framework end
	
	-- Check for QBCore
	pcall(function()
		QB = exports['qb-core'] and exports['qb-core']:GetCoreObject() or nil
	end)
	if QB and type(QB.Functions) == 'table' then
		Framework = 'qb'
		return Framework
	end
	
	-- Check for modern ESX
	pcall(function()
		ESX = exports['es_extended']:getSharedObject()
	end)
	if ESX then
		Framework = 'esx'
		return Framework
	end
	
	
	pcall(function()
		while ESX == nil do
			TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
			Citizen.Wait(0)
		end
	end)
	if ESX then
		Framework = 'oldesx'
		return Framework
	end
	
	Framework = 'unknown'
	return Framework
end

detectFramework()
Citizen.CreateThread(function()
	detectFramework()
end)

---@param source number
---@return any player
local function getPlayer(source)
	if Framework == 'qb' then
		return QB.Functions.GetPlayer(source)
	elseif Framework == 'esx' or Framework == 'oldesx' then
		return ESX.GetPlayerFromId(source)
	end
	return nil
end

---@param player any
---@return string cid
local function getCid(player)
	if not player then return '' end
	if Framework == 'qb' then
		return tostring(player.PlayerData.citizenid)
	elseif Framework == 'esx' or Framework == 'oldesx' then
		return tostring(player.identifier or player.getIdentifier())
	end
	return ''
end

---@param player any
---@return string jobName, number grade
local function getJob(player)
	if not player then return '', 0 end
	if Framework == 'qb' then
		local job = player.PlayerData and player.PlayerData.job or {}
		local grade = 0
		if job then
			if type(job.grade) == 'table' and job.grade.level then
				grade = tonumber(job.grade.level) or 0
			else
				grade = tonumber(job.grade) or 0
			end
		end
		return tostring(job.name or ''), grade
	elseif Framework == 'esx' or Framework == 'oldesx' then
		local job = player.getJob and player.getJob() or player.job
		return tostring(job and job.name or ''), tonumber(job and (job.grade or (job.grade_level or 0)) or 0)
	end
	return '', 0
end

---@param player any
---@return string
local function getCharacterName(player)
    if not player then return '' end
    if Framework == 'qb' then
        local ci = player.PlayerData and player.PlayerData.charinfo or nil
        local first = ci and (ci.firstname or '') or ''
        local last = ci and (ci.lastname or '') or ''
        return (first .. ' ' .. last):gsub('^%s*(.-)%s*$', '%1')
    elseif Framework == 'esx' or Framework == 'oldesx' then
        if player.getName then return tostring(player.getName()) end
        if player.getIdentity then
            local id = player:getIdentity()
            if id then return tostring((id.firstname or '') .. ' ' .. (id.lastname or '')):gsub('^%s*(.-)%s*$', '%1') end
        end
        if player.name then return tostring(player.name) end
    end
    return ''
end

---@param player any
---@return boolean
local function isBoss(player)
    if not player then return false end
    if Framework == 'qb' then
        local job = player.PlayerData and player.PlayerData.job or {}
        if job and type(job.isboss) ~= 'nil' then
            return job.isboss == true
        end
        if job and type(job.grade) == 'table' and type(job.grade.isboss) ~= 'nil' then
            return job.grade.isboss == true
        end
        return false
    elseif Framework == 'esx' or Framework == 'oldesx' then
        local job = player.getJob and player.getJob() or player.job
        local gradeName = job and (job.grade_name or job.gradeName)
        return tostring(gradeName or ''):lower() == 'boss'
    end
    return false
end

---@param src number
---@param account 'cash'|'bank'
---@param amount number
---@return boolean success, string|nil reason
local function removeMoney(src, account, amount)
	local player = getPlayer(src)
	if not player then return false, 'player_not_found' end
	amount = math.floor(math.max(0, amount))
	
	if Framework == 'qb' then
		local ok = player.Functions.RemoveMoney(account, amount, 'billing_charge')
		return ok == true, ok and nil or 'insufficient_funds'
	elseif Framework == 'esx' or Framework == 'oldesx' then
		if account == 'cash' then
			local cash = player.getMoney()
			if cash >= amount then player.removeMoney(amount) return true end
			return false, 'insufficient_funds'
		else
			local bank = player.getAccount('bank').money
			if bank >= amount then player.removeAccountMoney('bank', amount) return true end
			return false, 'insufficient_funds'
		end
	end
	return false, 'unknown_framework'
end

---@param cid string
---@param account 'cash'|'bank'
---@param amount number
---@param reason string
---@return boolean success
local function refundByCid(cid, account, amount, reason)
	amount = math.floor(math.max(0, amount))
	
	if Framework == 'qb' then
		local player = QB.Functions.GetPlayerByCitizenId(cid)
		if player then
			player.Functions.AddMoney(account, amount, reason or 'billing_refund')
			return true
		else
			MySQL.update('UPDATE players SET '..(account == 'bank' and 'bank' or 'money')..' = '..(account == 'bank' and 'bank' or 'money')..' + ? WHERE citizenid = ?', { amount, cid })
			return true
		end
	elseif Framework == 'esx' or Framework == 'oldesx' then
		local xPlayer = ESX.GetPlayerFromIdentifier(cid)
		if xPlayer then
			if account == 'cash' then xPlayer.addMoney(amount) else xPlayer.addAccountMoney('bank', amount) end
			return true
		else
			if account == 'cash' then
				MySQL.update('UPDATE users SET money = money + ? WHERE identifier = ?', { amount, cid })
			else
				MySQL.update('UPDATE users SET bank = bank + ? WHERE identifier = ?', { amount, cid })
			end
			return true
		end
	end
	return false
end

---@param cid string
---@return any player
local function getPlayerByCid(cid)
	if Framework == 'qb' then
		return QB.Functions.GetPlayerByCitizenId(cid)
	elseif Framework == 'esx' or Framework == 'oldesx' then
		return ESX.GetPlayerFromIdentifier(cid)
	end
	return nil
end

---@param src number
---@param account 'cash'|'bank'
---@param amount number
---@param reason string
---@return boolean success
local function addMoney(src, account, amount, reason)
	amount = math.floor(math.max(0, amount))
	
	local player = getPlayer(src)
	if not player then return false end
	
	if Framework == 'qb' then
		player.Functions.AddMoney(account, amount, reason or 'billing_add')
		return true
	elseif Framework == 'esx' or Framework == 'oldesx' then
		if account == 'cash' then 
			player.addMoney(amount) 
		else 
			player.addAccountMoney('bank', amount) 
		end
		return true
	end
	return false
end

---@param cid string
---@param account 'cash'|'bank'
---@param amount number
---@param reason string
---@return boolean success
local function addMoneyOffline(cid, account, amount, reason)
	amount = math.floor(math.max(0, amount))
	
	if Framework == 'qb' then
		MySQL.update('UPDATE players SET '..(account == 'bank' and 'bank' or 'money')..' = '..(account == 'bank' and 'bank' or 'money')..' + ? WHERE citizenid = ?', { amount, cid })
		return true
	elseif Framework == 'esx' or Framework == 'oldesx' then
		if account == 'cash' then
			MySQL.update('UPDATE users SET money = money + ? WHERE identifier = ?', { amount, cid })
		else
			MySQL.update('UPDATE users SET bank = bank + ? WHERE identifier = ?', { amount, cid })
		end
		return true
	end
	return false
end

---@param cid string
---@param account 'cash'|'bank'
---@param amount number
---@return boolean success, string|nil reason
local function removeMoneyOffline(cid, account, amount)
	amount = math.floor(math.max(0, amount))
	
	if Framework == 'qb' then
		local currentMoney = MySQL.scalar.await('SELECT '..(account == 'bank' and 'bank' or 'money')..' FROM players WHERE citizenid = ?', { cid })
		if not currentMoney or currentMoney < amount then
			return false, 'insufficient_funds'
		end
		MySQL.update('UPDATE players SET '..(account == 'bank' and 'bank' or 'money')..' = '..(account == 'bank' and 'bank' or 'money')..' - ? WHERE citizenid = ?', { amount, cid })
		return true
	elseif Framework == 'esx' or Framework == 'oldesx' then
		local currentMoney = MySQL.scalar.await('SELECT '..(account == 'cash' and 'money' or 'bank')..' FROM users WHERE identifier = ?', { cid })
		if not currentMoney or currentMoney < amount then
			return false, 'insufficient_funds'
		end
		if account == 'cash' then
			MySQL.update('UPDATE users SET money = money - ? WHERE identifier = ?', { amount, cid })
		else
			MySQL.update('UPDATE users SET bank = bank - ? WHERE identifier = ?', { amount, cid })
		end
		return true
	end
	return false, 'unknown_framework'
end

---@param src number
---@return table
local function getNearbyPlayers(src)
    local list = {}
    local srcPed = GetPlayerPed(src)
    local srcCoords = GetEntityCoords(srcPed)
    local radius = Config.NearbyRadius or 5.0

    for _, id in ipairs(GetPlayers()) do
        local tid = tonumber(id)
        if tid and tid ~= src then
            local ped = GetPlayerPed(tid)
            if ped ~= 0 then
                local coords = GetEntityCoords(ped)
                if #(srcCoords - coords) <= radius then
                    local p = getPlayer(tid)
                    if p then
                        local job, grade = getJob(p)
                        local name
                        if Framework == 'qb' then
                            local ci = p.PlayerData and p.PlayerData.charinfo or nil
                            name = ci and ((ci.firstname or '') .. ' ' .. (ci.lastname or '')) or GetPlayerName(tid)
                        elseif Framework == 'esx' or Framework == 'oldesx' then
                            name = (p.getName and p.getName()) or GetPlayerName(tid)
                        else
                            name = GetPlayerName(tid)
                        end
                        table.insert(list, {
                            source = tid,
                            cid = getCid(p),
                            name = name,
                            job = job,
                            grade = grade
                        })
                    end
                end
            end
        end
    end

    return list
end

---@return table
local function getJobs()
	if Framework == 'qb' then
		return QB.Shared and QB.Shared.Jobs or {}
	elseif Framework == 'esx' or Framework == 'oldesx' then
		return ESX and ESX.Jobs or {}
	end
	return {}
end

---@param job string
---@return table|string[]
local function getJobGrades(job)
	local jobs = getJobs()
	local j = jobs and jobs[job]
	if not j then return {} end
	if Framework == 'qb' then
		return j.grades or {}
	elseif Framework == 'esx' or Framework == 'oldesx' then
		return j.grades or {}
	end
	return {}
end

Bridge = {
	framework = detectFramework,
	getPlayer = getPlayer,
	getCid = getCid,
	getJob = getJob,
    isBoss = isBoss,
    getCharacterName = getCharacterName,
	removeMoney = removeMoney,
	refundByCid = refundByCid,
	getPlayerByCid = getPlayerByCid,
	addMoney = addMoney,
	addMoneyOffline = addMoneyOffline,
	removeMoneyOffline = removeMoneyOffline,
	getNearbyPlayers = getNearbyPlayers,
	getJobs = getJobs,
	getJobGrades = getJobGrades,
}

return Bridge