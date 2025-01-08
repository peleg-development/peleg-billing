--------------------------------------------------------------------------------
-- Framework Initialization
--------------------------------------------------------------------------------
local QBCore = nil
local ESX    = nil

if Config.Framework == "QB" then
    QBCore = exports["qb-core"]:GetCoreObject()
elseif Config.Framework == "ESX" then
    ESX = exports["es_extended"]:getSharedObject()
end

--------------------------------------------------------------------------------
-- DISCORD WEBHOOKS
--------------------------------------------------------------------------------
local function sendToDiscord(whType, title, message)
    local webhookURL = Config.Webhooks[whType]
    if not webhookURL or webhookURL == "" then return end

    local data = {
        {
            ["title"]       = title,
            ["description"] = message,
            ["color"]       = 3447003
        }
    }
    PerformHttpRequest(webhookURL, function(err, text, headers) end, 'POST',
        json.encode({username = "Billing System", embeds = data}),
        { ['Content-Type'] = 'application/json' }
    )
end

--------------------------------------------------------------------------------
-- Database / MySQL Utility
--------------------------------------------------------------------------------
-- Adjust per your DB resource (oxmysql, ghmattimysql, mysql-async, etc.)

function GetPlayerBills(cid)
    local unpaidBills = {}
    local billingHistory = {}
    local billResults = MySQL.query.await("SELECT * FROM `bills` WHERE receiver_cid = ?", {cid})

    for _, bill in pairs(billResults) do
        local receiverData = MySQL.query.await("SELECT charinfo, job FROM `players` WHERE citizenid = ?", {bill.receiver_cid})
        local senderData   = MySQL.query.await("SELECT charinfo FROM `players` WHERE citizenid = ?", {bill.sender_cid})

        local receiverCharinfo = json.decode(receiverData[1].charinfo)
        local receiverJob      = json.decode(receiverData[1].job)
        local senderCharinfo   = json.decode(senderData[1].charinfo)

        local receiverName = receiverCharinfo.firstname .. " " .. receiverCharinfo.lastname
        local senderName   = senderCharinfo.firstname .. " " .. senderCharinfo.lastname

        local billData = {
            id = bill.id,
            amount = bill.amount,
            reason = bill.reason,
            sender = senderName,
            billedBy = { name = senderName, cid = bill.sender_cid, job = receiverJob.name },
            receiver = receiverName,
            job = receiverJob.name,
            date = bill.date,
            time = bill.time,
            paid = bill.paid,
            sender_cid = bill.sender_cid,
            receiver_cid = bill.receiver_cid
        }

        if bill.paid then
            table.insert(billingHistory, billData)
        else
            table.insert(unpaidBills, billData)
        end
    end

    return unpaidBills, billingHistory
end

function GetSocietyBills(job)
    local societyBills = {}
    local billResults = MySQL.query.await("SELECT * FROM `bills` WHERE job = ?", {job})

    for _, bill in pairs(billResults) do
        local receiverData = MySQL.query.await("SELECT charinfo, job FROM `players` WHERE citizenid = ?", {bill.receiver_cid})
        local senderData   = MySQL.query.await("SELECT charinfo FROM `players` WHERE citizenid = ?", {bill.sender_cid})

        local receiverCharinfo = json.decode(receiverData[1].charinfo)
        local receiverJob      = json.decode(receiverData[1].job)
        local senderCharinfo   = json.decode(senderData[1].charinfo)

        local receiverName = receiverCharinfo.firstname .. " " .. receiverCharinfo.lastname
        local senderName   = senderCharinfo.firstname .. " " .. senderCharinfo.lastname

        local billData = {
            id = bill.id,
            amount = bill.amount,
            reason = bill.reason,
            sender = senderName,
            receiver = receiverName,
            job = receiverJob.name,
            date = bill.date,
            time = bill.time,
            paid = bill.paid,
            sender_cid = bill.sender_cid,
            receiver_cid = bill.receiver_cid
        }

        table.insert(societyBills, billData)
    end

    return societyBills
end


function GetCid(player) 
    local cid = nil
    if Config.Framework == "QB" then
        local Player = QBCore.Functions.GetPlayer(player)
        if Player then
            cid = Player.PlayerData.citizenid
        end
    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(player)
        if xPlayer then
            cid = xPlayer.identifier
        end
    end
    return cid
end
--------------------------------------------------------------------------------
-- Billing Logic
--------------------------------------------------------------------------------
RegisterNetEvent("krs-billing:server:billPlayer", function(data)
    local cid       = GetCid(source)
    local targetCid = data.cid
    local reason    = data.reason
    local amount    = data.amount

    local jobName
    if Config.Framework == "QB" then
        local Player = QBCore.Functions.GetPlayerByCitizenId(cid)
        jobName = Player.PlayerData.job.name
    elseif Config.Framework == "ESX" then
        local xPlayers = ESX.GetExtendedPlayers()
        for _, xPlayer in pairs(xPlayers) do
            if xPlayer.getIdentifier() == cid then
                jobName = xPlayer.job.name
                break
            end
        end
    end

    if not jobName then
        print("Cannot find job for the player who is billing.")
        return
    end

    local query = MySQL.query.await(
        "INSERT INTO bills (amount, reason, job, sender_cid, receiver_cid, date, time, paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
        {
            amount, 
            reason,
            jobName,
            cid, 
            targetCid, 
            os.date("%Y-%m-%d"), 
            os.date("%H:%M:%S"), 
            false
        }
    )

    if query then
        sendToDiscord("SendBill", "Bill Sent", ("**Sender CID**: %s\n**Target CID**: %s\n**Amount**: $%s\n**Reason**: %s"):format(cid, targetCid, amount, reason))
    end
end)

