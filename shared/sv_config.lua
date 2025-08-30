---@class BillingServerConfig
---@field LogsEnabled boolean
---@field Webhooks table<string, string>
SVConfig = SVConfig or {}

SVConfig.LogsEnabled = true

SVConfig.Webhooks = {
	createBill = 'https://discord.com/api/webhooks/1409940404874252309/Y2lHEaYGXvgzjzfC8zNC-bADoib8P46iTBKVrBlyBtf0D0zU0tVmRgaPowTgbRbpp7z7',
	payBill = 'https://discord.com/api/webhooks/1409940404874252309/Y2lHEaYGXvgzjzfC8zNC-bADoib8P46iTBKVrBlyBtf0D0zU0tVmRgaPowTgbRbpp7z7',
	refundBill = 'https://discord.com/api/webhooks/1409940404874252309/Y2lHEaYGXvgzjzfC8zNC-bADoib8P46iTBKVrBlyBtf0D0zU0tVmRgaPowTgbRbpp7z7',
	setGradePerm = 'https://discord.com/api/webhooks/1409940404874252309/Y2lHEaYGXvgzjzfC8zNC-bADoib8P46iTBKVrBlyBtf0D0zU0tVmRgaPowTgbRbpp7z7'
}


