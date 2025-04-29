--- @param billId number|string
--- @return table|nil
function GetBillById(billId)
    if not billId then return nil end
    local result = MySQL.query.await("SELECT * FROM bills WHERE id = ?", { billId })
    return result and result[1] or nil
end

--- @param billId number|string
--- @param status string
--- @param updatedBy string
--- @return boolean
function UpdateBillStatus(billId, status, updatedBy)
    if not billId or not status then return false end
    local isPaid = (status == "paid")
    local success = MySQL.Sync.execute('UPDATE bills SET status = ?, paid = ?, canceled_by = ? WHERE id = ?', {
        status,
        isPaid,
        updatedBy,
        billId
    })
    if success then
        BroadcastBillUpdate(billId)
    end
    return success
end

--- Processes a refund for a given bill.
--- @param bill table
--- @return boolean
function ProcessRefund(bill)
    local amount = tonumber(bill.amount)
    local receiver_cid = bill.receiver_cid
    local job = bill.job

    if not amount or amount <= 0 or not receiver_cid or not job then
        print("^1[peleg-billing] ProcessRefund: Invalid bill data^7")
        return false
    end

    local jobHasEnough = false
    print("^3[peleg-billing] Checking if society " .. job .. " has enough money: $" .. amount .. "^7")

    if Config.Framework == "QB" then
        local societyAccount = exports['qb-management']:GetAccount(job)
        print("^3[peleg-billing] QB Society account balance: $" .. (societyAccount or 0) .. "^7")
        if societyAccount and societyAccount >= amount then
            jobHasEnough = true
        end
    elseif Config.Framework == "ESX" then
        local societyMoney = 0
        local p = promise.new()
        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
            if account then
                societyMoney = account.money
                p:resolve(account.money >= amount)
            else
                print("^1[peleg-billing] Society account not found: society_" .. job .. "^7")
                p:resolve(false)
            end
        end)
        jobHasEnough = Citizen.Await(p)
        print("^3[peleg-billing] ESX Society account balance: $" .. societyMoney .. "^7")
    end

    if not jobHasEnough then
        print("^1[peleg-billing] ProcessRefund: Society doesn't have enough money^7")
        return false
    end

    print("^2[peleg-billing] Removing money from society: " .. job .. " - Amount: " .. amount .. "^7")
    local moneyRemoved = false

    if Config.Framework == "QB" then
        moneyRemoved = Bridge.RemoveMoneyFromSociety(job, amount)
    elseif Config.Framework == "ESX" then
        local p = promise.new()
        TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
            if account and account.money >= amount then
                account.removeMoney(amount)
                p:resolve(true)
            else
                p:resolve(false)
            end
        end)
        moneyRemoved = Citizen.Await(p)
    end

    if not moneyRemoved then
        print("^1[peleg-billing] ProcessRefund: Failed to remove money from society^7")
        return false
    end

    local receiver = Bridge.GetPlayerByCitizenId(receiver_cid)
    if receiver then
        print("^2[peleg-billing] Adding refund to online player: " .. receiver_cid .. " - Amount: " .. amount .. "^7")
        if Bridge.AddMoney(receiver, "bank", amount, "bill-refund") then
            print("^2[peleg-billing] Refund successful^7")
            return true
        else
            print("^1[peleg-billing] ProcessRefund: Failed to add money to player^7")
            return false
        end
    else
        print("^2[peleg-billing] Adding refund to offline player: " .. receiver_cid .. " - Amount: " .. amount .. "^7")
        if Bridge.UpdateOfflinePlayerMoney(receiver_cid, amount) then
            print("^2[peleg-billing] Offline refund successful^7")
            return true
        else
            print("^1[peleg-billing] ProcessRefund: Failed to update offline player money^7")
            return false
        end
    end

    return false
end

