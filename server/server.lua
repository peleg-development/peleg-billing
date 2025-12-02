local Bridge = require('server.bridge')
local LogsModule = require('server.logs')
local Logs = LogsModule.Logs
local Boss = require('server.boss')

local Locales = {}

--- Loads the active locale table from JSON file on resource start.
local function loadLocale()
    local code = (Config and Config.Locale) or 'en'
    local resource = GetCurrentResourceName()
    local rel = (('locale/%s.json'):format(code))
    local path = ('%s/%s'):format(GetResourcePath(resource), rel)
    local file = io.open(path, 'rb')
    if not file then
        if code ~= 'en' then
            rel = 'locale/en.json'
            path = ('%s/%s'):format(GetResourcePath(resource), rel)
            file = io.open(path, 'rb')
        end
    end
    if not file then
        Locales = {}
        return
    end
    local content = file:read('*a')
    file:close()
    local ok, data = pcall(function() return json.decode(content) end)
    if ok and type(data) == 'table' then
        Locales = data
    else
        Locales = {}
    end
end

--- Returns a localized string for the given key.
---@param key string
---@param fallback string
local function L(key, fallback)
    local v = Locales[key]
    if v == nil or v == '' then return fallback end
    return v
end

AddEventHandler('onResourceStart', function(res)
    if res == GetCurrentResourceName() then
        loadLocale()
    end
end)

---@param src number
---@return any, string, number
local function getActorInfo(src)
    local player = Bridge.getPlayer(src)
    if not player then return nil, '', 0 end
    local job, grade = Bridge.getJob(player)
    return player, job, grade
end

---@param job string
---@param cid string
---@return number
--- Loads the job access configuration from the database.
---@param job string
---@return table
local function loadJobAccess(job)
    local row = MySQL.single.await('SELECT data FROM billing_job_perms WHERE job = ?', { job })
    if not row or not row.data or row.data == '' then
        return { grades = {} }
    end
    local ok, cfg = pcall(function() return json.decode(row.data) end)
    if not ok or type(cfg) ~= 'table' then
        return { grades = {} }
    end
    cfg.grades = cfg.grades or {}
    return cfg
end

--- Persists the job access configuration in the database.
---@param job string
---@param config table
local function saveJobAccess(job, config)
    local payload = json.encode({ grades = config and config.grades or {} })
    local exists = MySQL.scalar.await('SELECT 1 FROM billing_job_perms WHERE job = ? LIMIT 1', { job })
    if exists then
        MySQL.update.await('UPDATE billing_job_perms SET data = ? WHERE job = ?', { payload, job })
    else
        MySQL.insert.await('INSERT INTO billing_job_perms (job, data) VALUES (?, ?)', { job, payload })
    end
end

--- Checks if a grade has a specific permission according to saved access config.
---@param job string
---@param grade number
---@param permission 'sendBill'|'refundBill'
---@return boolean
local function hasPermission(job, grade, permission)
    local cfg = loadJobAccess(job)
    local entry = cfg.grades and cfg.grades[tostring(grade)] or nil
    if type(entry) ~= 'table' then return false end
    return entry[permission] == true
end

--- Returns the minimal grade that has sendBill permission for a job. Used by legacy UIs.
---@param job string
---@return number
local function getMinGrade(job)
    local cfg = loadJobAccess(job)
    local minGrade = 0
    if cfg and cfg.grades then
        for k, v in pairs(cfg.grades) do
            local lvl = tonumber(k) or 0
            if v and v.sendBill == true then
                if minGrade == 0 or lvl < minGrade then
                    minGrade = lvl
                end
            end
        end
    end
    return minGrade
end

---@param src number
---@return boolean, string
local function canOpenTablet(src)
    local player, job, _ = getActorInfo(src)
    if not player then return false, 'no_player' end
    for _, j in ipairs(Config.TabletJobs or {}) do
        if j == job then return true, '' end
    end
    return false, 'job_not_allowed'
end


---@class Bill
---@field id number
---@field cid string
---@field issuer_cid string
---@field issuer_name string
---@field job string
---@field amount number
---@field description string
---@field account string
---@field status string
---@field created_at string
---@field paid_at string|nil

