---@diagnostic disable: undefined-global
local json = json or {}

---@param url string
---@param payload table
---@return boolean
local function postWebhook(url, payload)
	if not url or url == '' then return false end

	if not payload or type(payload) ~= 'table' then
		print('[peleg-billing] Invalid payload for webhook')
		return false
	end

	local jsonData = json.encode(payload)
	if not jsonData then
		print('[peleg-billing] Failed to encode payload to JSON')
		return false
	end

	PerformHttpRequest(url, function(status, body, headers)
		if status < 200 or status >= 300 then
			if status == 400 then
				print('[peleg-billing] Payload that failed:')
				print(jsonData)
			end
		end
	end, 'POST', jsonData, {
		['Content-Type'] = 'application/json',
		['Accept'] = 'application/json'
	})
	return true
end

---@param user table|nil
---@return string|nil
local function getDiscordId(user)
	local src = type(user) == 'number' and user or (user and user.source)
	if not src then return nil end

	local identifiers = GetPlayerIdentifiers(src)
	if not identifiers then return nil end

	for _, id in ipairs(identifiers) do
		if string.find(id, 'discord:') then
			return id:sub(9)
		end
	end
	return nil
end

---@param cid string|nil
---@param name string|nil
---@param src number|nil
---@return table
local function identity(cid, name, src)
	local tag = name or (src and GetPlayerName(src)) or 'unknown'
	local discord = src and getDiscordId(src) or nil
	return { cid = cid, name = tag, discord = discord }
end

---@param title string
---@param description string
---@param color number
---@param fields table<string, string>|nil
---@return table
local function embed(title, description, color, fields)
	local f = {}
	local emojis = {
		Actor   = "🧑‍💼",
		Target  = "🎯",
		billId  = "🧾",
		reason  = "📝",
		amount  = "💰",
		account = "🏦",
		job     = "⚒️"
	}

	-- Group: Actors
	if fields and (fields["Actor"] or fields["Target"]) then
		table.insert(f, { name = "👥 Actors", value = "—", inline = false })
		if fields["Actor"] then
			table.insert(f, {
				name = emojis.Actor .. " Actor",
				value = tostring(fields["Actor"]),
				inline = true
			})
		end
		if fields["Target"] then
			table.insert(f, {
				name = emojis.Target .. " Target",
				value = tostring(fields["Target"]),
				inline = true
			})
		end
	end

	-- Group: Bill Details
	table.insert(f, { name = "📄 Bill Details", value = "—", inline = false })
	for _, key in ipairs({ "billId", "reason", "amount", "account", "job" }) do
		if fields and fields[key] then
			local val = tostring(fields[key])
			if #val > 1024 then val = val:sub(1, 1021) .. "..." end
			table.insert(f, {
				name = (emojis[key] or "") .. " " .. key,
				value = val,
				inline = true
			})
		end
	end

	-- Group: Metadata
	table.insert(f, { name = "🛠️ Metadata", value = "—", inline = false })
	table.insert(f, {
		name = "Server Time",
		value = os.date("%Y-%m-%d %H:%M:%S"),
		inline = true
	})
	table.insert(f, {
		name = "UTC Time",
		value = os.date("!%Y-%m-%d %H:%M:%S"),
		inline = true
	})
	table.insert(f, {
		name = "Resource",
		value = GetCurrentResourceName(),
		inline = true
	})

	local safeTimestamp = os.date("!%Y-%m-%dT%H:%M:%SZ"):gsub("%z", "")

	return {
		username = "Peleg Billing",
		avatar_url = "https://media.discordapp.net/attachments/1405125836914294824/1405492517633261629/44da7561bfa9d2e829f2da4d5b4694d9.png?ex=689f0668&is=689db4e8&hm=b1278ba18b36eaaf6e9e86492d227d1aec6b211d3d328d8f1a51082fce075b3e&=&format=webp&quality=lossless&width=810&height=810", -- optional logo
		embeds = {
			{
				title = "📌 " .. tostring(title):sub(1, 256),
				description = description .. " • Logged automatically",
				color = color or 0x00AAFF, -- default rich blue
				timestamp = safeTimestamp,
				footer = {
					text = "Peleg Billing • Automated Log System",
					icon_url = "https://media.discordapp.net/attachments/1405125836914294824/1405492517633261629/44da7561bfa9d2e829f2da4d5b4694d9.png?ex=689f0668&is=689db4e8&hm=b1278ba18b36eaaf6e9e86492d227d1aec6b211d3d328d8f1a51082fce075b3e&=&format=webp&quality=lossless&width=810&height=810"
				},
				fields = f
			}
		}
	}
end

local Logs = {}

---@param action 'createBill'|'payBill'|'refundBill'|'setGradePerm'
---@param payload table
function Logs:send(action, payload)
	if not SVConfig or not SVConfig.LogsEnabled then return end
	local url = SVConfig.Webhooks and SVConfig.Webhooks[action]
	if not url or url == '' then return end

	postWebhook(url, payload)
end

---@param action 'createBill'|'payBill'|'refundBill'|'setGradePerm'
---@param actor table
---@param target table|nil
---@param data table
function Logs:sendBillEvent(action, actor, target, data)
	local fields = {}

	if target then
		fields['Target'] = ('%s (%s)%s'):format(
			target.name or 'unknown',
			target.cid or 'n/a',
			target.discord and (' | <@' .. target.discord .. '>') or ''
		)
	end

	fields['Actor'] = ('%s (%s)%s'):format(
		actor.name or 'unknown',
		actor.cid or 'n/a',
		actor.discord and (' | <@' .. actor.discord .. '>') or ''
	)

	for k, v in pairs(data or {}) do
		fields[tostring(k)] = tostring(v)
	end

	local colors = {
		createBill  = 0x3498DB, -- blue
		payBill     = 0x2ECC71, -- green
		refundBill  = 0xF1C40F, -- yellow
		setGradePerm= 0xE74C3C  -- red
	}

	local payload = embed('Billing: ' .. action, 'Automated log', colors[action] or 0x00AAFF, fields)
	self:send(action, payload)
end

return {
	postWebhook = postWebhook,
	getDiscordId = getDiscordId,
	identity = identity,
	embed = embed,
	Logs = Logs,
}