--- Broadcasts a bill update to all connected players.
--- @param billId number|string
function BroadcastBillUpdate(billId)
    local bill = GetBillById(billId)
    if not bill then return end

    local billData = {
        id = bill.id,
        amount = bill.amount,
        reason = bill.reason,
        sender = bill.sender_name,
        billedBy = { name = bill.sender_name, cid = bill.sender_cid, job = bill.job },
        receiver = bill.receiver_name,
        date = bill.date,
        time = bill.time,
        paid = bill.paid,
        status = bill.status or (bill.paid and "paid" or "pending"),
        canceled = bill.status == "canceled",
        refunded = bill.status == "refunded",
        canceled_by = bill.canceled_by,
        sender_cid = bill.sender_cid,
        receiver_cid = bill.receiver_cid
    }

    local players = Bridge.GetPlayers()
    for _, playerId in ipairs(players) do
        TriggerClientEvent('peleg-billing:client:billStatusUpdated', playerId, billData)
    end
end

--- Retrieves all bills for a given citizen.
--- @param cid string
--- @return table, table
function GetPlayerBills(cid)
    local unpaidBills = {}
    local billingHistory = {}
    local billResults = MySQL.query.await("SELECT * FROM `bills` WHERE receiver_cid = ?", { cid })

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
            status = bill.status or (bill.paid and "paid" or "pending"),
            canceled = bill.status == "canceled",
            refunded = bill.status == "refunded",
            canceled_by = bill.canceled_by,
            sender_cid = bill.sender_cid,
            receiver_cid = bill.receiver_cid
        }

        if billData.status == "paid" or billData.paid then
            table.insert(billingHistory, billData)
        else
            table.insert(unpaidBills, billData)
        end
    end

    return unpaidBills, billingHistory
end

--- Retrieves all society bills for a given job.
--- @param job string
--- @return table
function GetSocietyBills(job)
    local societyBills = {}
    local billResults = MySQL.query.await("SELECT * FROM `bills` WHERE job = ?", { job })

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
            status = bill.status or (bill.paid and "paid" or "pending"),
            canceled = bill.status == "canceled",
            refunded = bill.status == "refunded",
            canceled_by = bill.canceled_by,
            sender_cid = bill.sender_cid,
            receiver_cid = bill.receiver_cid
        }

        table.insert(societyBills, billData)
    end

    return societyBills
end

Citizen.CreateThread(function()
    Wait(1000)
    Bridge.RegisterCallback('peleg-billing:getPlayerName', function(source, cb, serverId)
        local targetPlayer = Bridge.GetPlayer(tonumber(serverId))
        if targetPlayer then
            local cid, fullName, _ = Bridge.GetPlayerIdentifiers(targetPlayer)
            cb({ name = fullName, cid = cid })
        else
            cb({ name = "Unknown", cid = "N/A" })
        end
    end)

    Bridge.RegisterCallback('peleg-billing:getPlayerNameServer', function(source, cb, serverId)
        local targetPlayer = Bridge.GetPlayer(serverId)
        if targetPlayer then
            local cid, fullName, _ = Bridge.GetPlayerIdentifiers(targetPlayer)
            cb({ name = fullName, cid = cid })
        else
            cb({ name = "Unknown", cid = "N/A" })
        end
    end)
end)

--- @param whType string
--- @param title string
--- @param message string
local function sendToDiscord(whType, title, message)
    local webhookURL = Config.Webhooks[whType]
    if not webhookURL or webhookURL == "" then return end
    local data = {
        {
            ["title"] = title,
            ["description"] = message,
            ["color"] = 3447003
        }
    }
    PerformHttpRequest(webhookURL, function(err, text, headers) end, 'POST',
        json.encode({ username = "Billing System", embeds = data }),
        { ['Content-Type'] = 'application/json' }
    )
end