---@param cid string
---@param limit number|nil
---@param search string|nil
---@return Bill[]
local function fetchBillsByCid(cid, limit, search)
    local query = 'SELECT * FROM billing_bills WHERE cid = ?'
    local params = { cid }
    
    if search and search ~= '' then
        query = query .. ' AND (issuer_name LIKE ? OR receiver_name LIKE ? OR description LIKE ? OR issuer_cid LIKE ? OR cid LIKE ?)'
        local searchParam = '%' .. search .. '%'
        table.insert(params, searchParam)
        table.insert(params, searchParam)
        table.insert(params, searchParam)
        table.insert(params, searchParam)
        table.insert(params, searchParam)
    end
    
    query = query .. ' ORDER BY created_at DESC'
    
    if limit then
        query = query .. ' LIMIT ?'
        table.insert(params, limit)
    end
    
    local rows = MySQL.query.await(query, params)
	return rows or {}
end

---@param job string
---@param limit number|nil
---@param search string|nil
---@return Bill[]
local function fetchBillsByJob(job, limit, search)
	local query = 'SELECT * FROM billing_bills WHERE job = ?'
    local params = { job }
    
    if search and search ~= '' then
        query = query .. ' AND (issuer_name LIKE ? OR receiver_name LIKE ? OR description LIKE ? OR issuer_cid LIKE ? OR cid LIKE ?)'
        local searchParam = '%' .. search .. '%'
        table.insert(params, searchParam)
        table.insert(params, searchParam)
        table.insert(params, searchParam)
        table.insert(params, searchParam)
        table.insert(params, searchParam)
    end
    
    query = query .. ' ORDER BY created_at DESC'
    
    if limit then
        query = query .. ' LIMIT ?'
        table.insert(params, limit)
    end
    
	local rows = MySQL.query.await(query, params)
	return rows or {}
end

---@param cid string
local function getPlayerWallpaper(cid)
	local row = MySQL.single.await('SELECT wallpaper FROM billing_wallpapers WHERE cid = ?', { cid })
	if row and row.wallpaper and row.wallpaper ~= '' then return row.wallpaper end
	return Config.DefaultWallpaper 
end

---@param src number
---@param url string
local function setPlayerWallpaper(src, url)
    local player = Bridge.getPlayer(src)
    if not player then return end
    local cid = Bridge.getCid(player)
    if not cid or cid == '' then return end
    local exists = MySQL.scalar.await('SELECT 1 FROM billing_wallpapers WHERE cid = ?', { cid })
    if exists then
        MySQL.update.await('UPDATE billing_wallpapers SET wallpaper = ? WHERE cid = ?', { url or '', cid })
    else
        MySQL.insert.await('INSERT INTO billing_wallpapers (cid, wallpaper) VALUES (?, ?)', { cid, url or '' })
    end
end

