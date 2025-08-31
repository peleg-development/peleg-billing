---@class BillingServerConfig
---@field LogsEnabled boolean
---@field Webhooks table<string, string>
SVConfig = SVConfig or {}

SVConfig.LogsEnabled = true

SVConfig.Webhooks = {
	createBill = '',
	payBill = '',
	refundBill = '',
	setGradePerm = ''
}


