---@type table Cached nearby players list.
local cachedNearbyPlayers = {}
---@type boolean Whether the quick bill UI is active.
local quickBillActive = false
---@type any Timer reference for quick bill.
local quickBillTimer = nil
---@type number Last time nearby players were checked.
local lastNearbyPlayersCheck = 0
---@type number Cooldown between nearby player checks in milliseconds.
local nearbyPlayersCooldown = 1500
---@type number Active prop entity handle
local activePropObject = nil

--- Retrieves the current locale from the Bridge.
---@return table Current locale table.
function GetCurrentLocale()
    return Bridge.GetCurrentLocale()
end

--- Flattens the locale table for use in the NUI.
---@return table A flat locale table.
function FlattenLocaleForNUI()
    local flatLocale = {}
    local currentLocale = GetCurrentLocale()
    for _, section in pairs(currentLocale) do
        for key, value in pairs(section) do
            flatLocale[key] = value
        end
    end
    return flatLocale
end

--- Sends a notification to the player.
---@param message string The notification message.
---@param title string The title for the notification.
---@param type string The type of notification (e.g. "primary", "error").
function NotifyPlayer(message, title, type)
    Bridge.Notify(message, title, type)
end

--- Sends a message to the NUI.
---@param type string The message type.
---@param data table|nil The data payload.
function SendUIMessage(type, data)
    SendNUIMessage({
        type = type,
        data = data or {}
    })
end

--- Starts the billing animation with a clipboard prop.
function StartBillingAnimation()
    if not Config.AnimationConfig.Enabled then return end
    
    if activePropObject then
        DeleteEntity(activePropObject)
        activePropObject = nil
    end
    
    local playerPed = PlayerPedId()
    local propName = Config.AnimationConfig.Prop
    local propBone = Config.AnimationConfig.PropBone
    local propPlacement = Config.AnimationConfig.PropPlacement
    local dict = Config.AnimationConfig.Dict
    local anim = Config.AnimationConfig.Anim
    
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Wait(10)
    end
    
    local propHash = GetHashKey(propName)
    RequestModel(propHash)
    while not HasModelLoaded(propHash) do
        Wait(10)
    end
    
    local x, y, z = table.unpack(GetEntityCoords(playerPed))
    activePropObject = CreateObject(propHash, x, y, z + 0.2, true, true, true)
    local boneIndex = GetPedBoneIndex(playerPed, propBone)
    
    AttachEntityToEntity(activePropObject, playerPed, boneIndex, 
                        propPlacement[1], propPlacement[2], propPlacement[3], 
                        propPlacement[4], propPlacement[5], propPlacement[6], 
                        true, true, false, true, 1, true)
    
    TaskPlayAnim(playerPed, dict, anim, 8.0, 8.0, -1, 49, 0, false, false, false)
end

--- Starts the tablet animation for quick billing.
function StartTabletAnimation()
    if not Config.TabletAnimationConfig.Enabled then return end
    
    if activePropObject then
        DeleteEntity(activePropObject)
        activePropObject = nil
    end
    
    local playerPed = PlayerPedId()
    local propName = Config.TabletAnimationConfig.Prop
    local propBone = Config.TabletAnimationConfig.PropBone
    local propPlacement = Config.TabletAnimationConfig.PropPlacement
    local dict = Config.TabletAnimationConfig.Dict
    local anim = Config.TabletAnimationConfig.Anim
    
    RequestAnimDict(dict)
    while not HasAnimDictLoaded(dict) do
        Wait(10)
    end
    
    local propHash = GetHashKey(propName)
    RequestModel(propHash)
    while not HasModelLoaded(propHash) do
        Wait(10)
    end
    
    local x, y, z = table.unpack(GetEntityCoords(playerPed))
    activePropObject = CreateObject(propHash, x, y, z + 0.2, true, true, true)
    local boneIndex = GetPedBoneIndex(playerPed, propBone)
    
    AttachEntityToEntity(activePropObject, playerPed, boneIndex, 
                        propPlacement[1], propPlacement[2], propPlacement[3], 
                        propPlacement[4], propPlacement[5], propPlacement[6], 
                        true, true, false, true, 1, true)
    
    TaskPlayAnim(playerPed, dict, anim, 8.0, 8.0, -1, 49, 0, false, false, false)
end

--- Stops any active animation and removes any props.
function StopBillingAnimation()
    if activePropObject then
        DeleteEntity(activePropObject)
        activePropObject = nil
    end
    
    local playerPed = PlayerPedId()
    ClearPedTasks(playerPed)
    StopAnimTask(playerPed, Config.AnimationConfig.Dict, Config.AnimationConfig.Anim, 1.0)
    StopAnimTask(playerPed, Config.TabletAnimationConfig.Dict, Config.TabletAnimationConfig.Anim, 1.0)