---@param billId number
---@param src number
---@return boolean, string|nil
local function payBill(billId, src)
    local bill = MySQL.single.await('SELECT * FROM billing_bills WHERE id = ? AND status = "unpaid"', { billId })
    if not bill then return false, 'bill_not_found' end
    local actor = Bridge.getPlayer(src)
    if not actor then return false, 'no_player' end
    local actorCid = Bridge.getCid(actor)
    if tostring(actorCid) ~= tostring(bill.cid) then return false, 'not_bill_owner' end
    local account = bill.account == 'cash' and 'cash' or 'bank'
    local ok, reason = Bridge.removeMoney(src, account, bill.amount)
    if not ok then return false, reason or 'payment_failed' end
    MySQL.update.await('UPDATE billing_bills SET status = "paid", paid_at = NOW() WHERE id = ?', { billId })
    local logActor = LogsModule.identity(actorCid, GetPlayerName(src), src)
    local target = LogsModule.identity(bill.cid, nil, nil)

    -- Handle billing cut if enabled
    local cutAmount = 0
    if Config.BillingCutEnabled and Config.BillingCutPercentage and Config.BillingCutPercentage > 0 and bill.issuer_cid and bill.issuer_cid ~= '' then
        cutAmount = math.floor(bill.amount * (Config.BillingCutPercentage / 100))
        if cutAmount > 0 then
            -- Debug print
            print(string.format("[BILLING CUT] Processing cut for bill %d: %d%% of %d = %d", bill.id, Config.BillingCutPercentage, bill.amount, cutAmount))
            print(string.format("[BILLING CUT] Issuer CID: %s", bill.issuer_cid))
            
            local issuerSrc = nil
            for _, playerSrc in ipairs(GetPlayers()) do
                local player = Bridge.getPlayer(tonumber(playerSrc))
                if player and Bridge.getCid(player) == bill.issuer_cid then
                    issuerSrc = tonumber(playerSrc)
                    break
                end
            end
            
            if issuerSrc then
                -- Issuer is online, give money directly
                local cutAccount = 'bank' -- Always give cut to bank account for consistency
                local success = Bridge.addMoney(issuerSrc, cutAccount, cutAmount, 'billing_cut')
                print(string.format("[BILLING CUT] Gave %d to online issuer %s (success: %s)", cutAmount, bill.issuer_cid, tostring(success)))
            else
                -- Issuer is offline, add to database
                local success = Bridge.addMoneyOffline(bill.issuer_cid, 'bank', cutAmount, 'billing_cut')
                print(string.format("[BILLING CUT] Gave %d to offline issuer %s (success: %s)", cutAmount, bill.issuer_cid, tostring(success)))
            end
        end
    else
        print(string.format("[BILLING CUT] Cut disabled or no issuer. Enabled: %s, Percentage: %s, Issuer: %s", 
            tostring(Config.BillingCutEnabled), 
            tostring(Config.BillingCutPercentage), 
            tostring(bill.issuer_cid)))
    end
    
    -- Add remaining amount to boss menu (total amount minus cut)
    local bossAmount = bill.amount - cutAmount
    if bossAmount > 0 then
        Boss.addMoney(bill.job, bossAmount)
        print(string.format("[BILLING CUT] Added %d to boss menu (original: %d, cut: %d)", bossAmount, bill.amount, cutAmount))
    end
    
    Logs:sendBillEvent('payBill', logActor, target, { amount = bill.amount, account = bill.account, billId = bill.id, job = bill.job, reason = bill.description })
    return true
end

---@param billId number
---@return boolean, string|nil
local function autoPayBill(billId)
    local bill = MySQL.single.await('SELECT * FROM billing_bills WHERE id = ? AND status = "unpaid"', { billId })
    if not bill then return false, 'bill_not_found' end
    
    -- Check if player has enough money
    local account = bill.account == 'cash' and 'cash' or 'bank'
    
    -- Try to find online player first
    local playerSrc = nil
    for _, src in ipairs(GetPlayers()) do
        local player = Bridge.getPlayer(tonumber(src))
        if player and Bridge.getCid(player) == bill.cid then
            playerSrc = tonumber(src)
            break
        end
    end
    
    if playerSrc then
        -- Player is online, check and remove money
        local ok, reason = Bridge.removeMoney(playerSrc, account, bill.amount)
        if not ok then return false, reason or 'payment_failed' end
    else
        -- Player is offline, check and remove from database
        local ok, reason = Bridge.removeMoneyOffline(bill.cid, account, bill.amount)
        if not ok then return false, reason or 'payment_failed' end
    end
    
    MySQL.update.await('UPDATE billing_bills SET status = "paid", paid_at = NOW() WHERE id = ?', { billId })
    
    -- Handle billing cut if enabled
    local cutAmount = 0
    if Config.BillingCutEnabled and Config.BillingCutPercentage and Config.BillingCutPercentage > 0 and bill.issuer_cid and bill.issuer_cid ~= '' then
        cutAmount = math.floor(bill.amount * (Config.BillingCutPercentage / 100))
        if cutAmount > 0 then
            print(string.format("[AUTO-PAY BILLING CUT] Processing cut for bill %d: %d%% of %d = %d", bill.id, Config.BillingCutPercentage, bill.amount, cutAmount))
            
            -- Try to find online issuer first
            local issuerSrc = nil
            for _, src in ipairs(GetPlayers()) do
                local player = Bridge.getPlayer(tonumber(src))
                if player and Bridge.getCid(player) == bill.issuer_cid then
                    issuerSrc = tonumber(src)
                    break
                end
            end
            
            if issuerSrc then
                -- Issuer is online, give money directly
                local cutAccount = 'bank' -- Always give cut to bank account for consistency
                local success = Bridge.addMoney(issuerSrc, cutAccount, cutAmount, 'billing_cut')
                print(string.format("[AUTO-PAY BILLING CUT] Gave %d to online issuer %s (success: %s)", cutAmount, bill.issuer_cid, tostring(success)))
            else
                -- Issuer is offline, add to database
                local success = Bridge.addMoneyOffline(bill.issuer_cid, 'bank', cutAmount, 'billing_cut')
                print(string.format("[AUTO-PAY BILLING CUT] Gave %d to offline issuer %s (success: %s)", cutAmount, bill.issuer_cid, tostring(success)))
            end
        end
    end
    
    -- Add remaining amount to boss menu (total amount minus cut)
    local bossAmount = bill.amount - cutAmount
    if bossAmount > 0 then
        Boss.addMoney(bill.job, bossAmount)
    end
    
    local logActor = LogsModule.identity(bill.cid, nil, nil)
    local target = LogsModule.identity(bill.cid, nil, nil)
    Logs:sendBillEvent('autoPayBill', logActor, target, { amount = bill.amount, account = bill.account, billId = bill.id, job = bill.job, reason = bill.description })
    return true
