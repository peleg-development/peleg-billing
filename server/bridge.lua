---@diagnostic disable: undefined-global

local Framework = nil
local QB = nil
local ESX = nil
local VRP = nil

---@return boolean
local function _resStarted(name)
	if type(GetResourceState) ~= 'function' then return true end
	return GetResourceState(name) == 'started'
end

---@return string framework 'qb'|'esx'|'unknown'
local function detectFramework(force)
	if Framework and Framework ~= 'unknown' and not force then
		return Framework
	end

	if _resStarted('qb-core') then
		local ok, obj = pcall(function()
			return exports['qb-core']:GetCoreObject()
		end)
		if ok and obj and type(obj.Functions) == 'table' then
			QB = obj
			Framework = 'qb'
			return Framework
		end
	end

	if _resStarted('es_extended') then
		local ok, obj = pcall(function()
			return exports['es_extended']:getSharedObject()
		end)
		if ok and obj then
			ESX = obj
			Framework = 'esx'
			return Framework
		end
	end

	Framework = 'unknown'
	return Framework
end

Citizen.CreateThread(function()
	for _ = 1, 120 do
		if detectFramework(true) ~= 'unknown' then return end
		Citizen.Wait(500)
	end
end)

---@return string
local function ensureFramework()
	if not Framework or Framework == 'unknown' then
		detectFramework(true)
	end
	return Framework
end

---@param name string
---@return string sqlExpr
local function esxAccountsValueExpr(name)
	local obj = "JSON_EXTRACT(COALESCE(accounts, '{}'), '$." .. name .. "')"
	local arrSearch = "JSON_SEARCH(COALESCE(accounts, '[]'), 'one', '" .. name .. "', NULL, '$[*].name')"
	local arrPath = "REPLACE(JSON_UNQUOTE(" .. arrSearch .. "), '.name', '.money')"
	local arr = "JSON_EXTRACT(COALESCE(accounts, '[]'), " .. arrPath .. ")"
	return "CAST(COALESCE(JSON_UNQUOTE(COALESCE(" .. obj .. ", " .. arr .. ")), '0') AS SIGNED)"
end

---@param name string
---@return string sqlExpr
local function esxAccountsPathExpr(name)
	local arrSearch = "JSON_SEARCH(COALESCE(accounts, '[]'), 'one', '" .. name .. "', NULL, '$[*].name')"
	local arrPath = "REPLACE(JSON_UNQUOTE(" .. arrSearch .. "), '.name', '.money')"
	local objPath = "'$." .. name .. "'"
	return "COALESCE(NULLIF(" .. arrPath .. ", ''), " .. objPath .. ")"
end

---@param source number
---@return any player
local function getPlayer(source)
	ensureFramework()
	if Framework == 'qb' and QB then
		return QB.Functions.GetPlayer(source)
	elseif Framework == 'esx' and ESX then
		return ESX.GetPlayerFromId(source)
	end
	return nil
end

---@param player any
---@return string cid
local function getCid(player)
	ensureFramework()
	if not player then return '' end
	if Framework == 'qb' then
		return tostring(player.PlayerData and player.PlayerData.citizenid or '')
	elseif Framework == 'esx' then
		return tostring(player.identifier or (player.getIdentifier and player.getIdentifier()) or '')
	end
	return ''
end

---@param player any
---@return string jobName, number grade
local function getJob(player)
	ensureFramework()
	if not player then return '', 0 end

	if Framework == 'qb' then
		local job = (player.PlayerData and player.PlayerData.job) or {}
		local grade = 0
		if type(job) == 'table' then
			if type(job.grade) == 'table' and job.grade.level ~= nil then
				grade = tonumber(job.grade.level) or 0
			else
				grade = tonumber(job.grade) or 0
			end
		end
		return tostring(job.name or ''), grade
	end

	if Framework == 'esx' then
		local job = (player.getJob and player.getJob()) or player.job
		local grade = 0
		if type(job) == 'table' then
			grade = tonumber(job.grade or job.grade_level or 0) or 0
		end
		return tostring(job and job.name or ''), grade
	end

	return '', 0
end