RegisterNetEvent('peleg-billing:server:fetchPlayerBills', function(targetCid)
    if not targetCid then return end
    local src = source
    local bills = MySQL.query.await([[
        SELECT * FROM bills
        WHERE receiver_cid = ?
        ORDER BY date DESC, time DESC
    ]], { targetCid })

    if not bills then return end

    for i, bill in ipairs(bills) do
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
            paid = (bill.paid == true or bill.paid == 1),
            status = bill.status or (bill.paid and "paid" or "pending"),
            canceled = (bill.status == "canceled"),
            refunded = (bill.status == "refunded"),
            canceled_by = bill.canceled_by
        }
    end

    TriggerClientEvent('peleg-billing:client:receiveBills', src, bills)
end)

---@param searchQuery string|nil
RegisterNetEvent('peleg-billing:server:getOnlinePlayers', function(searchQuery)
    local src = source
    local players = {}
    local lowerQuery = (searchQuery or ""):lower()
    local onlinePlayers = Bridge.GetAllPlayers()

    for _, player in pairs(onlinePlayers) do
        local cid, fullName, playerId = Bridge.GetPlayerIdentifiers(player)
        if fullName and cid and (fullName:lower():find(lowerQuery) or cid:lower():find(lowerQuery)) then
            table.insert(players, {
                id = playerId,
                name = fullName,
                cid = cid,
                online = true
            })
        end
    end

    if searchQuery and searchQuery ~= "" then
        local offlinePlayers = Bridge.SearchOfflinePlayersByName(searchQuery)
        for _, offlinePlayer in ipairs(offlinePlayers) do
            local isDuplicate = false
            for _, existingPlayer in ipairs(players) do
                if existingPlayer.cid == offlinePlayer.cid then
                    isDuplicate = true
                    break
                end
            end
            if not isDuplicate then
                table.insert(players, offlinePlayer)
            end
        end
    end

    TriggerClientEvent('peleg-billing:client:receiveOnlinePlayers', src, players)
end)

RegisterNetEvent('peleg-billing:server:billPlayer', function(data)
    local src = source
    local cid = data.cid
    local amount = tonumber(data.amount)
    local reason = data.reason

    if not cid or not amount or not reason or amount <= 0 then
        Bridge.NotifyPlayer(src, 'Invalid bill data', 'Error', 'error')
        return
    end

    local player = Bridge.GetPlayer(src)
    if not player then return end

    local jobName = select(1, Bridge.GetJobInfo(player)) or "unknown"
    if not Bridge.HasJobPermission(player, jobName, "CanBill") then
        Bridge.NotifyPlayer(src, 'You do not have permission to bill players', 'Error', 'error')
        return
    end

    local senderName = select(2, Bridge.GetPlayerIdentifiers(player)) or "Unknown Player"
    local senderCid = select(1, Bridge.GetPlayerIdentifiers(player))
    local targetName = "Unknown"
    local targetPlayer = Bridge.GetPlayerByCitizenId(cid)

    if targetPlayer then
        targetName = select(2, Bridge.GetPlayerIdentifiers(targetPlayer)) or "Unknown Player"
    else
        targetName = Bridge.GetPlayerNameFromCitizenId(cid)
    end

    local billId = MySQL.insert.await('INSERT INTO bills (sender_cid, sender_name, receiver_cid, receiver_name, amount, reason, date, time, job, paid, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
        {
            senderCid,
            senderName,
            cid,
            targetName,
            amount,
            reason,
            os.date('%Y-%m-%d'),
            os.date('%H:%M'),
            jobName,
            false,
            "pending"
        }
    )

    if billId then
        local discordMessage = string.format(
            "**Sender**: %s (CID: %s)\n**Receiver**: %s (CID: %s)\n**Amount**: $%d\n**Reason**: %s",
            senderName, senderCid, targetName, cid, amount, reason
        )
        sendToDiscord("SendBill", "Bill Sent", discordMessage)
        Bridge.NotifyPlayer(src, 'Bill sent successfully', 'Success', 'success')
        if targetPlayer then
            local targetId = Bridge.GetFrameworkName() == "QB" 
                and targetPlayer.PlayerData.source 
                or targetPlayer.source
            Bridge.NotifyPlayer(targetId, 'You received a new bill', 'Info', 'primary')
        end
    else
        Bridge.NotifyPlayer(src, 'Failed to send bill', 'Error', 'error')
    end
end)

