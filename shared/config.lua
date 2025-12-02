Config = {}

Config.TabletItem = 'billing_tablet'
Config.TabletJobs = { 'police', 'ambulance', 'mechanic', 'atoms', 'firefighter', 'realestate' }
Config.DefaultWallpaper = 'web/assets/wallpaper.png'
Config.NearbyRadius = 5.0
Config.UseBankAsDefault = true

--- Default locale for UI and notifications. Supported: 'en', 'he', 'fr', 'ru', 
Config.Locale = 'en'

--- When true, opening the tablet jumps directly into the Billing app instead of the home screen.
Config.DisableHomeScreen = true

-- Enable or disable permissions for the tablet.
Config.PermssionsDisabled = false -- when true refund and bill will require the boss to set permssions in game for each grade

--- Adds a simple tax to each created bill. When enabled, the final stored amount is increased by this percentage.
--- Example: rate 10 means amount = floor(amount * 1.10)
Config.TaxEnabled = true
Config.TaxRate = 10

--- Auto pay configuration - automatically pays bills after a specified time
Config.AutoPayEnabled = true
Config.AutoPayTime = 72 -- hours until auto pay

--- Billing cut configuration - gives issuer a percentage of paid bills
Config.BillingCutEnabled = true
Config.BillingCutPercentage = 5 -- percentage cut for issuer (0-100)

Config.PresetBills =  {
    police = {
        ['Assaults and Murders'] = {
            {amount = 40000, description = 'First Degree Murder'},
            {amount = 8000, description = 'Assault on a Government Official with a Weapon'},
        },
        ['Theft and Robbery'] = {
            {amount = 4000, description = 'Armed Robbery'},
            {amount = 1500, description = 'Grand Theft Auto'},
        },
        ['Traffic Violations'] = {
            {amount = 600, description = 'Driving Under Influence'},
        },
    },
    ambulance = {
        ['Procedures'] = {
            { amount = 1500, description = 'Surgery' },
            { amount = 120, description = 'X-Ray' },
        },
        ['Medical Supplies'] = {
            { amount = 220, description = 'Bandage' },
            { amount = 100, description = 'First Aid Kit' },
        },
        ['Police Medical Supplies'] = {
            { amount = 50, description = 'First Aid Kit (Police)' },
        },
    },
    firefighter = {
        ['Medical Aid'] = {
            { amount = 350, description = 'First Medical Aid' },
            { amount = 350, description = 'Emergency Case' },
        },
        ['Fire Incidents'] = {
            { amount = 650, description = 'Burn Victim Treatment' },
            { amount = 1230, description = 'Burnt Property Assessment' },
        },
        ['Police Medical Supplies'] = {
            { amount = 200, description = 'Police Medical Exam' },
        },
    },
}