end

---@param billId number
---@param refundReason string
---@return boolean
local function refundBill(billId, refundReason, refunderSrc)
    local bill = MySQL.single.await('SELECT * FROM billing_bills WHERE id = ?', { billId })
    if not bill then return false end
    if bill.status == 'refunded' or bill.status == 'cancelled' then return true end
    local refunder = refunderSrc and Bridge.getPlayer(refunderSrc) or nil
    local refunderCid = refunder and Bridge.getCid(refunder) or nil
    local refunderName = refunder and Bridge.getCharacterName(refunder) or (refunderSrc and GetPlayerName(refunderSrc)) or 'system'
    local actor = LogsModule.identity(refunderCid, refunderName, refunderSrc)
    local target = LogsModule.identity(bill.cid, nil, nil)
    if bill.status == 'unpaid' then
        local okSafe = pcall(function()
            MySQL.update.await('UPDATE billing_bills SET status = "cancelled", refunded_at = NOW(), refunded_by_cid = ?, refunded_by_name = ? WHERE id = ?', { refunderCid or '', refunderName or '', billId })
        end)
        if not okSafe then
            MySQL.update.await('UPDATE billing_bills SET status = "cancelled" WHERE id = ?', { billId })
        end
        Logs:sendBillEvent('refundBill', actor, target, { amount = bill.amount, account = bill.account, billId = bill.id, job = bill.job, reason = 'cancel_unpaid:' .. (refundReason or bill.description or '') })
        return true
    end
    local ok = Bridge.refundByCid(bill.cid, bill.account == 'cash' and 'cash' or 'bank', bill.amount, refundReason or 'billing_refund')
    if not ok then return false end
    local okSafe = pcall(function()
        MySQL.update.await('UPDATE billing_bills SET status = "refunded", refunded_at = NOW(), refunded_by_cid = ?, refunded_by_name = ? WHERE id = ?', { refunderCid or '', refunderName or '', billId })
    end)
    if not okSafe then
        MySQL.update.await('UPDATE billing_bills SET status = "refunded" WHERE id = ?', { billId })
    end

    Boss.removeMoney(bill.job, bill.amount)
    Logs:sendBillEvent('refundBill', actor, target, { amount = bill.amount, account = bill.account, billId = bill.id, job = bill.job, reason = refundReason or bill.description })
    return true
end