RegisterNetEvent('peleg-billing:payBill', function(billId, payFromJobAccount)
    local src = source
    local player = Bridge.GetPlayer(src)
    if not player then return end

    local bill = GetBillById(billId)
    if not bill then
        Bridge.NotifyPlayer(src, 'Bill not found', 'Error', 'error')
        return
    end

    if bill.status == "paid" then
        Bridge.NotifyPlayer(src, 'This bill has already been paid', 'Error', 'error')
        return
    elseif bill.status == "canceled" then
        Bridge.NotifyPlayer(src, 'This bill has been canceled', 'Error', 'error')
        return
    elseif bill.status == "refunded" then
        Bridge.NotifyPlayer(src, 'This bill has been refunded', 'Error', 'error')
        return
    end

    local amount = tonumber(bill.amount)
    local jobName = bill.job

    if Bridge.HasEnoughMoney(player, amount) then
        local bankBalance = Bridge.GetMoney(player, 'bank')
        if bankBalance >= amount then
            Bridge.RemoveMoney(player, 'bank', amount)
        else
            local remainingAmount = amount - bankBalance
            Bridge.RemoveMoney(player, 'bank', bankBalance)
            Bridge.RemoveMoney(player, 'cash', remainingAmount)
        end

        Bridge.AddMoneyToSociety(jobName, amount)
        UpdateBillStatus(billId, "paid", select(2, Bridge.GetPlayerIdentifiers(player)) or "Unknown")
        Bridge.NotifyPlayer(src, 'Bill paid successfully', 'Success', 'success')
        local playerName = select(2, Bridge.GetPlayerIdentifiers(player)) or "Unknown Player"
        local discordMsg = ("Bill ID: %d of $%s paid by %s and credited to %s society account"):format(billId, amount, playerName, jobName)
        sendToDiscord("SendBill", "Bill Paid", discordMsg)
    else
        Bridge.NotifyPlayer(src, 'Not enough money to pay the bill', 'Error', 'error')
    end
end)

RegisterNetEvent('peleg-billing:server:checkBalance', function(amount)
    local src = source
    local player = Bridge.GetPlayer(src)
    local hasEnough = false
    if player and amount then
        hasEnough = Bridge.HasEnoughMoney(player, amount)
    end
    TriggerClientEvent('peleg-billing:client:checkBalanceResponse', src, hasEnough)
end)

RegisterNetEvent('peleg-billing:requestBillingMenu', function(citizenId)
    local src = source
    local player = Bridge.GetPlayer(src)
    if not player then return end

    local myCid = select(1, Bridge.GetPlayerIdentifiers(player))
    citizenId = citizenId or myCid

    local unpaidBills, billingHistory = GetPlayerBills(citizenId)
    local societyBills = {}
    local jobName = select(1, Bridge.GetJobInfo(player)) or "unknown"
    local jobGrade = select(2, Bridge.GetJobInfo(player)) or 0

    local menuData = {
        myBills = unpaidBills,
        billingHistory = billingHistory,
        societyBills = {},
        jobAccess = false,
        inspectCitizen = false,
        canBill = false,
        cid = citizenId
    }

    if Config.Jobs[jobName] ~= nil then
        local jobConfig = nil
        local jobGradeStr = tostring(jobGrade)
        if Config.Jobs[jobName][jobGradeStr] then
            jobConfig = Config.Jobs[jobName][jobGradeStr]
        elseif Config.Jobs[jobName]["0"] and jobGrade <= 0 then
            jobConfig = Config.Jobs[jobName]["0"]
        elseif Config.Jobs[jobName]["1"] and jobGrade <= 1 then
            jobConfig = Config.Jobs[jobName]["1"]
        end

        if jobConfig then
            menuData.jobAccess = jobConfig.BossAccess or false
            menuData.inspectCitizen = jobConfig.InspectCitizen or false
            menuData.canBill = jobConfig.CanBill or false

            if jobConfig.BossAccess then
                menuData.societyBills = GetSocietyBills(jobName)
            end
        end
    end

    TriggerClientEvent('peleg-billing:openBillingMenu', src, menuData)
end)

