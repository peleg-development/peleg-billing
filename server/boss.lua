local framework = lib.require('server.bridge').framework()
local Boss = {}

--- Remove money from a society account
--- @param job string
--- @param amount number
function Boss.removeMoney(job, amount)
    if framework == 'qb' then
        exports['qb-management']:RemoveMoney(job, amount)
    else -- esx/oldesx
        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
            if account then
                account.removeMoney(amount)
            end
        end)
    end
end

--- Add money to a society account
--- @param job string
--- @param amount number
function Boss.addMoney(job, amount)
    if framework == 'qb' then
        exports['qb-management']:AddMoney(job, amount)
    else -- esx/oldesx
        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
            if account then
                account.addMoney(amount)
            end
        end)
    end
end

return Boss