---@param issuerSrc number
---@param targetSrc number
---@param job string
---@param amount number
---@param description string
---@param account 'cash'|'bank'
---@return number|false
local function createBill(issuerSrc, targetSrc, job, amount, description, account)
    amount = math.floor(math.max(0, amount))
    if Config and Config.TaxEnabled and tonumber(Config.TaxRate) and tonumber(Config.TaxRate) > 0 then
        local rate = tonumber(Config.TaxRate) / 100.0
        amount = math.floor(amount * (1.0 + rate))
    end
	local issuer = Bridge.getPlayer(issuerSrc)
	if not issuer then return false end
    local issuerName = Bridge.getCharacterName(issuer)
	local issuerCid = Bridge.getCid(issuer)
    local targetPlayer = targetSrc and Bridge.getPlayer(tonumber(targetSrc)) or nil
    if not targetPlayer then return false end
    local targetCid = Bridge.getCid(targetPlayer)
    local targetName = Bridge.getCharacterName(targetPlayer)
    local insertId = MySQL.insert.await('INSERT INTO billing_bills (cid, receiver_name, issuer_cid, issuer_name, job, amount, description, account, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, "unpaid")', {
        targetCid, tostring(targetName or ''), issuerCid, issuerName, job, amount, description or '', account or (Config.UseBankAsDefault and 'bank' or 'cash')
	})
    if insertId then
        local actor = LogsModule.identity(issuerCid, issuerName, issuerSrc)
        local target = LogsModule.identity(targetCid, targetName, nil)
        Logs:sendBillEvent('createBill', actor, target, { amount = amount, account = account, billId = insertId, job = job, reason = description or '' })
    end
	return insertId or false
end

lib.callback.register('peleg-billing:getNearbyPlayers', function(source)
	return Bridge.getNearbyPlayers(source)
end)

lib.callback.register('peleg-billing:getJobs', function(_)
	return Bridge.getJobs()
end)

lib.callback.register('peleg-billing:getJobGrades', function(_, job)
	return Bridge.getJobGrades(job)
end)

lib.callback.register('peleg-billing:getBillsByCid', function(_, cid)
	return fetchBillsByCid(cid)
end)

lib.callback.register('peleg-billing:getBillsByJob', function(_, job)
	return fetchBillsByJob(job)
end)

lib.callback.register('peleg-billing:getWallpaper', function(_, cid)
	return getPlayerWallpaper(cid)
end)

lib.callback.register('peleg-billing:getAccessConfig', function(_, job)
    return loadJobAccess(job)
end)

lib.callback.register('peleg-billing:getSelf', function(source)
	local player = Bridge.getPlayer(source)
	if not player then return nil end
	local cid = Bridge.getCid(player)
	local job, grade = Bridge.getJob(player)
	local name = GetPlayerName(source)
	local wallpaper = getPlayerWallpaper(cid)
	local boss = Bridge.isBoss and Bridge.isBoss(player) or false
    
    return { cid = cid, job = job, grade = grade, name = name, wallpaper = wallpaper, boss = boss, locale = Locales, disableHome = Config.DisableHomeScreen }
end)

--- @param data table { scope = 'job'|'self', job?: string, cid?: string, limit?: number, search?: string }
lib.callback.register('peleg-billing:fetchBills', function(source, data)
	local scope = data and data.scope or 'job'
	local limit = data and data.limit
	local search = data and data.search
	
	if scope == 'self' then
		local cid = (data and data.cid) or (function()
			local p = Bridge.getPlayer(source)
			return p and Bridge.getCid(p) or ''
		end)()
		return fetchBillsByCid(tostring(cid or ''), limit, search)
	else
		local job = (data and data.job) or (function()
			local p = Bridge.getPlayer(source)
			local j = p and select(2, Bridge.getJob(p)) or ''
			return j
		end)()
		return fetchBillsByJob(tostring(job or ''), limit, search)
	end
end)

lib.callback.register('peleg-billing:getMinGrade', function(source)
    local player, job, _ = getActorInfo(source)
    if not player then return 0 end
    return getMinGrade(job)
end)