RegisterNetEvent('peleg-billing:server:cancelBill', function(billId)
    local src = source
    local player = Bridge.GetPlayer(src)
    if not player then return end

    local bill = GetBillById(billId)
    if not bill then
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.billNotFound or 'Bill not found', 
            Config.Locale['error'] or 'Error', 'error')
        return
    end

    local playerCid = select(1, Bridge.GetPlayerIdentifiers(player))
    local playerName = select(2, Bridge.GetPlayerIdentifiers(player)) or "Unknown"
    local jobName = select(1, Bridge.GetJobInfo(player)) or "unknown"
    local canCancel = false

    if bill.receiver_cid == playerCid then
        canCancel = true
    elseif jobName == bill.job then
        canCancel = Bridge.HasJobPermission(player, jobName, "CancelBill") or 
                    Bridge.HasJobPermission(player, jobName, "BossAccess") or
                    (select(1, Bridge.GetJobInfo(player)) == jobName and select(3, Bridge.GetJobInfo(player)))
    end

    if not canCancel then
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.noPermissionCancel or 
            'You do not have permission to cancel this bill', Config.Locale['error'] or 'Error', 'error')
        return
    end

    if UpdateBillStatus(billId, 'canceled', playerName) then
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.cancelSuccess or 
            'Bill canceled successfully', Config.Locale['success'] or 'Success', 'success')
        if Config.EnableDiscordLogs then
            local message = string.format('Bill #%s canceled by %s (%s)', billId, playerName, playerCid)
            sendToDiscord("Bill Canceled", "Bill Canceled", message)
        end
    else
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.cancelFailed or 
            'Error updating bill status in database', Config.Locale['error'] or 'Error', 'error')
    end
end)

RegisterNetEvent('peleg-billing:server:refundBill', function(billId)
    local src = source
    local player = Bridge.GetPlayer(src)
    if not player then return end

    local bill = GetBillById(billId)
    if not bill then
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.billNotFound or 'Bill not found', 
            Config.Locale['error'] or 'Error', 'error')
        return
    end

    if bill.status ~= 'paid' then
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.billNotPaid or 'This bill has not been paid', 
            Config.Locale['error'] or 'Error', 'error')
        return
    end

    local jobName = select(1, Bridge.GetJobInfo(player)) or "unknown"
    local playerCid = select(1, Bridge.GetPlayerIdentifiers(player))
    local playerName = select(2, Bridge.GetPlayerIdentifiers(player)) or "Unknown"
    local canRefund = Bridge.HasJobPermission(player, bill.job, "RefundBill") or 
                      Bridge.HasJobPermission(player, bill.job, "BossAccess") or
                      ((select(1, Bridge.GetJobInfo(player)) == bill.job) and select(3, Bridge.GetJobInfo(player)))

    if not canRefund then
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.noPermissionRefund or 
            'You do not have permission to refund this bill', Config.Locale['error'] or 'Error', 'error')
        return
    end

    if ProcessRefund(bill) then
        UpdateBillStatus(billId, 'refunded', playerName)
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.refundSuccess or 'Bill refunded successfully', 
            Config.Locale['success'] or 'Success', 'success')
        if Config.EnableDiscordLogs then
            local message = string.format('Bill #%s refunded by %s (%s)', billId, playerName, playerCid)
            sendToDiscord("Bill Refunded", "Bill Refunded", message)
        end
    else
        Bridge.NotifyPlayer(src, Bridge.GetCurrentLocale().notifications.refundFailed or 'Failed to process refund', 
            Config.Locale['error'] or 'Error', 'error')
    end
