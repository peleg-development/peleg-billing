-- boss.lua
local Bridge = lib.require('server.bridge')
local Boss = {}

local function getQbSocietyMode()
    return (Config and Config.QBSociety) or 'qb-management'
end

local function getRenewedResource()
    if type(GetResourceState) == 'function' then
        if GetResourceState('Renewed-Banking') == 'started' then
            return 'Renewed-Banking'
        end
        if GetResourceState('renewed-banking') == 'started' then
            return 'renewed-banking'
        end
    end

    return 'Renewed-Banking'
end

local function getRenewedAccount(job)
    if Config and Config.RenewedSocietyPrefix then
        return ('society_%s'):format(job)
    end
    return job
end

local function qbRemoveSocietyMoney(job, amount)
    local mode = getQbSocietyMode()

    if mode == 'qb-banking' then
        exports['qb-banking']:RemoveMoney(job, amount, 'society_remove')
        return
    end

    if mode == 'renewed-banking' then
        local renewed = getRenewedResource()
        local account = getRenewedAccount(job)
        exports[renewed]:removeAccountMoney(account, amount)
        return
    end

    if mode == 'qb-management' then
        exports['qb-management']:RemoveMoney(job, amount)
        return
    end

    error(('unsupported Config.QBSociety: %s'):format(tostring(mode)))
end

local function qbAddSocietyMoney(job, amount)
    local mode = getQbSocietyMode()

    if mode == 'qb-banking' then
        exports['qb-banking']:AddMoney(job, amount, 'society_add')
        return
    end

    if mode == 'renewed-banking' then
        local renewed = getRenewedResource()
        local account = getRenewedAccount(job)
        exports[renewed]:addAccountMoney(account, amount)
        return
    end

    if mode == 'qb-management' then
        exports['qb-management']:AddMoney(job, amount)
        return
    end

    error(('unsupported Config.QBSociety: %s'):format(tostring(mode)))
end

--- Remove money from a society account
--- @param job string
--- @param amount number
function Boss.removeMoney(job, amount)
    local success, err = pcall(function()
        local framework = Bridge.framework()
        amount = math.floor(tonumber(amount) or 0)
        if amount <= 0 then return end

        if framework == 'qb' then
            qbRemoveSocietyMoney(job, amount)
        elseif framework == 'esx' then
            TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
                if account then
                    account.removeMoney(amount)
                end
            end)
        else
            error(('unsupported framework: %s'):format(tostring(framework)))
        end
    end)

    if not success then
        print(('Error removing money from job %s: %s'):format(job, err))
    end
end

--- Add money to a society account
--- @param job string
--- @param amount number
function Boss.addMoney(job, amount)
    local success, err = pcall(function()
        local framework = Bridge.framework()
        amount = math.floor(tonumber(amount) or 0)
        if amount <= 0 then return end

        if framework == 'qb' then
            qbAddSocietyMoney(job, amount)
        elseif framework == 'esx' then
            TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
                if account then
                    account.addMoney(amount)
                end
            end)
        else
            error(('unsupported framework: %s'):format(tostring(framework)))
        end
    end)

    if not success then
        print(('Error adding money to job %s: %s'):format(job, err))
    end
end

return Boss
