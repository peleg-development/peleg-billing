--- Bridge.lua - Framework Abstraction Layer for QBCore and ESX
---@class Bridge
Bridge = {}

local QBCore = nil
local ESX = nil
local frameworkInitialized = false
local isServer = IsDuplicityVersion()

--- Initializes the proper framework.
---@return boolean True if the framework is successfully initialized.
local function InitFramework()
    if frameworkInitialized then
        return true
    end
    if Config.Framework == "QB" then
        if isServer then
            QBCore = exports["qb-core"]:GetCoreObject()
        else
            QBCore = exports["qb-core"]:GetCoreObject()
        end
        if QBCore then
            frameworkInitialized = true
            return true
        end
    elseif Config.Framework == "ESX" then
        if isServer then
            ESX = exports["es_extended"]:getSharedObject()
        else
            ESX = exports["es_extended"]:getSharedObject()
        end
        if ESX then
            frameworkInitialized = true
            return true
        end
    end
    return false
end

--- Returns the current locale table.
---@return table
function Bridge.GetCurrentLocale()
    return Config.Locales[Config.Locale] or Config.Locales["en"]
end

--- Returns the framework name.
---@return string
function Bridge.GetFrameworkName()
    return Config.Framework
end

if isServer then
    --- Retrieves a player object by source.
    ---@param source number
    ---@return any|nil Player object or nil if not found.
    function Bridge.GetPlayer(source)
        if not InitFramework() then return nil end
        if Config.Framework == "QB" then
            return QBCore.Functions.GetPlayer(source)
        elseif Config.Framework == "ESX" then
            return ESX.GetPlayerFromId(source)
        end
        return nil
    end

    --- Retrieves a player object by citizen ID.
    ---@param citizenId string
    ---@return any|nil Player object or nil if not found.
    function Bridge.GetPlayerByCitizenId(citizenId)
        if not InitFramework() then return nil end
        if Config.Framework == "QB" then
            return QBCore.Functions.GetPlayerByCitizenId(citizenId)
        elseif Config.Framework == "ESX" then
            local xPlayers = ESX.GetExtendedPlayers()
            for _, xPlayer in pairs(xPlayers) do
                if xPlayer.identifier == citizenId then
                    return xPlayer
                end
            end
        end
        return nil
    end

    --- Returns all players (QB) or extended players (ESX).
    ---@return table List of player objects.
    function Bridge.GetAllPlayers()
        if not InitFramework() then return {} end
        if Config.Framework == "QB" then
            return QBCore.Functions.GetQBPlayers()
        elseif Config.Framework == "ESX" then
            return ESX.GetExtendedPlayers()
        end
        return {}
    end

    --- Returns a list of player IDs.
    ---@return table List of player IDs.
    function Bridge.GetPlayers()
        if not InitFramework() then return {} end
        if Config.Framework == "QB" then
            return QBCore.Functions.GetPlayers()
        elseif Config.Framework == "ESX" then
            return ESX.GetPlayers()
        end
        return {}
    end

    --- Retrieves identifiers for a given player.
    ---@param player any
    ---@return string|nil citizenId, string|nil fullName, number|nil sourceId
    function Bridge.GetPlayerIdentifiers(player)
        if not player then return nil, nil, nil end
        if Config.Framework == "QB" then
            local citizenId = player.PlayerData.citizenid
            local firstName = player.PlayerData.charinfo.firstname
            local lastName = player.PlayerData.charinfo.lastname
            local fullName = ("%s %s"):format(firstName, lastName)
            return citizenId, fullName, player.PlayerData.source
        elseif Config.Framework == "ESX" then
            local identifier = player.identifier
            local fullName = player.getName() or "Unknown"
            return identifier, fullName, player.source
        end
        return nil, nil, nil
    end

    --- Retrieves job information for a given player.
    ---@param player any
    ---@return string|nil jobName, number|nil jobGrade, boolean isBoss
    function Bridge.GetJobInfo(player)
        if not player then return nil, nil, false end
        if Config.Framework == "QB" then
            local jobName = player.PlayerData.job.name
            local jobGrade = player.PlayerData.job.grade.level
            local isBoss = player.PlayerData.job.isboss or false
            return jobName, jobGrade, isBoss
        elseif Config.Framework == "ESX" then
            local jobName = player.job.name
            local jobGrade = player.job.grade
            local isBoss = player.job.grade_name == "boss"
            return jobName, jobGrade, isBoss
        end
        return nil, nil, false
    end

    --- Checks if a player has permission for a specific job action.
    ---@param player any
    ---@param jobName string
    ---@param action string
    ---@return boolean
    function Bridge.HasJobPermission(player, jobName, action)
        if not player or not jobName then return false end
        local currentJobName, jobGrade = Bridge.GetJobInfo(player)
        if currentJobName ~= jobName then return false end
        local jobGradeStr = tostring(jobGrade)
        if not Config.Jobs[jobName] then return false end
        local jobConfig = nil
        if Config.Jobs[jobName][jobGradeStr] then
            jobConfig = Config.Jobs[jobName][jobGradeStr]
        elseif Config.Jobs[jobName]["0"] and jobGrade <= 0 then
            jobConfig = Config.Jobs[jobName]["0"]
        elseif Config.Jobs[jobName]["1"] and jobGrade <= 1 then
            jobConfig = Config.Jobs[jobName]["1"]
        end
        if not jobConfig then return false end
        return jobConfig[action] or jobConfig.BossAccess or false
    end

    --- Adds money to a player's account.
    ---@param player any
    ---@param account string
    ---@param amount number
    ---@param reason string|nil
    ---@return boolean
    function Bridge.AddMoney(player, account, amount, reason)
        if not player or not amount then return false end
        reason = reason or 'general'
        if Config.Framework == "QB" then
            player.Functions.AddMoney(account, amount, reason)
            return true
        elseif Config.Framework == "ESX" then
            if account == "bank" then
                player.addAccountMoney('bank', amount)
            else
                player.addMoney(amount)
            end
            return true
        end
        return false
    end

    --- Removes money from a player's account.
    ---@param player any
    ---@param account string
    ---@param amount number
    ---@param reason string|nil
    ---@return boolean
    function Bridge.RemoveMoney(player, account, amount, reason)
        if not player or not amount then return false end
        reason = reason or 'general'
        if Config.Framework == "QB" then
            player.Functions.RemoveMoney(account, amount, reason)
            return true
        elseif Config.Framework == "ESX" then
            if account == "bank" then
                player.removeAccountMoney('bank', amount)
            else
                player.removeMoney(amount)
            end
            return true
        end
        return false
    end

    --- Retrieves the amount of money from a player's account.
    ---@param player any
    ---@param account string
    ---@return number
    function Bridge.GetMoney(player, account)
        if not player then return 0 end
        if Config.Framework == "QB" then
            return player.Functions.GetMoney(account)
        elseif Config.Framework == "ESX" then
            if account == "bank" then
                return player.getAccount('bank').money
            else
                return player.getMoney()
            end
        end
        return 0
    end

    --- Checks if a player has enough money.
    ---@param player any
    ---@param amount number
    ---@return boolean
    function Bridge.HasEnoughMoney(player, amount)
        if not player or not amount then return false end
        local bankBalance = Bridge.GetMoney(player, 'bank')
        local cashBalance = Bridge.GetMoney(player, 'cash')
        return (bankBalance + cashBalance) >= amount
    end

    --- Adds money to a society account.
    ---@param job string
    ---@param amount number
    ---@return boolean
    function Bridge.AddMoneyToSociety(job, amount)
        if not job or not amount then return false end
        if Config.Framework == "QB" then
            local success, result = pcall(function()
                if exports['qb-banking'] and exports['qb-banking'].AddMoney then
                    return exports['qb-banking']:AddMoney(job, amount, 'bill-payment')
                else
                    return false
                end
            end)
            if success and result then
                return true
            else
                TriggerEvent('qb-bossmenu:server:addAccountMoney', job, amount)
                return true
            end
        elseif Config.Framework == "ESX" then
            local p = promise.new()
            TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
                if account then
                    account.addMoney(amount)
                    p:resolve(true)
                else
                    p:resolve(false)
                end
            end)
            return Citizen.Await(p)
        end
        return false
    end

    --- Removes money from a society account.
    ---@param job string
    ---@param amount number
    ---@return boolean
    function Bridge.RemoveMoneyFromSociety(job, amount)
        if not job or not amount then return false end
        if Config.Framework == "QB" then
            local success, result = pcall(function()
                if exports['qb-banking'] and exports['qb-banking'].RemoveMoney then
                    return exports['qb-banking']:RemoveMoney(job, amount, 'bill-refund')
                else
                    return false
                end
            end)
            if success and result then
                return true
            else
                TriggerEvent('qb-bossmenu:server:removeAccountMoney', job, amount)
                return true
            end
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
            return Citizen.Await(p)
        end
        return false
    end

    --- Retrieves the money amount in a society account.
    ---@param job string
    ---@return number
    function Bridge.GetSocietyMoney(job)
        if not job then return 0 end
        if Config.Framework == "QB" then
            local account = exports['qb-management']:GetAccount(job)
            return account or 0
        elseif Config.Framework == "ESX" then
            local p = promise.new()
            TriggerEvent('esx_addonaccount:getSharedAccount', 'society_' .. job, function(account)
                if account then
                    p:resolve(account.money)
                else
                    p:resolve(0)
                end
            end)
            return Citizen.Await(p)
        end
        return 0
    end

    --- Checks if a player has a specified item.
    ---@param source number
    ---@param item string
    ---@param amount number|nil
    ---@return boolean
    function Bridge.HasItem(source, item, amount)
        if not source or not item then return false end
        amount = amount or 1
        if Config.Framework == "QB" then
            local Player = QBCore.Functions.GetPlayer(source)
            return Player and Player.Functions.HasItem(item, amount) or false
        elseif Config.Framework == "ESX" then
            local xPlayer = ESX.GetPlayerFromId(source)
            if xPlayer then
                local itemObj = xPlayer.getInventoryItem(item)
                return itemObj and itemObj.count >= amount or false
            end
        end
        return false
    end

    --- Retrieves a player object by matching the full name.
    ---@param name string
    ---@return any|nil
    function Bridge.GetPlayerByName(name)
        if not name then return nil end
        if Config.Framework == "QB" then
            local players = QBCore.Functions.GetQBPlayers()
            for _, player in pairs(players) do
                local firstName = player.PlayerData.charinfo.firstname or ""
                local lastName = player.PlayerData.charinfo.lastname or ""
                local fullName = firstName .. " " .. lastName
                if fullName:lower() == name:lower() then
                    return player
                end
            end
        elseif Config.Framework == "ESX" then
            local xPlayers = ESX.GetExtendedPlayers()
            for _, xPlayer in pairs(xPlayers) do
                local result = MySQL.query.await('SELECT firstname, lastname FROM users WHERE identifier = ?', { xPlayer.identifier })
                if result and result[1] then
                    local fullName = ("%s %s"):format(result[1].firstname, result[1].lastname)
                    if fullName:lower() == name:lower() then
                        return xPlayer
                    end
                end
            end
        end
        return nil
    end

    --- Searches for offline players by name.
    ---@param name string
    ---@return table List of offline players.
    function Bridge.SearchOfflinePlayersByName(name)
        local results = {}
        if Config.Framework == "QB" then
            local players = MySQL.query.await([[
                SELECT citizenid, charinfo 
                FROM players 
                WHERE JSON_EXTRACT(charinfo, '$.firstname') LIKE ? 
                OR JSON_EXTRACT(charinfo, '$.lastname') LIKE ?
            ]], {"%" .. name .. "%", "%" .. name .. "%"})
            if players then
                for _, player in ipairs(players) do
                    local charInfo = json.decode(player.charinfo or "{}")
                    local fullName = ("%s %s"):format(charInfo.firstname or "", charInfo.lastname or "")
                    table.insert(results, {
                        id = nil,
                        cid = player.citizenid,
                        name = fullName,
                        online = false
                    })
                end
            end
        elseif Config.Framework == "ESX" then
            local players = MySQL.query.await([[
                SELECT identifier, firstname, lastname 
                FROM users 
                WHERE firstname LIKE ? OR lastname LIKE ?
            ]], {"%" .. name .. "%", "%" .. name .. "%"})
            if players then
                for _, player in ipairs(players) do
                    local fullName = ("%s %s"):format(player.firstname or "", player.lastname or "")
                    table.insert(results, {
                        id = nil,
                        cid = player.identifier,
                        name = fullName,
                        online = false
                    })
                end
            end
        end
        return results
    end

    --- Retrieves a player's full name from their citizen ID.
    ---@param citizenId string
    ---@return string
    function Bridge.GetPlayerNameFromCitizenId(citizenId)
        if not citizenId then return "Unknown" end
        if Config.Framework == "QB" then
            local result = MySQL.query.await("SELECT charinfo FROM players WHERE citizenid = ?", { citizenId })
            if result and result[1] then
                local charinfo = json.decode(result[1].charinfo or "{}")
                return string.format("%s %s", charinfo.firstname or "Unknown", charinfo.lastname or "Unknown")
            end
        elseif Config.Framework == "ESX" then
            local result = MySQL.query.await('SELECT firstname, lastname FROM users WHERE identifier = ?', { citizenId })
            if result and result[1] then
                return ("%s %s"):format(result[1].firstname or "Unknown", result[1].lastname or "Unknown")
            end
        end
        return "Unknown"
    end

    --- Updates the offline player's money in the database.
    ---@param citizenId string
    ---@param amount number
    ---@return boolean
    function Bridge.UpdateOfflinePlayerMoney(citizenId, amount)
        if not citizenId or not amount then 
            return false 
        end
        if Config.Framework == "QB" then
            local result = MySQL.query.await('SELECT * FROM players WHERE citizenid = ?', { citizenId })
            if not result or #result == 0 then 
                return false 
            end
            local moneyAccounts = {}
            if result[1].money and result[1].money ~= "" then
                local status, decoded = pcall(json.decode, result[1].money)
                if status and decoded then
                    moneyAccounts = decoded
                else
                    moneyAccounts = {bank = 0, cash = 0, crypto = 0}
                end
            else
                moneyAccounts = {bank = 0, cash = 0, crypto = 0}
            end
            local oldBank = tonumber(moneyAccounts.bank) or 0
            moneyAccounts.bank = oldBank + amount
            local success = MySQL.update.await('UPDATE players SET money = ? WHERE citizenid = ?', {
                json.encode(moneyAccounts),
                citizenId
            })
            if success > 0 then
                return true
            else
                return false
            end
        elseif Config.Framework == "ESX" then
            local userCheck = MySQL.query.await('SELECT * FROM users WHERE identifier = ?', { citizenId })
            if not userCheck or #userCheck == 0 then
                return false
            end
            local success = false
            local accountsResult = MySQL.query.await('SELECT * FROM user_accounts WHERE identifier = ? AND name = "bank"', { citizenId })
            if accountsResult and #accountsResult > 0 then
                local currentMoney = tonumber(accountsResult[1].money) or 0
                local newAmount = currentMoney + amount
                success = MySQL.update.await('UPDATE user_accounts SET money = ? WHERE identifier = ? AND name = "bank"', {
                    newAmount,
                    citizenId
                }) > 0
                if success then
                    return true
                end
            end
            local currentBank = 0
            if userCheck and userCheck[1] and userCheck[1].bank then
                currentBank = tonumber(userCheck[1].bank) or 0
            end
            local newBank = currentBank + amount
            success = MySQL.update.await('UPDATE users SET bank = ? WHERE identifier = ?', {
                newBank,
                citizenId
            }) > 0
            if success then
                return true
            else
                return false
            end
        end
        return false
    end

    --- Registers a callback with the framework.
    ---@param name string
    ---@param callback function
    function Bridge.RegisterCallback(name, callback)
        if not InitFramework() then return end
        if Config.Framework == "QB" then
            QBCore.Functions.CreateCallback(name, callback)
        elseif Config.Framework == "ESX" then
            ESX.RegisterServerCallback(name, callback)
        end
    end

    --- Triggers a client callback.
    ---@param source number
    ---@param name string
    ---@param cb function
    ---@vararg any
    function Bridge.TriggerClientCallback(source, name, cb, ...)
        if not InitFramework() then return end
        if Config.Framework == "QB" then
            QBCore.Functions.TriggerClientCallback(name, source, cb, ...)
        elseif Config.Framework == "ESX" then
            ESX.TriggerClientCallback(name, source, cb, ...)
        end
    end

    --- Notifies a player.
    ---@param source number
    ---@param message string
    ---@param title string
    ---@param type string
    function Bridge.NotifyPlayer(source, message, title, type)
        TriggerClientEvent('peleg-billing:client:notify', source, message, title, type)
    end

    Citizen.CreateThread(function()
        Wait(1000)
        if not InitFramework() then 
            print("Failed to initialize framework bridge")
            return 
        end
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
            ESX.RegisterServerCallback('peleg-billing:getPlayerNameServer', function(source, cb, serverId)
                local xPlayer = ESX.GetPlayerFromId(serverId)
                if xPlayer then
                    local result = MySQL.query.await('SELECT firstname, lastname FROM users WHERE identifier = ?', { xPlayer.identifier })
                    if result and result[1] then
                        local fullName = ("%s %s"):format(result[1].firstname, result[1].lastname)
                        cb({ name = fullName, cid = xPlayer.identifier })
                    else
                        cb({ name = "Unknown", cid = "N/A" })
                    end
                else
                    cb({ name = "Unknown", cid = "N/A" })
                end
            end)
            ESX.RegisterServerCallback('peleg-billing:server:getPlayerIdentifier', function(source, cb, playerId)
                local targetPlayer = ESX.GetPlayerFromId(playerId)
                if targetPlayer then
                    cb(targetPlayer.identifier)
                else
                    cb(nil)
                end
            end)
        elseif Config.Framework == "QB" then
            QBCore.Functions.CreateCallback('peleg-billing:getPlayerName', function(source, cb, serverId)
                local targetPlayer = QBCore.Functions.GetPlayer(tonumber(serverId))
                if targetPlayer then
                    local charInfo = targetPlayer.PlayerData.charinfo
                    local fullName = ("%s %s"):format(charInfo.firstname, charInfo.lastname)
                    local cid = targetPlayer.PlayerData.citizenid  
                    cb({ name = fullName, cid = cid })
                else
                    cb({ name = "Unknown", cid = "N/A" })
                end
            end)
            QBCore.Functions.CreateCallback('peleg-billing:server:getPlayerCitizenId', function(source, cb, playerId)
                local targetPlayer = QBCore.Functions.GetPlayer(playerId)
                if targetPlayer then
                    cb(targetPlayer.PlayerData.citizenid)
                else
                    cb(nil)
                end
            end)
        end
    end)