end)

RegisterNetEvent('peleg-billing:server:getBillingStats', function(data)
    local src = source
    local job = data and data.job
    local stats = {}
    local player = Bridge.GetPlayer(src)
    if player then
        local cid = select(1, Bridge.GetPlayerIdentifiers(player))
        stats = GetBillingStatistics(cid, job)
    end
    TriggerClientEvent('peleg-billing:client:receiveBillingStats', src, stats)
end)

--- @param tableName string
local function DebugTableStructure(tableName)
    print("^3[peleg-billing] Checking table structure for " .. tableName .. "^7")
    local columns = MySQL.Sync.fetchAll("SHOW COLUMNS FROM " .. tableName)
    if columns then
        for i, col in ipairs(columns) do
            print("^3Column: " .. col.Field .. ", Type: " .. col.Type .. ", Null: " .. col.Null .. "^7")
        end
    else
        print("^1Failed to get columns for " .. tableName .. "^7")
    end
end

Citizen.CreateThread(function()
    Wait(8000)
    DebugTableStructure("bills")
end)

--- Runs automatic database migration for the bills table.
local function MigrateBillsTable()
    print("^2[peleg-billing] Running automatic database migration^7")
    local columnCheck = MySQL.Sync.fetchAll("SHOW COLUMNS FROM bills LIKE 'status'")
    local needsMigration = #columnCheck == 0

    if needsMigration then
        print("^3[peleg-billing] Adding new columns to bills table^7")
        MySQL.Sync.execute("ALTER TABLE bills ADD COLUMN IF NOT EXISTS `status` VARCHAR(20) DEFAULT 'pending'")
        MySQL.Sync.execute("ALTER TABLE bills ADD COLUMN IF NOT EXISTS `canceled_by` VARCHAR(255) DEFAULT NULL")
        print("^3[peleg-billing] Converting existing bills to new format^7")
        MySQL.Sync.execute("UPDATE bills SET `status` = 'paid' WHERE `paid` = TRUE AND (`status` IS NULL OR `status` = 'pending')")
        MySQL.Sync.execute("UPDATE bills SET `status` = 'pending' WHERE `paid` = FALSE AND (`status` IS NULL OR `status` = '')")
        print("^2[peleg-billing] Migration completed successfully^7")
    else
        print("^2[peleg-billing] Database structure is up to date^7")
    end
end

Citizen.CreateThread(function()
    Citizen.Wait(5000)
    MigrateBillsTable()
end)

