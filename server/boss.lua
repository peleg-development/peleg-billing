local framework = lib.require('server.bridge').framework()
local Boss = {}

--- Remove money from a society account
--- @param job string
--- @param amount number
function Boss.removeMoney(job, amount)
    local success, error = pcall(function()
        if framework == 'qb' then
            exports['qb-management']:RemoveMoney(job, amount)
        else -- esx/oldesx
            TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
                if account then
                    account.removeMoney(amount)
                end
            end)
        end
    end)
    
    if not success then
        print(('Error removing money from job %s: %s'):format(job, error))
    end
end

--- Add money to a society account
--- @param job string
--- @param amount number
function Boss.addMoney(job, amount)
    local success, error = pcall(function()
        if framework == 'qb' then
            exports['qb-management']:AddMoney(job, amount)
        else -- esx/oldesx
            TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
                if account then
                    account.addMoney(amount)
                end
            end)
        end
    end)
    
    if not success then
        print(('Error adding money to job %s: %s'):format(job, error))
    end
end

return Boss