end

--- Opens the billing menu UI.
---@param data table The data to send to the billing menu.
function OpenBillingMenu(data)
    if not data then return end
    data.locale = FlattenLocaleForNUI()
    SendNUIMessage({
        type = "openMe",
        data = data
    })
    SetNuiFocus(true, true)
    StartBillingAnimation()
end

--- Opens the quick bill UI and sets a timeout to close it.
function OpenQuickBillUI()
    CloseQuickBillUI()
    quickBillActive = true
    quickBillTimer = SetTimeout(30000, function()
        if quickBillActive then CloseQuickBillUI() end
    end)
    SetNuiFocus(true, true)
    StartTabletAnimation()
    SendNUIMessage({
        type = "openQuickBill",
        data = { locale = FlattenLocaleForNUI() }
    })
end

function CloseQuickBillUI()
    if quickBillTimer then
        ClearTimeout(quickBillTimer)
        quickBillTimer = nil
    end
    if quickBillActive then
        quickBillActive = false
        SendNUIMessage({ type = "forceCloseQuickBill" })
        SetNuiFocus(false, false)
        StopBillingAnimation()
    end
end

--- Checks if the player has the required billing item.
---@param callback function A callback function that receives a boolean.
function CheckBillingItem(callback)
    Bridge.CheckBillingItem(callback)
end

--- Checks if the player has the quick bill tablet item.
---@param callback function A callback function that receives a boolean.
function CheckQuickBillItem(callback)
    Bridge.CheckQuickBillItem(callback)
end

--- Returns whether the player has billing permission.
---@return boolean
function HasBillingPermission()
    return Bridge.HasBillingPermission()
end

-- Events

RegisterNetEvent('peleg-billing:openBillingMenu', OpenBillingMenu)

RegisterNetEvent('peleg-billing:client:receiveOnlinePlayers', function(players)
    SendNUIMessage({ type = 'updatePlayers', players = players })
end)

RegisterNetEvent('peleg-billing:client:notify', function(message, title, type)
    NotifyPlayer(tostring(message or ""), tostring(title or ""), tostring(type or "primary"))
end)

RegisterNetEvent('peleg-billing:client:receiveBills', function(bills)
    SendNUIMessage({ type = 'updatePlayerBills', bills = bills })
end)

RegisterNetEvent('peleg-billing:client:billStatusUpdated', function(updatedBill)
    if not updatedBill or not updatedBill.id then return end
    SendNUIMessage({ type = 'billStatusUpdated', bill = updatedBill })
end)

RegisterNetEvent('peleg-billing:client:receiveBillingStats', function(stats)
    SendNUIMessage({ type = 'updateBillingStats', stats = stats })
end)

RegisterNetEvent('peleg-billing:client:checkBalanceResponse', function(hasEnough)
end)

RegisterNetEvent('peleg-billing:client:useTablet', function()
    CheckBillingItem(function(hasItem)
        if hasItem then
            local citizenId = Bridge.GetPlayerCitizenId()
            TriggerServerEvent('peleg-billing:requestBillingMenu', citizenId)
        end
    end)
end)

RegisterNetEvent('peleg-billing:client:useQuickBillTablet', function()
    if not HasBillingPermission() then
        local playerData, jobName, jobGrade = Bridge.GetPlayerJobInfo()
        NotifyPlayer("You don't have permission to bill players! [Job: " .. (jobName or "none") .. ", Grade: " .. (jobGrade or 0) .. "]", "Error", "error")
        return
    end
    OpenQuickBillUI()
end)

-- NUI Callbacks

RegisterNUICallback('close', function()
    SetNuiFocus(false, false)
    StopBillingAnimation()
end)

RegisterNUICallback('peleg-billing:callback:close', function(data, cb)
    SetNuiFocus(false, false)
    StopBillingAnimation()
    cb('ok')
end)

RegisterNUICallback('peleg-billing:callback:refundBill', function(data, cb)
    TriggerServerEvent('peleg-billing:server:refundBill', data.billId)
    local locale = GetCurrentLocale()
    local msg = locale.notifications.refundInitiated or ("Initiating refund for bill #" .. data.billId)
    local title = locale.notifications.refundTitle or "Refund Request"
    NotifyPlayer(msg, title, "success")
    cb('ok')
end)