RegisterNetEvent('peleg-billing:server:payBill', function(billId)
	local src = source
	local ok, reason = payBill(tonumber(billId), src)
    if not ok then
        local msg = reason or 'payment_failed'
        if msg == 'bill_not_found' then
            msg = L('notify_bill_not_found', 'Bill not found')
        elseif msg == 'not_bill_owner' then
            msg = L('notify_not_bill_owner', 'You cannot pay this bill')
        else
            msg = L('notify_payment_failed', 'Payment failed')
        end
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = msg })
    else
        TriggerClientEvent('ox_lib:notify', src, { type = 'success', description = L('notify_bill_paid', 'Bill paid') })
        local player = Bridge.getPlayer(src)
        if player then
            local cid = Bridge.getCid(player)
            local list = fetchBillsByCid(cid, 30)
            TriggerClientEvent('peleg-billing:client:refreshBills', src, list)
        end
	end
end)

RegisterNetEvent('peleg-billing:server:refundBill', function(billId, reason)
    local src = source
    local bill = MySQL.single.await('SELECT * FROM billing_bills WHERE id = ?', { tonumber(billId) })
    if not bill then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_bill_not_found', 'Bill not found') })
        return
    end
    local player, job, grade = getActorInfo(src)
    if not player then return end
    if job ~= bill.job then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_wrong_job', 'Wrong job') })
        return
    end
    if not hasPermission(job, tonumber(grade), 'refundBill') and not Config.PermssionsDisabled then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_no_permission', 'Insufficient permission') })
        return
    end
    local ok = refundBill(tonumber(billId), tostring(reason or ''), src)
    TriggerClientEvent('ox_lib:notify', src, { type = ok and 'success' or 'error', description = ok and L('notify_refunded', 'Refunded') or L('notify_refund_failed', 'Refund failed') })
    if ok then
        local player = Bridge.getPlayer(src)
        if player then
            local cid = Bridge.getCid(player)
            local list = fetchBillsByCid(cid, 30)
            TriggerClientEvent('peleg-billing:client:refreshBills', src, list)
        end
    end
end)

RegisterNetEvent('peleg-billing:server:createBill', function(targetSrc, job, amount, description, account)
    local src = source
    local allowed = canOpenTablet(src)
    if not allowed then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_job_not_allowed', 'Job not allowed') })
        return
    end
    local player, actorJob, grade = getActorInfo(src)
    if not player then return end
    if tostring(actorJob) ~= tostring(job) then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_wrong_job', 'Wrong job') })
        return
    end
   if not hasPermission(actorJob, tonumber(grade), 'sendBill') and not Config.PermssionsDisabled then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_no_permission', 'Insufficient permission') })
        return
    end 
    local id = createBill(src, tonumber(targetSrc), tostring(job), tonumber(amount), tostring(description or ''), account == 'cash' and 'cash' or 'bank')
    TriggerClientEvent('ox_lib:notify', src, { type = id and 'success' or 'error', description = id and (L('notify_created_bill_num', 'Created bill #')..id) or L('notify_create_failed', 'Create failed') })
    if id then
        local player = Bridge.getPlayer(src)
        if player then
            local cid = Bridge.getCid(player)
            local list = fetchBillsByCid(cid, 30)
            TriggerClientEvent('peleg-billing:client:refreshBills', src, list)
        end
    end
end)

RegisterNetEvent('peleg-billing:server:setGradePerm', function(job, cid, minGrade, data)
    local src = source
    local player, actorJob, actorGrade = getActorInfo(src)
    if not player then return end
    if tostring(actorJob) ~= tostring(job) then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = 'Wrong job' })
        return
    end
    local boss = Bridge.isBoss and Bridge.isBoss(player) or false
    if not boss then
        TriggerClientEvent('ox_lib:notify', src, { type = 'error', description = L('notify_no_permission', 'Insufficient permission') })
        return
    end 
    if type(data) == 'table' then
        saveJobAccess(tostring(job), { grades = data })
    else
        local grades = Bridge.getJobGrades(actorJob) or {}
        local map = {}
        if type(grades) == 'table' then
            for k, g in pairs(grades) do
                local level = tonumber((type(g) == 'table' and (g.level or g.grade or g.id)) or k) or 0
                local allowed = level >= tonumber(minGrade or 0)
                map[tostring(level)] = { sendBill = allowed, refundBill = allowed }
            end
        end
        saveJobAccess(tostring(job), { grades = map })
    end
    TriggerClientEvent('ox_lib:notify', src, { type = 'success', description = L('notify_permissions_updated', 'Permissions updated') })
