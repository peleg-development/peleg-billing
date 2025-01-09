Config = {}

Config.Framework = "QB" -- QB or esx
Config.BillingItem = "" -- Define the item here  leave empty for no item
Config.BillCommand = "bill" -- Define the command to open the billing menu

Config.Jobs = {
    ['police'] = {
        ['1'] = {
            CanBill = true, -- can this grade bill players?
            BossAccess = false, -- can access the refund page?
            InspectCitizen = true, -- can this grade access this page?
        },
        ['2'] = {
            CanBill = true, -- can this grade bill players?
            BossAccess = false, -- can access the refund page?
            InspectCitizen = true, -- can this grade access this page?
        },
        ['3'] = {
            CanBill = true, -- can this grade bill players?
            BossAccess = false, -- can access the refund page?
            InspectCitizen = true, -- can this grade access this page?
        },
    },
    ['ambulance'] = {
        ['1'] = {
            CanBill = true, -- can this grade bill players?
            BossAccess = false, -- can access the refund page?
            InspectCitizen = true, -- can this grade access this page?
        },
        ['2'] = {
            CanBill = true, -- can this grade bill players?
            BossAccess = false, -- can access the refund page?
            InspectCitizen = true, -- can this grade access this page?
        },
        ['3'] = {
            CanBill = true, -- can this grade bill players?
            BossAccess = false, -- can access the refund page?
            InspectCitizen = true, -- can this grade access this page?
        },
    },
}

Config.Notify = "qb" -- Options: "esx", "qb", "okokNotify", "peleg-notify"
Config.Locale = "en" -- Default to English; you can set this to "en", "he", "fr", "it"