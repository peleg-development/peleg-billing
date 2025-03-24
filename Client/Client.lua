local QBCore = nil
local ESX    = nil

local cachedNearbyPlayers = {}

if Config.Framework == "QB" then
    QBCore = exports["qb-core"]:GetCoreObject()
elseif Config.Framework == "ESX" then
    ESX = exports["es_extended"]:getSharedObject()
end

function NotifyPlayer(message,title,  type)
    type = type or "info" 

    if Config.Notify == "qb" then
        TriggerEvent('QBCore:Notify', message, type)
    elseif Config.Notify == "esx" then
        ESX.ShowNotification(message)
    elseif Config.Notify == "okokNotify" then
        TriggerEvent('okokNotify:Alert', title, message, 5000, type)
    elseif Config.Notify == "peleg-notify" then
        exports["peleg-notify"]:notify(message, title, type)
    end
end

function GetCurrentLocale()
    return Config.Locales[Config.Locale] or Config.Locales["en"]
end

function RefactorLocaleForNUI()
    local flatLocale = {}
    local currentLocale = GetCurrentLocale()

    for _, section in pairs(currentLocale) do
        for key, value in pairs(section) do
            flatLocale[key] = value
        end
    end

    return flatLocale
end

local function OpenUi(data)
    if not data then
        return
    end
    
    data.locale = RefactorLocaleForNUI()
    local message = {
        type = "openMe",
        data = data
    }
    SendNUIMessage(message)
    SetNuiFocus(true, true)
end

RegisterNetEvent('peleg-billing:openBillingMenu', function(data)
    OpenUi(data)
end)

RegisterNetEvent('peleg-billing:client:receiveOnlinePlayers', function(players)
    SendNUIMessage({
        type = 'updatePlayers',
        players = players
    })
end)

RegisterNetEvent('peleg-billing:client:notify', function(message, type)
    NotifyPlayer(message, type)
end)