---@param player any
---@return string
local function getCharacterName(player)
	ensureFramework()
	if not player then return '' end

	if Framework == 'qb' then
		local ci = player.PlayerData and player.PlayerData.charinfo or nil
		local first = (ci and (ci.firstname or '')) or ''
		local last = (ci and (ci.lastname or '')) or ''
		return (first .. ' ' .. last):gsub('^%s*(.-)%s*$', '%1')
	end

	if Framework == 'esx' then
		if player.getName then return tostring(player.getName()) end
		if player.name then return tostring(player.name) end
	end

	return ''
end

---@param player any
---@return boolean
local function isBoss(player)
	ensureFramework()
	if not player then return false end

	if Framework == 'qb' then
		local job = player.PlayerData and player.PlayerData.job or {}
		if type(job) == 'table' then
			if job.isboss ~= nil then return job.isboss == true end
			if type(job.grade) == 'table' and job.grade.isboss ~= nil then return job.grade.isboss == true end
		end
		return false
	end

	if Framework == 'esx' then
		local job = (player.getJob and player.getJob()) or player.job
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
	ensureFramework()
	local player = getPlayer(src)
	if not player then return false, 'player_not_found' end
	amount = math.floor(math.max(0, amount))

	if Framework == 'qb' then
		local ok = player.Functions.RemoveMoney(account, amount, 'billing_charge')
		return ok == true, (ok == true) and nil or 'insufficient_funds'
	end

	if Framework == 'esx' then
		if account == 'cash' then
			local cash = player.getMoney and player.getMoney() or 0
			if cash >= amount then player.removeMoney(amount) return true end
			return false, 'insufficient_funds'
		end
		local acc = player.getAccount and player.getAccount('bank') or nil
		local bank = (acc and acc.money) or 0
		if bank >= amount then player.removeAccountMoney('bank', amount) return true end
		return false, 'insufficient_funds'
	end

	return false, 'unknown_framework'
end

---@param cid string
---@param account 'cash'|'bank'
---@param amount number
---@param reason string
---@return boolean success
local function refundByCid(cid, account, amount, reason)
	ensureFramework()
	amount = math.floor(math.max(0, amount))

	if Framework == 'qb' then
		local player = QB and QB.Functions.GetPlayerByCitizenId(cid) or nil
		if player then
			player.Functions.AddMoney(account, amount, reason or 'billing_refund')
			return true
		end
		local jsonPath = (account == 'bank') and '$.bank' or '$.cash'
		MySQL.update.await([[
			UPDATE players
			SET money = JSON_SET(
				COALESCE(money, '{}'),
				?,
				CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(COALESCE(money, '{}'), ?)), '0') AS SIGNED) + ?
			)
			WHERE citizenid = ?
		]], { jsonPath, jsonPath, amount, cid })
		return true
	end

	if Framework == 'esx' then
		local xPlayer = ESX and ESX.GetPlayerFromIdentifier(cid) or nil
		if xPlayer then
			if account == 'cash' then xPlayer.addMoney(amount) else xPlayer.addAccountMoney('bank', amount) end
			return true
		end

		local name = (account == 'cash') and 'money' or 'bank'
		local pathExpr = esxAccountsPathExpr(name)
		local valExpr = esxAccountsValueExpr(name)
		MySQL.update.await(
			("UPDATE users SET accounts = JSON_SET(COALESCE(accounts, '{}'), %s, %s + ?) WHERE identifier = ?"):format(pathExpr, valExpr),
			{ amount, cid }
		)
		return true
	end

	return false
end

