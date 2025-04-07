print("^2Peleg^7-^2Billing ^7v^41^7.^40^7.^40 ^7- ^2Billing Script by ^1Peleg^7")
Config = {}
-- _______  ______ _______ _______ _______ _  _  _  _____   ______ _     _
-- |______ |_____/ |_____| |  |  | |______ |  |  | |     | |_____/ |____/ 
-- |       |    \_ |     | |  |  | |______ |__|__| |_____| |    \_ |    \_

Config.Debug = false -- Enable or disable debug mode
Config.Framework = "QB" -- Options: "QB" or "ESX"
Config.BillingItem = "" -- Define the item here; leave empty for no item requirement
Config.BillCommand = "bills" -- Define the command to open the billing menu
Config.BillPlayerCommand = "billplayer" -- Command to open the quick billing UI

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

-- _______ __   _ _____ _______ _______ _______ _____ _______ __   _
-- |_____| | \  |   |   |  |  | |_____|    |      |   |  |  | | \  |
-- |     | |  \_| __|__ |  |  | |     |    |    __|__ |  |  | |  \_|

Config.AnimationConfig = {
    Enabled = true, -- Enable or disable the notepad animation when billing players
    Dict = "missheistdockssetup1clipboard@base", -- Animation dictionary
    Anim = "base", -- Animation name
    Prop = "prop_notepad_01", -- Prop model
    PropBone = 18905, -- Bone to attach the prop to
    PropPlacement = {0.1, 0.02, 0.05, 10.0, 0.0, 0.0}, -- Prop placement coordinates
    Duration = 2500, -- Duration of the animation in ms
}

-- _____  _____  ______  _______
--   |   |     | |_____] |______
-- __|   |_____| |_____] ______|

Config.Jobs = {
    ['police'] = {
        ['1'] = { CanBill = true, BossAccess = true, InspectCitizen = true, CancelBill = true, RefundBill = true },
        ['2'] = { CanBill = true, BossAccess = true, InspectCitizen = true, CancelBill = true, RefundBill = true },
        ['3'] = { CanBill = true, BossAccess = true, InspectCitizen = true, CancelBill = true, RefundBill = true },
    },
    ['ambulance'] = {
        ['1'] = { CanBill = true, BossAccess = true, InspectCitizen = true, CancelBill = true, RefundBill = true },
        ['2'] = { CanBill = true, BossAccess = true, InspectCitizen = true, CancelBill = true, RefundBill = true },
        ['3'] = { CanBill = true, BossAccess = true, InspectCitizen = true, CancelBill = true, RefundBill = true },
    },
}

--         _____  _______ _______        _______
-- |      |     | |       |_____| |      |______
-- |_____ |_____| |_____  |     | |_____ |______

Config.Locale = "en" -- Default to English; available options: "en", "he", "fr", "it"