RegisterNUICallback('peleg-billing:callback:refundBill', function(data, cb)
    local billId = data.billId
    TriggerServerEvent('peleg-billing:refundBill', billId)
    cb('ok')
end)

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback('peleg-billing:callback:close', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('peleg-billing:callback:billPlayer', function(data, cb)
    TriggerServerEvent('peleg-billing:server:billPlayer', data)
    cb("ok")
end)

RegisterNUICallback('peleg-billing:callback:notify', function(data, cb)
    NotifyPlayer(data.message, data.type)
    cb("ok")
end)

RegisterNUICallback('peleg-billing:callback:payBill', function(data, cb)
    TriggerServerEvent('peleg-billing:payBill', data.billId, data.payFromJobAccount)
    cb("ok")
end)

RegisterNUICallback('peleg-billing:callback:checkBalance', function(data, cb)
    local amount = tonumber(data.amount)

    TriggerServerEvent('peleg-billing:server:checkBalance', amount)

    RegisterNetEvent('peleg-billing:client:checkBalanceResponse', function(hasEnough)
        cb({ hasEnough = hasEnough })
    end)
end)

RegisterNUICallback('peleg-billing:callback:getOnlinePlayers', function(data, cb)
    local searchQuery = data.query or ""
    TriggerServerEvent('peleg-billing:server:getOnlinePlayers', searchQuery)

    RegisterNetEvent('peleg-billing:client:receiveOnlinePlayers', function(players)
        cb(players) 
    end)
end)


RegisterNUICallback('peleg-billing:callback:fetchPlayerBills', function(data, cb)
    local cid = data.cid
    TriggerServerEvent('peleg-billing:server:fetchPlayerBills', cid, function(bills)
        cb({ bills = bills })
    end)
end)

RegisterNetEvent('peleg-billing:client:receiveBills', function(bills)
    SendNUIMessage({
        type = 'updatePlayerBills',
        bills = bills
    })
end)

local function serializeTable(tbl)
    local status, result = pcall(function()
        return json.encode(tbl)
    end)
    if status then
        return result
    else
        return "{}"
    end
end

local lastNearbyPlayersCheck = 0
local nearbyPlayersCooldown = 1500 

RegisterNUICallback('peleg-billing:callback:getNearbyPlayers', function(data, cb)
    local currentTime = GetGameTimer()
    if currentTime - lastNearbyPlayersCheck < nearbyPlayersCooldown then
        cb(cachedNearbyPlayers or {})
        return
    end
    
    lastNearbyPlayersCheck = currentTime
    local status, err = pcall(function()
        local players = {}
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local nearbyPlayers = {}
        local maxDistance = 5.0
        local maxPlayersToProcess = 10 

        local activePlayers = GetActivePlayers()
        local nearbyCount = 0
        
        for _, player in ipairs(activePlayers) do
            if player ~= PlayerId() and nearbyCount < maxPlayersToProcess then
                local targetPed = GetPlayerPed(player)
                if DoesEntityExist(targetPed) then
                    local targetCoords = GetEntityCoords(targetPed)
                    local distance = #(playerCoords - targetCoords)
                    if distance < maxDistance then 
                        local serverId = GetPlayerServerId(player)
                        table.insert(nearbyPlayers, {
                            serverId = serverId,
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
            cachedNearbyPlayers = {}
            cb({})
            return
        end
        
        if Config.Framework == "QB" then
            for _, playerData in ipairs(nearbyPlayers) do
                QBCore.Functions.TriggerCallback('peleg-billing:getPlayerName', function(response)
                    if response and response.name and response.cid then
                        table.insert(players, { 
                            id = playerData.serverId, 
                            name = response.name, 
                            cid = response.cid 
                        })
                    end
                    
                    processed = processed + 1
                    if processed == totalNearby then
                        cachedNearbyPlayers = players
                        cb(players)
                    end
                end, playerData.serverId)
            end
        elseif Config.Framework == "ESX" then
            for _, playerData in ipairs(nearbyPlayers) do
                ESX.TriggerServerCallback('peleg-billing:getPlayerNameServer', function(response)
                    if response and response.name and response.cid then
                        table.insert(players, { 
                            id = playerData.serverId, 
                            name = response.name, 
                            cid = response.cid 
                        })
                    end
                    
                    processed = processed + 1
                    if processed == totalNearby then
                        cachedNearbyPlayers = players
                        cb(players)
                    end
                end, playerData.serverId)                
            end
        end

        SetTimeout(5000, function()
            if processed < totalNearby then
                cachedNearbyPlayers = players
                cb(players)
            end
        end)
    end)

    if not status then
        cb(cachedNearbyPlayers or {})
    end
end)

if Config.Framework == "QB" then
    RegisterCommand("bills", function()
        local playerPed = PlayerPedId()

        if not Config.BillingItem or Config.BillingItem == "" then
            local playerData = QBCore.Functions.GetPlayerData()
            TriggerServerEvent('peleg-billing:requestBillingMenu', playerData.citizenid)
            return
        end
    
        QBCore.Functions.TriggerCallback("QBCore:HasItem", function(hasItem)
            if hasItem then
                local playerData = QBCore.Functions.GetPlayerData()
                TriggerServerEvent('peleg-billing:requestBillingMenu', playerData.citizenid)
            else
                QBCore.Functions.Notify("You need a billing tablet to open the menu!", "error")
            end
        end, Config.BillingItem) 
    end, false)

elseif Config.Framework == "ESX" then
    RegisterCommand(Config.BillCommand, function()
        local playerPed = PlayerPedId()

        if not Config.BillingItem or Config.BillingItem == "" then
            TriggerServerEvent('peleg-billing:requestBillingMenu')
            return
        end

        ESX.TriggerServerCallback("peleg-billing:hasItem", function(hasItem)
            if hasItem then
                TriggerServerEvent('peleg-billing:requestBillingMenu')
            else
                ESX.ShowNotification("You need a billing tablet to open the menu!", false, false, 140)
            end
        end, Config.BillingItem)
    end)
end