end)

RegisterNetEvent('peleg-billing:server:setWallpaper', function(url)
    local src = source
    if url then
        url = url:gsub("&quality=.*", "")
    end
    setPlayerWallpaper(src, tostring(url or ''))
end)

---@param cid string
---@return Bill[]
local function getAllPlayerBills(cid)
    local query = 'SELECT * FROM billing_bills WHERE cid = ? ORDER BY created_at DESC'
    local rows = MySQL.query.await(query, { cid })
    return rows or {}
end

---@param billId number
---@param cid string
---@return boolean, string|nil
local function payBillByCid(billId, cid)
    local bill = MySQL.single.await('SELECT * FROM billing_bills WHERE id = ? AND status = "unpaid" AND cid = ?', { billId, cid })
    if not bill then return false, 'bill_not_found' end
    
    local account = bill.account == 'cash' and 'cash' or 'bank'
    
    local playerSrc = nil
    for _, src in ipairs(GetPlayers()) do
        local player = Bridge.getPlayer(tonumber(src))
        if player and Bridge.getCid(player) == cid then
            playerSrc = tonumber(src)
            break
        end
    end
    
    local ok, reason
    if playerSrc then
        ok, reason = Bridge.removeMoney(playerSrc, account, bill.amount)
    else
        ok, reason = Bridge.removeMoneyOffline(cid, account, bill.amount)
    end
    
    if not ok then return false, reason or 'payment_failed' end
    
    MySQL.update.await('UPDATE billing_bills SET status = "paid", paid_at = NOW() WHERE id = ?', { billId })
    
    -- Handle billing cut if enabled
    local cutAmount = 0
    if Config.BillingCutEnabled and Config.BillingCutPercentage and Config.BillingCutPercentage > 0 and bill.issuer_cid and bill.issuer_cid ~= '' then
        cutAmount = math.floor(bill.amount * (Config.BillingCutPercentage / 100))
        if cutAmount > 0 then
            print(string.format("[PAY BY CID BILLING CUT] Processing cut for bill %d: %d%% of %d = %d", bill.id, Config.BillingCutPercentage, bill.amount, cutAmount))
            
            local issuerSrc = nil
            for _, src in ipairs(GetPlayers()) do
                local player = Bridge.getPlayer(tonumber(src))
                if player and Bridge.getCid(player) == bill.issuer_cid then
                    issuerSrc = tonumber(src)
                    break
                end
            end
            
            if issuerSrc then
                local cutAccount = 'bank' -- Always give cut to bank account for consistency
                local success = Bridge.addMoney(issuerSrc, cutAccount, cutAmount, 'billing_cut')
                print(string.format("[PAY BY CID BILLING CUT] Gave %d to online issuer %s (success: %s)", cutAmount, bill.issuer_cid, tostring(success)))
            else
                local success = Bridge.addMoneyOffline(bill.issuer_cid, 'bank', cutAmount, 'billing_cut')
                print(string.format("[PAY BY CID BILLING CUT] Gave %d to offline issuer %s (success: %s)", cutAmount, bill.issuer_cid, tostring(success)))
            end
        end
    end
    
    -- Add remaining amount to boss menu (total amount minus cut)
    local bossAmount = bill.amount - cutAmount
    if bossAmount > 0 then
        Boss.addMoney(bill.job, bossAmount)
    end
    
    local logActor = LogsModule.identity(cid, nil, nil)
    local target = LogsModule.identity(bill.cid, nil, nil)
    Logs:sendBillEvent('payBillByCid', logActor, target, { amount = bill.amount, account = bill.account, billId = bill.id, job = bill.job, reason = bill.description })
    
    return true
end

exports('GetBillsByCid', fetchBillsByCid)
exports('GetAllPlayerBills', getAllPlayerBills)
exports('CreateBill', createBill)
exports('PayBill', payBill)
exports('PayBillByCid', payBillByCid)
exports('RefundBill', refundBill)
exports('AutoPayBill', autoPayBill)