else
    --- Notifies the player on the client side.
    ---@param message string
    ---@param title string
    ---@param type string
    function Bridge.Notify(message, title, type)
        message = tostring(message or "")
        title = tostring(title or "Notification")
        type = tostring(type or "primary")
        if Config.Notify == "qb" then
            if type ~= "primary" and type ~= "error" and type ~= "success" then
                type = "primary"
            end
            TriggerEvent('QBCore:Notify', message, type)
        elseif Config.Notify == "esx" then
            ESX.ShowNotification(message)
        elseif Config.Notify == "okokNotify" then
            if type == "primary" then type = "info" end
            if type ~= "info" and type ~= "warning" and type ~= "error" and type ~= "success" then
                type = "info"
            end
            TriggerEvent('okokNotify:Alert', title, message, 5000, type)
        elseif Config.Notify == "peleg-notify" then
            if type ~= "primary" and type ~= "error" and type ~= "success" and type ~= "info" and type ~= "warning" then
                type = "primary"
            end
            TriggerEvent('peleg-notify:notify', message, title, type)
        end
    end

    --- Retrieves player data on the client side.
    ---@return table|nil
    function Bridge.GetPlayerData()
        if not InitFramework() then return nil end
        if Config.Framework == "QB" then
            return QBCore.Functions.GetPlayerData()
        elseif Config.Framework == "ESX" then
            return ESX.GetPlayerData()
        end
        return nil
    end

    --- Retrieves player job information for UI display.
    ---@return table|nil, string, number
    function Bridge.GetPlayerJobInfo()
        local playerData = Bridge.GetPlayerData()
        if not playerData or not playerData.job then return nil, "none", 0 end
        local jobName = playerData.job.name or "none"
        local jobGrade
        if Config.Framework == "QB" then
            jobGrade = playerData.job.grade and playerData.job.grade.level or 0
        else
            jobGrade = playerData.job.grade or 0
        end
        return playerData, jobName, jobGrade
    end

    --- Retrieves the player's citizen ID.
    ---@return string|nil
    function Bridge.GetPlayerCitizenId()
        local playerData = Bridge.GetPlayerData()
        if not playerData then return nil end
        if Config.Framework == "QB" then
            return playerData.citizenid
        elseif Config.Framework == "ESX" then
            return playerData.identifier
        end
        return nil
    end

    --- Checks if the player has billing permission.
    ---@return boolean
    function Bridge.HasBillingPermission()
        local playerData = Bridge.GetPlayerData()
        if not playerData or not playerData.job then return false end
        local jobName = playerData.job.name or "none"
        local jobConfig = Config.Jobs[jobName]
        if not jobConfig then return false end
        local jobGrade
        if Config.Framework == "QB" then
            jobGrade = playerData.job.grade and playerData.job.grade.level or 0
        else
            jobGrade = playerData.job.grade or 0
        end
        local gradeStr = tostring(jobGrade)
        if jobConfig[gradeStr] and jobConfig[gradeStr].CanBill then
            return true
        end
        if Config.Framework == "QB" then
            local gradeLevel = playerData.job.grade and playerData.job.grade.level
            local gradeNum = tonumber(gradeStr)
            if gradeLevel and jobConfig[tostring(gradeLevel)] and jobConfig[tostring(gradeLevel)].CanBill then
                return true
            elseif gradeNum and jobConfig[tostring(gradeNum)] and jobConfig[tostring(gradeNum)].CanBill then
                return true
            end
        end
        return false
    end

    --- Checks if the player has the required billing item.
    ---@param callback function
    function Bridge.CheckBillingItem(callback)
        if not Config.BillingItem or Config.BillingItem == "" then
            callback(true)
            return
        end
        local callbackName = Config.Framework == "QB" and "QBCore:HasItem" or "peleg-billing:hasItem"
        Bridge.TriggerCallback(callbackName, function(hasItem)
            if not hasItem then
                Bridge.Notify("You need a billing tablet to perform this action!", "Error", "error")
            end
            callback(hasItem)
        end, Config.BillingItem)
    end

    --- Triggers a callback on the client side.
    ---@param name string
    ---@param cb function
    ---@vararg any
    function Bridge.TriggerCallback(name, cb, ...)
        if not InitFramework() then return end
        if Config.Framework == "QB" then
            QBCore.Functions.TriggerCallback(name, cb, ...)
        elseif Config.Framework == "ESX" then
            ESX.TriggerServerCallback(name, cb, ...)
        end
    end

    --- Retrieves player permissions for UI display.
    ---@return table, string, number
    function Bridge.GetPlayerPermissions()
        local playerData = Bridge.GetPlayerData()
        if not playerData or not playerData.job then return {}, "none", 0 end
        local jobName = playerData.job.name or "none"
        local jobGrade
        if Config.Framework == "QB" then
            jobGrade = playerData.job.grade and playerData.job.grade.level or 0
        else
            jobGrade = playerData.job.grade or 0
        end
        local permissions = {
            canBill = Bridge.HasBillingPermission(),
            jobAccess = false,
            inspectCitizen = false
        }
        if Config.Jobs[jobName] then
            local gradeStr = tostring(jobGrade)
            local jobConfig = nil
            if Config.Jobs[jobName][gradeStr] then
                jobConfig = Config.Jobs[jobName][gradeStr]
            elseif Config.Jobs[jobName]["0"] and jobGrade <= 0 then
                jobConfig = Config.Jobs[jobName]["0"]
            elseif Config.Jobs[jobName]["1"] and jobGrade <= 1 then
                jobConfig = Config.Jobs[jobName]["1"]
            end
            if jobConfig then
                permissions.jobAccess = jobConfig.BossAccess or false
                permissions.inspectCitizen = jobConfig.InspectCitizen or false
            end
        end
        return permissions, jobName, jobGrade
    end

    --- Retrieves nearby players.
    ---@param maxDistance number|nil
    ---@param maxCount number|nil
    ---@param callback function
    function Bridge.GetNearbyPlayers(maxDistance, maxCount, callback)
        local players = {}
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local nearbyPlayers = {}
        maxDistance = maxDistance or 5.0
        maxCount = maxCount or 10
        local activePlayers = GetActivePlayers()
        local nearbyCount = 0
        for _, player in ipairs(activePlayers) do
            if player ~= PlayerId() and nearbyCount < maxCount then
                local targetPed = GetPlayerPed(player)
                if DoesEntityExist(targetPed) then
                    local targetCoords = GetEntityCoords(targetPed)
                    local distance = #(playerCoords - targetCoords)
                    if distance < maxDistance then 
                        table.insert(nearbyPlayers, {
                            serverId = GetPlayerServerId(player),
                            distance = distance 
                        })
                        nearbyCount = nearbyCount + 1
                    end
                end
            end
        end
        table.sort(nearbyPlayers, function(a, b)
            return a.distance < b.distance
        end)
        local totalNearby = #nearbyPlayers
        local processed = 0
        if totalNearby == 0 then
            callback({})
            return
        end
        local callbackName = Config.Framework == "QB" and 'peleg-billing:getPlayerName' or 'peleg-billing:getPlayerNameServer'
        for _, playerData in ipairs(nearbyPlayers) do
            Bridge.TriggerCallback(callbackName, function(response)
                if response and response.name and response.cid then
                    table.insert(players, { 
                        id = playerData.serverId, 
                        name = response.name, 
                        cid = response.cid 
                    })
                end
                processed = processed + 1
                if processed == totalNearby then
                    callback(players)
                end
            end, playerData.serverId)
        end
        SetTimeout(5000, function()
            if processed < totalNearby then
                callback(players)
            end
        end)
    end

    Citizen.CreateThread(function()
        Wait(1000)
        if not InitFramework() then
            print("Failed to initialize framework bridge")
        end
    end)
end