RegisterNUICallback('peleg-billing:callback:cancelBill', function(data, cb)
    TriggerServerEvent('peleg-billing:server:cancelBill', data.billId)
    local locale = GetCurrentLocale()
    local msg = locale.notifications.cancelInitiated or ("Cancellation request sent for bill #" .. data.billId)
    local title = locale.notifications.cancelTitle or "Bill Cancellation"
    NotifyPlayer(msg, title, "success")
    cb('ok')
end)

RegisterNUICallback('peleg-billing:callback:billPlayer', function(data, cb)
    TriggerServerEvent('peleg-billing:server:billPlayer', data)
    cb("ok")
end)

RegisterNUICallback('peleg-billing:callback:notify', function(data, cb)
    NotifyPlayer(data.message, data.title, data.type)
    cb("ok")
end)

RegisterNUICallback('peleg-billing:callback:payBill', function(data, cb)
    TriggerServerEvent('peleg-billing:payBill', data.billId, data.payFromJobAccount)
    cb("ok")
end)

RegisterNUICallback('peleg-billing:callback:checkBalance', function(data, cb)
    TriggerServerEvent('peleg-billing:server:checkBalance', tonumber(data.amount))
    RegisterNetEvent('peleg-billing:client:checkBalanceResponse', function(hasEnough)
        cb({ hasEnough = hasEnough })
    end)
end)

RegisterNUICallback('peleg-billing:callback:getOnlinePlayers', function(data, cb)
    TriggerServerEvent('peleg-billing:server:getOnlinePlayers', data.query or "")
    RegisterNetEvent('peleg-billing:client:receiveOnlinePlayers', function(players)
        cb(players)
    end)
end)

RegisterNUICallback('peleg-billing:callback:fetchPlayerBills', function(data, cb)
    TriggerServerEvent('peleg-billing:server:fetchPlayerBills', data.cid, function(bills)
        cb({ bills = bills })
    end)
end)

RegisterNUICallback('peleg-billing:callback:getNearbyPlayers', function(data, cb)
    local currentTime = GetGameTimer()
    if currentTime - lastNearbyPlayersCheck < nearbyPlayersCooldown then
        cb(cachedNearbyPlayers or {})
        return
    end
    lastNearbyPlayersCheck = currentTime
    Bridge.GetNearbyPlayers(5.0, 10, function(players)
        cachedNearbyPlayers = players
        cb(players)
    end)
end)

RegisterNUICallback('peleg-billing:callback:quickBillPlayer', function(data, cb)
    CloseQuickBillUI()
    local playerCid = data.cid
    local reason = data.reason or ""
    local amount = tonumber(data.amount) or 0
    if playerCid and reason ~= "" and amount > 0 then
        TriggerServerEvent("peleg-billing:server:billPlayer", {
            cid = playerCid,
            reason = reason,
            amount = amount
        })
        NotifyPlayer(Config.Locale["bill_sent"] or "Bill sent", "Success", "success")
    else
        NotifyPlayer(Config.Locale["invalid_bill_data"] or "Invalid bill data", "Error", "error")
    end
    cb({ success = true })
end)

RegisterNUICallback('peleg-billing:callback:closeQuickBill', function(data, cb)
    CloseQuickBillUI()
    cb({ success = true })
end)

RegisterNUICallback('peleg-billing:callback:getBillingStats', function(data, cb)
    local requestData = {}
    if data and data.societyMode then
        local playerData = Bridge.GetPlayerData()
        if playerData and playerData.job then
            requestData.job = playerData.job.name
        end
    end
    TriggerServerEvent('peleg-billing:server:getBillingStats', requestData)
    RegisterNetEvent('peleg-billing:client:receiveBillingStats', function(stats)
        cb(stats)
    end)
end)

-- Commands

RegisterCommand('closequickbill', function()
    CloseQuickBillUI()
end, false)

RegisterCommand(Config.BillCommand, function()
    CheckBillingItem(function(hasItem)
        if hasItem then
            local citizenId = Bridge.GetPlayerCitizenId()
            TriggerServerEvent('peleg-billing:requestBillingMenu', citizenId)
        end
    end)
end, false)

RegisterCommand(Config.BillPlayerCommand, function()
    if not HasBillingPermission() then
        local playerData, jobName, jobGrade = Bridge.GetPlayerJobInfo()
        NotifyPlayer("You don't have permission to bill players! [Job: " .. (jobName or "none") .. ", Grade: " .. (jobGrade or 0) .. "]", "Error", "error")
        return
    end
    CheckQuickBillItem(function(hasItem)
        if hasItem then OpenQuickBillUI() end
    end)
end, false)

AddEventHandler('onResourceStop', function(resourceName)
    if (GetCurrentResourceName() ~= resourceName) then return end
    CloseQuickBillUI()
    StopBillingAnimation()
end)