---@param cid string
---@return any player
local function getPlayerByCid(cid)
	ensureFramework()
	if Framework == 'qb' and QB then
		return QB.Functions.GetPlayerByCitizenId(cid)
	elseif Framework == 'esx' and ESX then
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
	ensureFramework()
	amount = math.floor(math.max(0, amount))

	local player = getPlayer(src)
	if not player then return false end

	if Framework == 'qb' then
		player.Functions.AddMoney(account, amount, reason or 'billing_add')
		return true
	end

	if Framework == 'esx' then
		if account == 'cash' then player.addMoney(amount) else player.addAccountMoney('bank', amount) end
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
	ensureFramework()
	amount = math.floor(math.max(0, amount))

	if Framework == 'qb' then
		local jsonPath = (account == 'bank') and '$.bank' or '$.cash'
		MySQL.update.await([[
			UPDATE players
			SET money = JSON_SET(
				COALESCE(money, '{}'),
				?,
				CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(COALESCE(money, '{}'), ?)), '0') AS SIGNED) + ?
			)
			WHERE citizenid = ?
		]], { jsonPath, jsonPath, amount, cid })
		return true
	end

	if Framework == 'esx' then
		local name = (account == 'cash') and 'money' or 'bank'
		local pathExpr = esxAccountsPathExpr(name)
		local valExpr = esxAccountsValueExpr(name)
		MySQL.update.await(
			("UPDATE users SET accounts = JSON_SET(COALESCE(accounts, '{}'), %s, %s + ?) WHERE identifier = ?"):format(pathExpr, valExpr),
			{ amount, cid }
		)
		return true
	end

	return false
end

---@param cid string
---@param account 'cash'|'bank'
---@param amount number
---@return boolean success, string|nil reason
local function removeMoneyOffline(cid, account, amount)
	ensureFramework()
	amount = math.floor(math.max(0, amount))

	if Framework == 'qb' then
		local jsonPath = (account == 'bank') and '$.bank' or '$.cash'
		local affected = MySQL.update.await([[
			UPDATE players
			SET money = JSON_SET(
				COALESCE(money, '{}'),
				?,
				CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(COALESCE(money, '{}'), ?)), '0') AS SIGNED) - ?
			)
			WHERE citizenid = ?
			  AND CAST(COALESCE(JSON_UNQUOTE(JSON_EXTRACT(COALESCE(money, '{}'), ?)), '0') AS SIGNED) >= ?
		]], { jsonPath, jsonPath, amount, cid, jsonPath, amount })
		if (affected or 0) > 0 then return true end
		return false, 'insufficient_funds'
	end

	if Framework == 'esx' then
		local name = (account == 'cash') and 'money' or 'bank'
		local pathExpr = esxAccountsPathExpr(name)
		local valExpr = esxAccountsValueExpr(name)
		local q = ("UPDATE users SET accounts = JSON_SET(COALESCE(accounts, '{}'), %s, %s - ?) WHERE identifier = ? AND %s >= ?"):format(pathExpr, valExpr, valExpr)
		local affected = MySQL.update.await(q, { amount, cid, amount })
		if (affected or 0) > 0 then return true end
		return false, 'insufficient_funds'
	end

	return false, 'unknown_framework'
end

---@param src number
---@return table
local function getNearbyPlayers(src)
	ensureFramework()
	local list = {}

	local srcPed = GetPlayerPed(src)
	if not srcPed or srcPed == 0 then return list end

	local srcCoords = GetEntityCoords(srcPed)
	local radius = (Config and Config.NearbyRadius) or 5.0

	for _, id in ipairs(GetPlayers()) do
		local tid = tonumber(id)
		if tid and tid ~= src then
			local ped = GetPlayerPed(tid)
			if ped and ped ~= 0 then
				local coords = GetEntityCoords(ped)
				if #(srcCoords - coords) <= radius then
					local p = getPlayer(tid)
					if p then
						local job, grade = getJob(p)
						local name = getCharacterName(p)
						if name == '' then name = GetPlayerName(tid) end
						list[#list + 1] = { source = tid, cid = getCid(p), name = name, job = job, grade = grade }
					end
				end
			end
		end
	end

	return list
end

---@return table
local function getJobs()
	ensureFramework()
	if Framework == 'qb' then
		return (QB and QB.Shared and QB.Shared.Jobs) or {}
	elseif Framework == 'esx' then
		if ESX and ESX.GetJobs then
			local ok, jobs = pcall(function() return ESX.GetJobs() end)
			if ok and type(jobs) == 'table' then return jobs end
		end
		return (ESX and ESX.Jobs) or {}
	end
	return {}
end

---@param job string
---@return table|string[]
local function getJobGrades(job)
	ensureFramework()
	local jobs = getJobs()
	local j = jobs and jobs[job]
	if not j then return {} end
	return j.grades or {}
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
