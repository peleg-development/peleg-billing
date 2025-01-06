local QBCore = exports["qb-core"]:GetSharedObject()

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

RegisterNUICallback('krs-billing:nui:callback:billPlayer', function (data, cb)
    TriggerServerEvent('krs-billing:server:billPlayer', data)
    cb("ok")
end)

RegisterCommand(Config.BillCommand, function()
    local playerPed = PlayerPedId()

    if not Config.BillingItem or Config.BillingItem == "" then
        print("Config.BillingItem is not set. Please configure the required billing item.")
        QBCore.Functions.Notify("Billing item is not configured. Contact an admin.", "error")
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
