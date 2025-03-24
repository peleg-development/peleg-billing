Config = {}
-- _______  ______ _______ _______ _______ _  _  _  _____   ______ _     _
-- |______ |_____/ |_____| |  |  | |______ |  |  | |     | |_____/ |____/ 
-- |       |    \_ |     | |  |  | |______ |__|__| |_____| |    \_ |    \_

Config.Framework = "QB" -- Options: "QB" or "ESX"
Config.BillingItem = "" -- Define the item here; leave empty for no item
Config.BillCommand = "bills" -- Define the command to open the billing menu

-- __   _  _____  _______ _____ _______ __   __
-- | \  | |     |    |      |   |______   \_/  
-- |  \_| |_____|    |    __|__ |          |   

Config.Notify = "qb" -- Options: "esx", "qb", "okokNotify", "peleg-notify"

-- _______ _______ _     _ _____ __   _  ______
--    |    |_____|  \___/    |   | \  | |  ____
--    |    |     | _/   \_ __|__ |  \_| |_____|

Config.Tax = {
    Enabled = false, -- Enable or disable the tax system
    Percentage = 0, -- Set the tax percentage (e.g., 10%)
}

-- _____  _____  ______  _______
--   |   |     | |_____] |______
-- __|   |_____| |_____] ______|

Config.Jobs = {
    ['police'] = {
        ['1'] = { CanBill = true, BossAccess = true, InspectCitizen = true },
        ['2'] = { CanBill = true, BossAccess = true, InspectCitizen = true },
        ['3'] = { CanBill = true, BossAccess = true, InspectCitizen = true },
    },
    ['ambulance'] = {
        ['1'] = { CanBill = true, BossAccess = true, InspectCitizen = true },
        ['2'] = { CanBill = true, BossAccess = true, InspectCitizen = true },
        ['3'] = { CanBill = true, BossAccess = true, InspectCitizen = true },
    },
}

--         _____  _______ _______        _______
-- |      |     | |       |_____| |      |______
-- |_____ |_____| |_____  |     | |_____ |______

Config.Locale = "en" -- Default to English; available options: "en", "he", "fr", "it"