RegisterNetEvent('peleg-billing:server:useTablet', function()
    local src = source
    if not src then return end
    if canOpenTablet(src) then
        local player    = Bridge.getPlayer(src)
        local cid       = player and Bridge.getCid(player)
        local job, grade= player and Bridge.getJob(player) or { '', 0 }
        local name      = GetPlayerName(src)
        local wallpaper = cid and getPlayerWallpaper(cid) or Config.DefaultWallpaper
        local boss      = player and (Bridge.isBoss and Bridge.isBoss(player) or false) or false

        TriggerClientEvent('peleg-billing:client:open', src, {
            cid = cid, job = job, grade = grade, name = name,
            wallpaper = wallpaper, boss = boss, locale = Locales,
            disableHome = Config.DisableHomeScreen
        })
    else
        TriggerClientEvent('ox_lib:notify', src, {
            type = 'error',
            description = L('notify_job_not_allowed', 'Job not allowed')
        })
    end
end)

local function registerUsable()
	local fw = Bridge.framework()
	if fw == 'qb' then
		local QBCore = nil
		pcall(function()
			QBCore = exports['qb-core'] and exports['qb-core']:GetCoreObject() or nil
		end)
		if QBCore and QBCore.Functions and QBCore.Functions.CreateUseableItem then
			QBCore.Functions.CreateUseableItem(Config.TabletItem, function(source, _)
				local allowed = canOpenTablet(source)
				if allowed then
                    local player = Bridge.getPlayer(source)
                    local cid = player and Bridge.getCid(player)
                    local job, grade = player and Bridge.getJob(player) or {'', 0}
                    local name = GetPlayerName(source)
                    local wallpaper = cid and getPlayerWallpaper(cid) or Config.DefaultWallpaper
                    local boss = player and (Bridge.isBoss and Bridge.isBoss(player) or false) or false
                    TriggerClientEvent('peleg-billing:client:open', source, { cid = cid, job = job, grade = grade, name = name, wallpaper = wallpaper, boss = boss, locale = Locales, disableHome = Config.DisableHomeScreen })
                else
                    TriggerClientEvent('ox_lib:notify', source, { type = 'error', description = L('notify_job_not_allowed', 'Job not allowed') })
				end
			end)
		end
	elseif fw == 'esx' and GetResourceState('ox_inventory') ~= 'started' then
		local ESX = nil
		pcall(function()
			ESX = exports['es_extended'] and exports['es_extended']:getSharedObject() or nil
		end)
		if ESX and ESX.RegisterUsableItem then
			ESX.RegisterUsableItem(Config.TabletItem, function(source)
				local allowed = canOpenTablet(source)
				if allowed then
                    local player = Bridge.getPlayer(source)
                    local cid = player and Bridge.getCid(player)
                    local job, grade = player and Bridge.getJob(player) or {'', 0}
                    local name = GetPlayerName(source)
                    local wallpaper = cid and getPlayerWallpaper(cid) or Config.DefaultWallpaper
                    local boss = player and (Bridge.isBoss and Bridge.isBoss(player) or false) or false
                    TriggerClientEvent('peleg-billing:client:open', source, { cid = cid, job = job, grade = grade, name = name, wallpaper = wallpaper, boss = boss, locale = Locales, disableHome = Config.DisableHomeScreen })
                else
                    TriggerClientEvent('ox_lib:notify', source, { type = 'error', description = L('notify_job_not_allowed', 'Job not allowed') })
				end
			end)
		end
	end
end

CreateThread(registerUsable)

CreateThread(function()
    while true do
        if Config.AutoPayEnabled and Config.AutoPayTime and Config.AutoPayTime > 0 then
            local hoursAgo = Config.AutoPayTime
            local unpaidBills = MySQL.query.await('SELECT id FROM billing_bills WHERE status = "unpaid" AND TIMESTAMPDIFF(HOUR, created_at, NOW()) >= ?', { hoursAgo })

            if unpaidBills and #unpaidBills > 0 then
                for _, bill in ipairs(unpaidBills) do
                    local ok, reason = autoPayBill(bill.id)
                    if not ok then
                        print(('Auto pay failed for bill %d: %s'):format(bill.id, reason or 'unknown'))
                    end
                end
            end
        end

        Wait(400000)
    end
end)