--- @param cid string
--- @param job string|nil
--- @return table
function GetBillingStatistics(cid, job)
    local stats = {
        totalRevenue = 0,
        totalPaid = 0,
        totalPending = 0,
        totalCanceled = 0,
        totalRefunded = 0,
        paidCount = 0,
        pendingCount = 0,
        canceledCount = 0,
        refundedCount = 0,
        topJobs = {},
        monthlyData = {}
    }

    local currentMonth = os.date("%Y-%m")
    for i = 0, 5 do
        local year = tonumber(os.date("%Y"))
        local month = tonumber(os.date("%m")) - i
        if month <= 0 then
            month = month + 12
            year = year - 1
        end
        local monthKey = string.format("%04d-%02d", year, month)
        stats.monthlyData[monthKey] = 0
    end

    local query, params
    if job then
        query = "SELECT * FROM bills WHERE job = ? ORDER BY date DESC"
        params = { job }
    else
        query = "SELECT * FROM bills WHERE receiver_cid = ? OR sender_cid = ? ORDER BY date DESC"
        params = { cid, cid }
    end

    local bills = MySQL.query.await(query, params)
    if not bills then
        return stats
    end

    local jobStats = {}
    for _, bill in ipairs(bills) do
        local amount = tonumber(bill.amount) or 0
        local status = bill.status or (bill.paid and "paid" or "pending")
        local date = bill.date or ""
        local job = bill.job or "unknown"
        local yearMonth = date:sub(1, 7)

        if status == "paid" or bill.paid then
            stats.totalPaid = stats.totalPaid + amount
            stats.paidCount = stats.paidCount + 1
            if stats.monthlyData[yearMonth] ~= nil then
                stats.monthlyData[yearMonth] = stats.monthlyData[yearMonth] + amount
            end
        elseif status == "pending" and not bill.paid then
            stats.totalPending = stats.totalPending + amount
            stats.pendingCount = stats.pendingCount + 1
        elseif status == "canceled" then
            stats.totalCanceled = stats.totalCanceled + amount
            stats.canceledCount = stats.canceledCount + 1
        elseif status == "refunded" then
            stats.totalRefunded = stats.totalRefunded + amount
            stats.refundedCount = stats.refundedCount + 1
        end

        if not jobStats[job] then
            jobStats[job] = { count = 0, amount = 0 }
        end
        jobStats[job].count = jobStats[job].count + 1
        jobStats[job].amount = jobStats[job].amount + amount
    end

    local topJobs = {}
    for jobName, data in pairs(jobStats) do
        table.insert(topJobs, { job = jobName, count = data.count, amount = data.amount })
    end

    table.sort(topJobs, function(a, b)
        return a.amount > b.amount
    end)

    stats.topJobs = {}
    for i = 1, math.min(5, #topJobs) do
        table.insert(stats.topJobs, topJobs[i])
    end

    return stats
end

--- @param billId number|string
--- @param playerId number|string
--- @return boolean, string
function CanRefundBill(billId, playerId)
    local bill = MySQL.query.await("SELECT * FROM bills WHERE id = ?", { billId })
    if not bill or #bill == 0 then
        return false, "Bill not found"
    end

    bill = bill[1]

    if bill.status == "refunded" then
        return false, "Bill is already refunded"
    elseif bill.status == "canceled" then
        return false, "Bill is already canceled"
    end

    if not bill.paid then
        return false, "Bill must be paid before it can be refunded"
    end

    local player = Bridge.GetPlayer(playerId)
    if not player then
        return false, "Player not found"
    end

    local playerCid = select(1, Bridge.GetPlayerIdentifiers(player))
    local jobName = select(1, Bridge.GetJobInfo(player)) or "unknown"
    local isAdmin = (select(1, Bridge.GetJobInfo(player)) == jobName and select(3, Bridge.GetJobInfo(player)))
    local isSender = playerCid == bill.sender_cid

    if not (isAdmin or isSender) then
        return false, "You don't have permission to refund this bill"
    end

    return true, "Bill can be refunded"
end


Citizen.CreateThread(function()
    local resName       = GetCurrentResourceName()
    local currentVer    = GetResourceMetadata(resName, 'version', 0)

    local versionURL    = 'https://gist.githubusercontent.com/peleg-development/bb6cc32c814a1b3018a78ee17d665bef/raw/b2205bc274a491662a8481a7779a9b709107ffcf/version.json'

    PerformHttpRequest(versionURL, function(status, body)
        if status ~= 200 then
            _print(("[^1%s^7] Failed to fetch version info (HTTP %d)"):format(resName, status))
            return
        end

        local ok, data = pcall(json.decode, body)
        if not ok or not data.version then
            _print(("[^1%s^7] Invalid version.json format"):format(resName))
            return
        end

        if data.version ~= currentVer then
            _print(("[^4[%s]^7 New release available: %s  (you have %s)"):format(resName, data.version, currentVer))
            if data.message then
                for line in data.message:gmatch("[^\r\n]+") do
                    _print(("    %s"):format(line))
                end
            end
        else
            _print(("[^2[%s]^7 is up to date (%s)"):format(resName, currentVer))
        end
    end, 'GET')
end)