--------------------------------------------------------------------------------
-- Example: Pay Bill
--------------------------------------------------------------------------------
RegisterNetEvent('krs-billing:payBill', function(billId, payFromJobAccount)
    local src = source
    local amount, jobName, senderJob, senderName, foundBill = nil, nil, nil, nil, nil

    local bill = MySQL.Sync.fetchAll('SELECT * FROM bills WHERE id = ?', {billId})
    if bill and bill[1] then
        foundBill = bill[1]
        amount = tonumber(bill[1].amount) -- Ensure it's a number
        jobName = bill[1].job
    end

    if not foundBill then
        if Config.Framework == "QB" then
            TriggerClientEvent('QBCore:Notify', src, 'Bill not found', 'error')
        elseif Config.Framework == "ESX" then
            TriggerClientEvent('esx:showNotification', src, 'Bill not found')
        end
        return
    end

    if Config.Framework == "QB" then
        local xPlayer = QBCore.Functions.GetPlayer(src)
        if payFromJobAccount then
            if xPlayer.PlayerData.job.isboss then
                TriggerEvent('qb-bossmenu:server:addAccountMoney', jobName, amount, function(success)
                    if success then
                        MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
                        TriggerClientEvent('QBCore:Notify', src, 'Bill paid from job account and credited to sender society', 'success')
                        sendToDiscord("SendBill", "Bill Paid", ("Bill ID: %d of $%s paid by %s and credited to %s society account"):format(billId, amount, xPlayer.PlayerData.name, senderJob))
                    else
                        TriggerClientEvent('QBCore:Notify', src, 'Failed to credit the bill amount to sender society', 'error')
                    end
                end)
            else
                TriggerClientEvent('QBCore:Notify', src, 'You do not have permission to pay from job account', 'error')
            end
        else
            if xPlayer.Functions.RemoveMoney('cash', amount) then
                TriggerEvent('qb-bossmenu:server:addAccountMoney', jobName, amount, function(success)
                    if success then
                        MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
                        TriggerClientEvent('QBCore:Notify', src, 'Bill paid from your cash and credited to sender society', 'success')
                        sendToDiscord("SendBill", "Bill Paid", ("Bill ID: %d of $%s paid by %s and credited to %s society account"):format(billId, amount, xPlayer.PlayerData.name, senderJob))
                    else
                        TriggerClientEvent('QBCore:Notify', src, 'Failed to credit the bill amount to sender society', 'error')
                    end
                end)
            else
                TriggerClientEvent('QBCore:Notify', src, 'Not enough cash to pay the bill', 'error')
            end
        end

    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(src)
        local xPlayerJob = xPlayer.job
        if payFromJobAccount then
            if xPlayerJob.grade_name == "boss" then
                TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. jobName, function(account)
                    if account then
                        account.addMoney(amount)
                        MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
                        TriggerClientEvent('esx:showNotification', src, 'Bill paid from job account and credited to sender society')
                        sendToDiscord("SendBill", "Bill Paid", ("Bill ID: %d of $%s paid by %s and credited to %s society account"):format(billId, amount, xPlayer.getName(), senderJob))
                    else
                        TriggerClientEvent('esx:showNotification', src, 'Failed to credit the bill amount to sender society')
                    end
                end)
            else
                TriggerClientEvent('esx:showNotification', src, 'You do not have permission to pay from job account')
            end
        else
            if xPlayer.getMoney() >= amount then
                xPlayer.removeMoney(amount)
                TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. jobName, function(account)
                    if account then
                        account.addMoney(amount)
                        MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
                        TriggerClientEvent('esx:showNotification', src, 'Bill paid from your cash and credited to sender society')
                        sendToDiscord("SendBill", "Bill Paid", ("Bill ID: %d of $%s paid by %s and credited to %s society account"):format(billId, amount, xPlayer.getName(), senderJob))
                    else
                        TriggerClientEvent('esx:showNotification', src, 'Failed to credit the bill amount to sender society')
                    end
                end)
            else
                TriggerClientEvent('esx:showNotification', src, 'Not enough cash to pay the bill')
            end
        end
    end
end)


