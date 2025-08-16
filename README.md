

# Peleg-Billing

An advanced billing system for FiveM servers, built for **QBCore** and **ESX**.
Easily issue, pay, and manage bills with a clean and modern interface.

---

## 📦 Installation

1. **Add the tablet item to your inventory system**

   * **OX Inventory**: Follow the [OX Inventory item creation guide](https://overextended.dev/ox_inventory)
   * **QBCore Inventory**: Follow the [QBCore shared items guide](https://docs.qbcore.org/).

   **OX Inventory** — in `ox_inventory/data/items.lua`:

   ```lua
   ['billing_tablet'] = {
       label = 'Billing Tablet',
       weight = 1000,
       stack = false,
       close = true,
       description = 'Used to issue and manage bills',
       client = {
		    event = 'peleg-billing:client:invOpen'
    	}
   }
   ```

   **QBCore Inventory** — in `qb-core/shared/items.lua`:

   ```lua
   ['billing_tablet'] = {
       name = 'billing_tablet',
       label = 'Billing Tablet',
       weight = 1000,
       type = 'item',
       image = 'billing_tablet.png',
       unique = true,
       useable = true,
       shouldClose = true,
       description = 'Used to issue and manage bills'
   }
   ```

2. **Configure allowed jobs** in `config.lua`

3. **Set server logging & webhooks** in `sv_config.lua`

4. Incase needed go to server/boss.lua and modify the code to work with your bossmenu! (if you need any help [open a ticket in our discord server](https://discord.gg/9AuTeZPgrX))

5. Restart your server and you’re ready to go.

---

## ⚙ Configuration

### `config.lua`

```lua
---@class BillingConfig
Config = Config or {}

Config.TabletItem = 'billing_tablet' -- Item name in your inventory
Config.TabletJobs = { 'police', 'ambulance', 'mechanic' } -- Jobs that can use the tablet
Config.DefaultWallpaper = 'web/assets/assets.png' -- Default tablet background
Config.NearbyRadius = 5.0 -- Distance to search for nearby players
Config.UseBankAsDefault = true -- Use bank balance for payments by default

--- Default locale for UI and notifications. Supported: 'en', 'he'.
Config.Locale = 'en'

--- When true, opening the tablet jumps directly into the Billing app instead of the home screen.
Config.DisableHomeScreen = false

--- Adds a simple tax to each created bill. When enabled, the final stored amount is increased by this percentage.
--- Example: rate 10 means amount = floor(amount * 1.10)
Config.TaxEnabled = false
Config.TaxRate = 10
```

---

### `sv_config.lua`

```lua
---@class BillingServerConfig
SVConfig = SVConfig or {}

SVConfig.LogsEnabled = true

SVConfig.Webhooks = {
    createBill = '',
    payBill = '',
    refundBill = '',
    setGradePerm = ''
}
```

---

## 🛠 Features

* Clean, responsive UI
* Job-restricted access
* Nearby player detection
* Optional tax system
* Webhook logging for:

  * Bill creation
  * Payments
  * Refunds
  * Permission changes

---

## 📋 Usage

* Equip the **billing\_tablet** in your inventory
* Open the interface
* Create or manage bills for nearby players

---

## 🔗 Support

* **Discord:** [Join Here](https://discord.gg/9AuTeZPgrX)

---
