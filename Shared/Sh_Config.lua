Config = {}

Config.BillingItem = "billing_tablet" -- Define the item here  leave empty for no item
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
