--------------------------------------------------------------------------------
-- Initialization for QB or ESX
--------------------------------------------------------------------------------
local QBCore = nil
local ESX    = nil

if Config.Framework == "QB" then
    QBCore = exports["qb-core"]:GetCoreObject()
elseif Config.Framework == "ESX" then
    ESX = exports["es_extended"]:getSharedObject()
end

--------------------------------------------------------------------------------
-- NUI Handling & Callbacks
--------------------------------------------------------------------------------
local function OpenUi(data)
    if not data then
        print("Error: No data provided to OpenUi")
        return
    end

    local message = {
        type = "openMe",
        data = data
    }
    print("Sending NUI data:", json.encode(message))
    SendNUIMessage(message)
    SetNuiFocus(true, true)
end

RegisterNetEvent('krs-billing:openBillingMenu', function(data)
    OpenUi(data)
end)

RegisterNUICallback('krs-billing:callback:refundBill', function(data, cb)
    local billId = data.billId
    TriggerServerEvent('krs-billing:refundBill', billId)
    cb('ok')
end)

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
end)

RegisterNUICallback('krs-billing:callback:close', function(data, cb)
    SetNuiFocus(false, false)
    cb('ok')
end)

RegisterNUICallback('krs-billing:callback:billPlayer', function(data, cb)
    TriggerServerEvent('krs-billing:server:billPlayer', data)
    cb("ok")
end)

RegisterNUICallback('krs-billing:callback:payBill', function(data, cb)
    TriggerServerEvent('krs-billing:payBill', data.billId, data.payFromJobAccount)
    cb("ok")
end)

--------------------------------------------------------------------------------
-- Nearby Players
--------------------------------------------------------------------------------
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

RegisterNUICallback('krs-billing:callback:getNearbyPlayers', function(data, cb)
    local status, err = pcall(function()
        print("[peleg-billing] NUI callback 'getNearbyPlayers' triggered.")
        local players = {}
        local playerPed = PlayerPedId()
        local playerCoords = GetEntityCoords(playerPed)
        local nearbyPlayers = {}

        for _, player in ipairs(GetActivePlayers()) do
            if player ~= PlayerId() then
                local targetPed = GetPlayerPed(player)
                local targetCoords = GetEntityCoords(targetPed)
                if #(playerCoords - targetCoords) < 10.0 then 
                    local serverId = GetPlayerServerId(player)
                    table.insert(nearbyPlayers, serverId)
                end
            end
        end

        local totalNearby = #nearbyPlayers
        local processed = 0

        print(string.format("[peleg-billing] Found %d nearby players.", totalNearby))

        if totalNearby == 0 then
            print("[peleg-billing] No nearby players found. Returning empty list.")
            cb(players)
            return
        end

        for _, serverId in ipairs(nearbyPlayers) do
            if Config.Framework == "QB" then
                QBCore.Functions.TriggerCallback('krs-billing:getPlayerName', function(response)
                    print(string.format("[peleg-billing] Retrieved data for serverId %d: Name - %s | CID - %s", serverId, response.name, response.cid))
                    table.insert(players, { id = serverId, name = response.name, cid = response.cid })
                    processed = processed + 1

                    if processed == totalNearby then
                        local serializedPlayers = serializeTable(players)
                        print(string.format("[peleg-billing] All nearby players processed. Data to send: %s", serializedPlayers))
                        cb(players)
                    end
                end, serverId)
            elseif Config.Framework == "ESX" then
                TriggerServerEvent('krs-billing:getPlayerNameServer', serverId, function(response)
                    print(string.format("[peleg-billing] Retrieved data for serverId %d: Name - %s | CID - %s", serverId, response.name, response.cid))
                    table.insert(players, { id = serverId, name = response.name, cid = response.cid })
                    processed = processed + 1

                    if processed == totalNearby then
                        local serializedPlayers = serializeTable(players)
                        print(string.format("[peleg-billing] All nearby players processed. Data to send: %s", serializedPlayers))
                        cb(players)
                    end
                end)
            end
        end
    end)

    if not status then
        print(string.format("[peleg-billing] Error in 'getNearbyPlayers' callback: %s", tostring(err)))
        cb({ error = "An error occurred while fetching nearby players." })
    end
end)

--------------------------------------------------------------------------------
-- Command or Item Usage to Open the Billing Menu
--------------------------------------------------------------------------------
if Config.Framework == "QB" then
    RegisterCommand(Config.BillCommand, function()
        local playerPed = PlayerPedId()

        if not Config.BillingItem or Config.BillingItem == "" then
            local playerData = QBCore.Functions.GetPlayerData()
            TriggerServerEvent('krs-billing:requestBillingMenu', playerData.citizenid)
            return
        end
    
        QBCore.Functions.TriggerCallback("QBCore:HasItem", function(hasItem)
            if hasItem then
                local playerData = QBCore.Functions.GetPlayerData()
                TriggerServerEvent('krs-billing:requestBillingMenu', playerData.citizenid)
            else
                QBCore.Functions.Notify("You need a billing tablet to open the menu!", "error")
            end
        end, Config.BillingItem) 
    end, false)

elseif Config.Framework == "ESX" then
    RegisterCommand(Config.BillCommand, function()
        local playerPed = PlayerPedId()

        if not Config.BillingItem or Config.BillingItem == "" then
            TriggerServerEvent('krs-billing:requestBillingMenu')
            return
        end

        ESX.TriggerServerCallback("krs-billing:hasItem", function(hasItem)
            if hasItem then
                TriggerServerEvent('krs-billing:requestBillingMenu')
            else
                ESX.ShowNotification("You need a billing tablet to open the menu!", false, false, 140)
            end
        end, Config.BillingItem)
    end)
end


