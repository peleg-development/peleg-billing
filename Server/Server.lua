_print = print
print = function(...)
    if Config.Debug then
        _print(...)
    end    
end
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
-- Database Utils
--------------------------------------------------------------------------------

function GetPlayerBills(cid)
    local unpaidBills = {}
    local billingHistory = {}
    local billResults = MySQL.query.await("SELECT * FROM `bills` WHERE receiver_cid = ?", {cid})

    for _, bill in ipairs(billResults) do
        local senderName = bill.sender_name
        local receiverName = bill.receiver_name
        local job = bill.job

        local billData = {
            id = bill.id,
            amount = bill.amount,
            reason = bill.reason,
            sender = senderName,
            billedBy = { name = senderName, cid = bill.sender_cid, job = job },
            receiver = receiverName,
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

    for _, bill in ipairs(billResults) do
        local senderName = bill.sender_name
        local receiverName = bill.receiver_name

        local billData = {
            id = bill.id,
            amount = bill.amount,
            reason = bill.reason,
            sender = senderName,
            billedBy = { name = senderName, cid = bill.sender_cid, job = job },
            receiver = receiverName,
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

RegisterNetEvent('peleg-billing:server:fetchPlayerBills', function(targetCid)
    local src = source

    local query = [[
        SELECT *
        FROM bills
        WHERE receiver_cid = ?
        ORDER BY date DESC, time DESC
    ]]
    
    local bills = MySQL.query.await(query, {targetCid})

    if bills then
        for i, bill in ipairs(bills) do
            print(bill.id, bill.reason, bill.amount, bill.sender_name, bill.job, bill.date, bill.time, bill.paid)
            bills[i] = {
                id = bill.id,
                amount = bill.amount,
                reason = bill.reason,
                billedBy = {
                    name = bill.sender_name,
                    job = bill.job
                },
                date = bill.date,
                time = bill.time,
                paid = (bill.paid == true or bill.paid == 1)
            }
        end
    end

    TriggerClientEvent('peleg-billing:client:receiveBills', src, bills)
end)

RegisterNetEvent('peleg-billing:server:getOnlinePlayers', function(searchQuery)
    local src = source
    local players = {}
    local lowerQuery = searchQuery:lower()

    if Config.Framework == "QB" then
        local QBPlayers = QBCore.Functions.GetQBPlayers()
        for _, player in pairs(QBPlayers) do
            local playerData = player.PlayerData
            local charInfo = playerData.charinfo

            if charInfo then
                local fullName = ("%s %s"):format(charInfo.firstname, charInfo.lastname)
                local cid = playerData.citizenid

                if fullName:lower():find(lowerQuery) or cid:lower():find(lowerQuery) then
                    table.insert(players, {
                        id   = playerData.source,   
                        name = fullName,
                        cid  = cid,
                        online = true
                    })
                end
            end
        end

    elseif Config.Framework == "ESX" then
        local ESXPlayers = ESX.GetExtendedPlayers()
        for _, xPlayer in pairs(ESXPlayers) do
            local result = MySQL.query.await(
                'SELECT firstname, lastname FROM users WHERE identifier = ?',
                { xPlayer.identifier }
            )

            if result and result[1] then
                local fullName = ("%s %s"):format(result[1].firstname, result[1].lastname)
                local cid = xPlayer.identifier

                if fullName:lower():find(lowerQuery) or cid:lower():find(lowerQuery) then
                    table.insert(players, {
                        id   = xPlayer.source,
                        name = fullName,
                        cid  = cid,
                        online = true
                    })
                end
            end
        end
    end


    if Config.Framework == "QB" then
        local allPlayers = MySQL.query.await([[
            SELECT citizenid, charinfo
            FROM players
        ]])

        if allPlayers then
            for _, row in ipairs(allPlayers) do
                local info = json.decode(row.charinfo or '{}')
                local firstName = info.firstname or "Unknown"
                local lastName  = info.lastname or ""
                local fullName  = ("%s %s"):format(firstName, lastName)
                local cid       = row.citizenid

                if fullName:lower():find(lowerQuery) or cid:lower():find(lowerQuery) then
                    local isDuplicate = false
                    for _, existing in ipairs(players) do
                        if existing.cid == cid then
                            isDuplicate = true
                            break
                        end
                    end

                    if not isDuplicate then
                        table.insert(players, {
                            id     = nil,      
                            name   = fullName,
                            cid    = cid,
                            online = false
                        })
                    end
                end
            end
        end

    elseif Config.Framework == "ESX" then
        local allPlayers = MySQL.query.await([[
            SELECT identifier, firstname, lastname
            FROM users
        ]])

        if allPlayers then
            for _, row in ipairs(allPlayers) do
                local fullName = ("%s %s"):format(row.firstname, row.lastname)
                local cid      = row.identifier

                if fullName:lower():find(lowerQuery) or cid:lower():find(lowerQuery) then
                    local isDuplicate = false
                    for _, existing in ipairs(players) do
                        if existing.cid == cid then
                            isDuplicate = true
                            break
                        end
                    end

                    if not isDuplicate then
                        table.insert(players, {
                            id     = nil,
                            name   = fullName,
                            cid    = cid,
                            online = false
                        })
                    end
                end
            end
        end
    end

    TriggerClientEvent('peleg-billing:client:receiveOnlinePlayers', src, players)
end)

--------------------------------------------------------------------------------
-- Billing Logic
--------------------------------------------------------------------------------
RegisterNetEvent("peleg-billing:server:billPlayer", function(data)
    local src       = source
    local cid       = GetCid(src)  
    local targetCid = data.cid   
    local reason    = data.reason
    local amount    = data.amount

    local jobName
    if Config.Framework == "QB" then
        local Player = QBCore.Functions.GetPlayerByCitizenId(cid)
        if Player and Player.PlayerData.job then
            jobName = Player.PlayerData.job.name
        end
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
        print("^1[peleg-billing] Cannot find job for the sender. Billing aborted.^0")
        return
    end

    local senderName = "Unknown Sender"

    if Config.Framework == "QB" then
        local Player = QBCore.Functions.GetPlayerByCitizenId(cid)
        if Player and Player.PlayerData.charinfo then
            local info = Player.PlayerData.charinfo
            senderName = string.format("%s %s", info.firstname or "Unknown", info.lastname or "")
        else
            local result = MySQL.query.await("SELECT charinfo FROM players WHERE citizenid = ?", { cid })
            if result and result[1] then
                local charinfo = json.decode(result[1].charinfo or "{}")
                senderName = string.format("%s %s", charinfo.firstname or "Unknown", charinfo.lastname or "")
            end
        end
    elseif Config.Framework == "ESX" then
        local xPlayers = ESX.GetExtendedPlayers()
        local foundOnline = false
        for _, xPlayer in pairs(xPlayers) do
            if xPlayer.getIdentifier() == cid then
                local nameResult = MySQL.query.await("SELECT firstname, lastname FROM users WHERE identifier = ?", { cid })
                if nameResult and nameResult[1] then
                    senderName = string.format("%s %s", nameResult[1].firstname, nameResult[1].lastname)
                end
                foundOnline = true
                break
            end
        end
        if not foundOnline then
            -- Offline fallback
            local nameResult = MySQL.query.await("SELECT firstname, lastname FROM users WHERE identifier = ?", { cid })
            if nameResult and nameResult[1] then
                senderName = string.format("%s %s", nameResult[1].firstname, nameResult[1].lastname)
            end
        end
    end

    local receiverName = "Unknown Receiver"
    if Config.Framework == "QB" then
        local result = MySQL.query.await("SELECT charinfo FROM players WHERE citizenid = ?", { targetCid })
        if result and result[1] then
            local charinfo = json.decode(result[1].charinfo or "{}")
            receiverName = string.format("%s %s", charinfo.firstname or "Unknown", charinfo.lastname or "")
        end
    elseif Config.Framework == "ESX" then
        local result = MySQL.query.await("SELECT firstname, lastname FROM users WHERE identifier = ?", { targetCid })
        if result and result[1] then
            receiverName = string.format("%s %s", result[1].firstname, result[1].lastname)
        end
    end

    local taxAmount = 0
    if Config.Tax.Enabled and Config.Tax.Percentage > 0 then
        taxAmount = math.floor((Config.Tax.Percentage / 100) * amount)
        amount = amount + taxAmount
    end

    local query = MySQL.query.await(
        "INSERT INTO bills (amount, reason, job, sender_cid, sender_name, receiver_cid, receiver_name, date, time, paid) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
        {
            amount,
            reason,
            jobName,
            cid,
            senderName,
            targetCid,
            receiverName,
            os.date("%Y-%m-%d"),
            os.date("%H:%M:%S"),
            false
        }
    )

    if query then
        local taxMessage = Config.Tax.Enabled and (" (Tax: $%d)"):format(taxAmount) or ""
        local discordMessage = string.format(
            "**Sender**: %s (CID: %s)\n**Receiver**: %s (CID: %s)\n**Amount**: $%d%s\n**Reason**: %s",
            senderName, cid, receiverName, targetCid, amount, taxMessage, reason
        )

        sendToDiscord("SendBill", "Bill Sent", discordMessage)
    else
        print("^1[peleg-billing] Failed to insert bill into database.^0")
    end

    TriggerClientEvent("peleg-billing:client:notify", src, "Bill sent successfully")
end)

--------------------------------------------------------------------------------
--  RefundBill
--------------------------------------------------------------------------------
RegisterNetEvent('peleg-billing:refundBill', function(billId)
    local src = source
    local framework = Config.Framework  

    local billResult = MySQL.Sync.fetchAll('SELECT * FROM bills WHERE id = ?', { billId })
    if not billResult or not billResult[1] then
        if framework == 'QB' then
            TriggerClientEvent('QBCore:Notify', src, 'Bill not found', 'error')
        else
            TriggerClientEvent('esx:showNotification', src, 'Bill not found')
        end
        return
    end

    local billInfo = billResult[1]
    local jobName = billInfo.job
    local amount = tonumber(billInfo.amount)
    local payerIdentifier = billInfo.receiver_cid 
    local isPaid = billInfo.paid  

    if not amount or not payerIdentifier then
        if framework == 'QB' then
            TriggerClientEvent('QBCore:Notify', src, 'Invalid bill data', 'error')
        else
            TriggerClientEvent('esx:showNotification', src, 'Invalid bill data')
        end
        return
    end

    if framework == 'QB' then
        local xBoss = QBCore.Functions.GetPlayer(src)
        if not xBoss then
            TriggerClientEvent('QBCore:Notify', src, 'Player not found', 'error')
            return
        end

        if xBoss.PlayerData.job.name ~= jobName or not xBoss.PlayerData.job.isboss then
            TriggerClientEvent('QBCore:Notify', src, 'You do not have permission to refund this bill', 'error')
            return
        end

        TriggerEvent('qb-bossmenu:server:removeAccountMoney', jobName, amount)

        local xPayer = nil
        for _, playerId in pairs(QBCore.Functions.GetPlayers()) do
            local xTarget = QBCore.Functions.GetPlayer(playerId)
            if xTarget and tostring(xTarget.PlayerData.citizenid) == tostring(payerIdentifier) then
                xPayer = xTarget
                break
            end
        end

        if xPayer then
            xPayer.Functions.AddMoney('bank', amount, 'bill-refund')
            TriggerClientEvent('QBCore:Notify', xPayer.PlayerData.source, 
                ('You have been refunded $%d'):format(amount), 'success'
            )
        else
            MySQL.Async.execute(
                'UPDATE players SET money = JSON_SET(money, "$.bank", JSON_EXTRACT(money, "$.bank") + ?) WHERE citizenid = ?',
                { amount, payerIdentifier }
            )
        end

        MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', { false, billId })

        TriggerClientEvent('QBCore:Notify', src, ('Bill (ID: %d) refunded successfully'):format(billId), 'success')
        sendToDiscord(
            "RefundBill",
            "Bill Refunded",
            ("Bill ID %d ($%d) refunded by %s"):format(billId, amount, xBoss.PlayerData.name)
        )

    elseif framework == 'ESX' then
        local xBoss = ESX.GetPlayerFromId(src)
        if not xBoss then
            TriggerClientEvent('esx:showNotification', src, 'Boss player not found')
            return
        end

        if xBoss.job.name ~= jobName or xBoss.job.grade_name ~= 'boss' then
            TriggerClientEvent('esx:showNotification', src, 'You do not have boss permissions to refund this bill')
            return
        end

        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. jobName, function(account)
            if not account then
                TriggerClientEvent('esx:showNotification', src, 'Society account not found')
                return
            end


            account.removeMoney(amount)
        end)

        local xPayer = nil
        for _, playerId in pairs(ESX.GetPlayers()) do
            local xTarget = ESX.GetPlayerFromId(playerId)
            if xTarget and tostring(xTarget.identifier) == tostring(payerIdentifier) then
                xPayer = xTarget
                break
            end
        end

        if xPayer then
            xPayer.addMoney(amount)
            TriggerClientEvent('esx:showNotification', xPayer.source, 
                ('You have been refunded $%d'):format(amount)
            )
        else
            MySQL.Async.execute(
                'UPDATE users SET bank = bank + ? WHERE identifier = ?',
                { amount, payerIdentifier }
            )
        end

        MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', { false, billId })

        TriggerClientEvent('esx:showNotification', src, ('Bill (ID: %d) refunded successfully'):format(billId))
        sendToDiscord(
            "RefundBill",
            "Bill Refunded",
            ("Bill ID %d ($%d) refunded by %s"):format(billId, amount, xBoss.getName())
        )
    end
end)


--------------------------------------------------------------------------------
--  Pay Bill
--------------------------------------------------------------------------------
RegisterNetEvent('peleg-billing:payBill', function(billId, payFromJobAccount)
    local src = source
    local amount, jobName, senderJob, senderName, foundBill = nil, nil, nil, nil, nil

    local bill = MySQL.Sync.fetchAll('SELECT * FROM bills WHERE id = ?', {billId})
    if bill and bill[1] then
        foundBill = bill[1]
        amount = tonumber(bill[1].amount) 
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
        if xPlayer.Functions.RemoveMoney('cash', amount) or xPlayer.Functions.RemoveMoney('bank', amount) then
            TriggerEvent('qb-bossmenu:server:addAccountMoney', jobName, amount)
            MySQL.Async.execute('UPDATE bills SET paid = ? WHERE id = ?', {true, billId})
            TriggerClientEvent('QBCore:Notify', src, 'Bill paid from your cash and credited to sender society', 'success')
            sendToDiscord("SendBill", "Bill Paid", ("Bill ID: %d of $%s paid by %s and credited to %s society account"):format(billId, amount, xPlayer.PlayerData.name, senderJob))
        else
            TriggerClientEvent('QBCore:Notify', src, 'Not enough cash to pay the bill', 'error')
        end

    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(src)
        local xPlayerJob = xPlayer.job
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
end)

RegisterNetEvent('peleg-billing:server:checkBalance', function(amount)
    local src = source
    local hasEnough = false

    if Config.Framework == "QB" then
        local xPlayer = QBCore.Functions.GetPlayer(src)
        if xPlayer then
            hasEnough = xPlayer.Functions.GetMoney('cash') >= amount
        end
    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(src)
        if xPlayer then
            hasEnough = xPlayer.getMoney() >= amount
        end
    end

    TriggerClientEvent('peleg-billing:client:checkBalanceResponse', src, hasEnough)
end)

--------------------------------------------------------------------------------
-- requestBillingMenu
--------------------------------------------------------------------------------
RegisterNetEvent('peleg-billing:requestBillingMenu', function(citizenId)
    local src = source

    if Config.Framework == "QB" then
        local Player = QBCore.Functions.GetPlayer(src)
        if not Player then return end

        local myCid = Player.PlayerData.citizenid
        citizenId = citizenId or myCid 

        local unpaidBills, billingHistory = GetPlayerBills(citizenId)
        local societyBills = {}
        local jobName  = Player.PlayerData.job.name or "none"
        local jobGrade = tostring(Player.PlayerData.job.grade.level) or "0"

        if Config.Jobs[jobName] and Config.Jobs[jobName][jobGrade] then
            local jobConfig = Config.Jobs[jobName][jobGrade]
            if jobConfig.BossAccess then
                societyBills = GetSocietyBills(jobName)
            end

            TriggerClientEvent('peleg-billing:openBillingMenu', src, {
                myBills         = unpaidBills,
                billingHistory  = billingHistory,
                societyBills    = societyBills,
                jobAccess       = jobConfig.BossAccess,
                inspectCitizen  = jobConfig.InspectCitizen,
                canBill         = jobConfig.CanBill;
                cid             = citizenId
            })
        else
            TriggerClientEvent('peleg-billing:openBillingMenu', src, {
                myBills         = unpaidBills,
                billingHistory  = billingHistory,
                societyBills    = {},
                jobAccess       = false,
                inspectCitizen  = false,
                canBill         = false;
                cid             = citizenId
            })
        end

    elseif Config.Framework == "ESX" then
        local xPlayer = ESX.GetPlayerFromId(src)
        if not xPlayer then return end

        local myIdentifier = xPlayer.identifier
        local myCid = myIdentifier 
        citizenId = citizenId or myCid

        local unpaidBills, billingHistory = GetPlayerBills(citizenId)
        local societyBills = {}
        local jobName  = xPlayer.job.name or "none"
        local jobGrade = tostring(xPlayer.job.grade) or "0"

        if Config.Jobs[jobName] and Config.Jobs[jobName][jobGrade] then
            local jobConfig = Config.Jobs[jobName][jobGrade]
            if jobConfig.BossAccess then
                societyBills = GetSocietyBills(jobName)
            end

            TriggerClientEvent('peleg-billing:openBillingMenu', src, {
                myBills         = unpaidBills,
                billingHistory  = billingHistory,
                societyBills    = societyBills,
                jobAccess       = jobConfig.BossAccess,
                inspectCitizen  = jobConfig.InspectCitizen,
                canBill         = jobConfig.CanBill;
                cid             = citizenId
            })
        else
            TriggerClientEvent('peleg-billing:openBillingMenu', src, {
                myBills         = unpaidBills,
                billingHistory  = billingHistory,
                societyBills    = {},
                jobAccess       = false,
                inspectCitizen  = false,
                canBill         = false;
                cid             = citizenId
            })
        end
    end
end)


--------------------------------------------------------------------------------
-- Callbacks for retrieving player names
--------------------------------------------------------------------------------
if Config.Framework == "QB" then
    QBCore.Functions.CreateCallback('peleg-billing:getPlayerName', function(source, cb, serverId)
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
    ESX.RegisterServerCallback('peleg-billing:getPlayerNameServer', function(source, cb, serverId)
        local xPlayer = ESX.GetPlayerFromId(serverId)
        if xPlayer then
            cb({ name = xPlayer.getName(), cid = xPlayer.identifier })
        else
            cb({ name = "Unknown", cid = "N/A" })
        end
    end)
end

--------------------------------------------------------------------------------
-- ESX Callback for checking items
--------------------------------------------------------------------------------
if Config.Framework == "ESX" then
    ESX.RegisterServerCallback('peleg-billing:hasItem', function(source, cb, itemName)
        local xPlayer = ESX.GetPlayerFromId(source)
        if xPlayer then
            local hasItem = xPlayer.getInventoryItem(itemName).count > 0
            cb(hasItem)
        else
            cb(false)
        end
    end)
end

