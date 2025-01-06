local QBCore = exports["qb-core"]:GetSharedObject()

TSE = function (event, ...)
    TriggerServerEvent(event, ...)
end

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
    TSE('krs-billing:server:billPlayer', data)
    cb("ok")
end)
