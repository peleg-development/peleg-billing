---@diagnostic disable: undefined-global
local showing = false
local billsShowing = false


local function playTabletAnim()
    local ped = PlayerPedId()
    RequestAnimDict("amb@code_human_in_bus_passenger_idles@female@tablet@base")
    while not HasAnimDictLoaded("amb@code_human_in_bus_passenger_idles@female@tablet@base") do
        Wait(0)
    end
    TaskPlayAnim(ped, "amb@code_human_in_bus_passenger_idles@female@tablet@base", "base", 3.0, -1, -1, 49, 0, 0, 0, 0)
end

---@param on boolean
local function setFocus(on)
	SetNuiFocus(on, on)
	SetNuiFocusKeepInput(false)
end

local function openTablet()
	if showing then return end
	showing = true
	setFocus(true)

	playTabletAnim()

	lib.callback('peleg-billing:getSelf', false, function(selfData)
		SendNUIMessage({ type = 'openTablet', self = selfData })
		if selfData then
			SendNUIMessage({ type = 'tablet:locale', data = selfData.locale or {}, disableHome = selfData.disableHome or false, self = selfData })
		end
	end)
end

local function closeTablet()
	if not showing then return end
	showing = false
	ClearPedTasks(PlayerPedId())
	setFocus(false)
	SendNUIMessage({ type = 'closeTablet' })
end

local function openBills()
	if billsShowing then return end
	billsShowing = true

	setFocus(true)
	SendNUIMessage({ type = 'openBills' })
end

local function closeBills()
	if not billsShowing then return end
	billsShowing = false
	setFocus(false)
	SendNUIMessage({ type = 'closeBills' })
end

RegisterNetEvent('peleg-billing:client:open', function(selfData)
    if selfData then
        SendNUIMessage({ type = 'tablet:locale', data = selfData.locale or {}, disableHome = selfData.disableHome or false, self = selfData })
    end
    openTablet()
end)

RegisterCommand("bills", function()
    openBills()
end, false)

RegisterNetEvent('peleg-billing:client:invOpen', function()
	TriggerServerEvent('peleg-billing:server:useTablet')
end)

--> [NUI Callbacks] <--
RegisterNUICallback('peleg-billing:close', function(_, cb)
	closeTablet()
	cb(true)
end)

RegisterNUICallback('peleg-billing:closeBills', function(_, cb)
	closeBills()
	cb(true)
end)

RegisterNUICallback('peleg-billing:getSelf', function(_, cb)
    local ped = PlayerPedId()
    local coords = GetEntityCoords(ped)
    lib.callback('peleg-billing:getSelf', false, function(self)
        cb(self)
    end, { coords = coords })	
end)

RegisterNUICallback('peleg-billing:getNearbyPlayers', function(_, cb)
    lib.callback('peleg-billing:getNearbyPlayers', false, function(result)
        cb(result or {})
    end)
end)

RegisterNUICallback('peleg-billing:getJobs', function(_, cb)
    lib.callback('peleg-billing:getJobs', false, function(result)
        cb(result or {})
    end)
end)

RegisterNUICallback('peleg-billing:getJobGrades', function(data, cb)
    lib.callback('peleg-billing:getJobGrades', false, function(result)
        cb(result or {})
    end, data and data.job or '')
end)

RegisterNUICallback('peleg-billing:getAccessConfig', function(data, cb)
    lib.callback('peleg-billing:getAccessConfig', false, function(result)
        cb(result or { grades = {} })
    end, data and data.job or '')
end)

RegisterNUICallback('peleg-billing:getBillsByCid', function(data, cb)
    lib.callback('peleg-billing:getBillsByCid', false,  function(result)
        cb(result or {})
    end,  data and data.cid or '')
end)

RegisterNUICallback('peleg-billing:getBillsByJob', function(data, cb)
    lib.callback('peleg-billing:getBillsByJob', false, function(result)
        cb(result or {})
    end, data and data.job or '')
end)

RegisterNUICallback('peleg-billing:fetchBills', function(data, cb)
    lib.callback('peleg-billing:fetchBills', false, function(result)
        cb(result or {})
    end, data)
end)

RegisterNUICallback('peleg-billing:getWallpaper', function(data, cb)
    lib.callback('peleg-billing:getWallpaper', false, function(result)
        cb(result)
    end, data and data.cid or '')
end)

RegisterNetEvent('peleg-billing:client:refreshBills', function(rows)
	SendNUIMessage({ type = 'billing:refresh', rows = rows })
end)



RegisterNUICallback('peleg-billing:createBill', function(data, cb)
	TriggerServerEvent('peleg-billing:server:createBill', tonumber(data.targetSrc), tostring(data.job), tonumber(data.amount), tostring(data.description or ''), data.account == 'cash' and 'cash' or 'bank')
	cb(true)
end)

RegisterNUICallback('peleg-billing:payBill', function(data, cb)
	TriggerServerEvent('peleg-billing:server:payBill', tonumber(data.id))
	cb(true)
end)

RegisterNUICallback('peleg-billing:refundBill', function(data, cb)
	TriggerServerEvent('peleg-billing:server:refundBill', tonumber(data.id), tostring(data.reason or ''))
	cb(true)
end)

RegisterNUICallback('peleg-billing:setGradePerm', function(data, cb)
	TriggerServerEvent('peleg-billing:server:setGradePerm', tostring(data.job), tostring(data.cid or ''), tonumber(data.minGrade or 0), data and data.data or nil)
	cb(true)
end)

RegisterNUICallback('peleg-billing:setWallpaper', function(data, cb)
	local url = data and data.url or ''
	TriggerServerEvent('peleg-billing:server:setWallpaper', tostring(url or ''))
	cb(true)
end)