--------------------------------------------------------------------------------
-- Refund Bill
--------------------------------------------------------------------------------
RegisterNetEvent('krs-billing:refundBill', function(billId)
    local src = source

    if Config.Framework == "QB" then
        local xPlayer = QBCore.Functions.GetPlayer(src)
        local jobName = xPlayer.PlayerData.job.name
        
        if xPlayer.PlayerData.job.isboss then
            MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
            TriggerClientEvent('QBCore:Notify', src, 'Bill refunded successfully', 'success')
            sendToDiscord("RefundBill", "Bill Refunded", ("A bill has been refunded by %s"):format(xPlayer.PlayerData.name))
        else
            TriggerClientEvent('QBCore:Notify', src, 'You do not have permission to refund this bill', 'error')
        end

    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(src)
        local jobName = xPlayer.job.name
        local jobGrade = xPlayer.job.grade_name

        if jobGrade == "boss" then
            MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
            TriggerClientEvent('esx:showNotification', src, 'Bill refunded successfully')
            sendToDiscord("RefundBill", "Bill Refunded", ("A bill has been refunded by %s"):format(xPlayer.getName()))
        else
            TriggerClientEvent('esx:showNotification', src, 'You do not have permission to refund this bill')
        end
    end
end)

--------------------------------------------------------------------------------
-- requestBillingMenu
--------------------------------------------------------------------------------
RegisterNetEvent('krs-billing:requestBillingMenu', function(citizenId)
    local src = source
    
    if Config.Framework == "QB" then
        local Player = QBCore.Functions.GetPlayer(src)
        if not Player then return end
        
        local myCid = Player.PlayerData.citizenid
        citizenId = citizenId or myCid 

        local unpaidBills, billingHistory = GetPlayerBills(citizenId)
        local societyBills = {}
        local jobName  = Player.PlayerData.job.name
        local jobGrade = tostring(Player.PlayerData.job.grade.level) or "0"

        if Config.Jobs[jobName] and Config.Jobs[jobName][jobGrade] then
            local jobConfig = Config.Jobs[jobName][jobGrade]
            if jobConfig.BossAccess then
                societyBills = GetSocietyBills(jobName)
            end

            TriggerClientEvent('krs-billing:openBillingMenu', src, {
                myBills         = unpaidBills,
                billingHistory  = billingHistory,
                societyBills    = societyBills,
                jobAccess       = jobConfig.BossAccess,
                cid             = citizenId
            })
        else
            TriggerClientEvent('QBCore:Notify', src, "You don't have access to the billing menu!", "error")
        end

    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(src)
        if not xPlayer then return end
        
        local myIdentifier = xPlayer.identifier
        local myCid = myIdentifier 
        citizenId = citizenId or myCid

        local unpaidBills, billingHistory = GetPlayerBills(citizenId)
        local societyBills = {}
        local jobName  = xPlayer.job.name
        local jobGrade = tostring(xPlayer.job.grade) or "0"

        if Config.Jobs[jobName] and Config.Jobs[jobName][jobGrade] then
            local jobConfig = Config.Jobs[jobName][jobGrade]
            if jobConfig.BossAccess then
                societyBills = GetSocietyBills(jobName)
            end

            TriggerClientEvent('krs-billing:openBillingMenu', src, {
                myBills         = unpaidBills,
                billingHistory  = billingHistory,
                societyBills    = societyBills,
                jobAccess       = jobConfig.BossAccess,
                cid             = citizenId
            })
        else
            TriggerClientEvent('esx:showNotification', src, "You don't have access to the billing menu!")
        end
    end
end)

--------------------------------------------------------------------------------
-- Callbacks for retrieving player names
--------------------------------------------------------------------------------
if Config.Framework == "QB" then
    QBCore.Functions.CreateCallback('krs-billing:getPlayerName', function(source, cb, serverId)
        print(string.format("[peleg-billing] Server callback 'getPlayerName' triggered for serverId %d.", serverId))
        local targetPlayer = QBCore.Functions.GetPlayer(tonumber(serverId))
        if targetPlayer then
            local charInfo = targetPlayer.PlayerData.charinfo
            local fullName = ("%s %s"):format(charInfo.firstname, charInfo.lastname)
            local cid = targetPlayer.PlayerData.citizenid  
            print(string.format("[peleg-billing] Retrieved name for serverId %d: %s | CID: %s", serverId, fullName, cid))
            cb({ name = fullName, cid = cid })
        else
            print(string.format("[peleg-billing] No player found with serverId %d. Returning 'Unknown' and 'N/A'.", serverId))
            cb({ name = "Unknown", cid = "N/A" })
        end
    end)
elseif Config.Framework == "ESX" then
    RegisterNetEvent('krs-billing:getPlayerNameServer', function(serverId, callback)
        local src = source
        local xPlayer = ESX.GetPlayerFromId(serverId)
        if xPlayer then
            local name = xPlayer.getName()
            local cid  = xPlayer.identifier
            callback({ name = name, cid = cid })
        else
            callback({ name = "Unknown", cid = "N/A" })
        end
    end)
end

--------------------------------------------------------------------------------
-- ESX Callback for checking items (if needed)
--------------------------------------------------------------------------------
if Config.Framework == "ESX" then
    ESX.RegisterServerCallback('krs-billing:hasItem', function(source, cb, itemName)
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer then
            local hasItem = xPlayer.getInventoryItem(itemName).count > 0
            cb(hasItem)
        else
            cb(false)
        end
    end)
end
