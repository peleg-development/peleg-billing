Config = {}

Config.TabletItem = 'billing_tablet'
Config.TabletJobs = { 'police', 'ambulance', 'mechanic' }
Config.DefaultWallpaper = 'web/assets/wallpaper.png'
Config.NearbyRadius = 5.0
Config.UseBankAsDefault = true

--- Default locale for UI and notifications. Supported: 'en', 'he', 'fr', 'ru', 
Config.Locale = 'en'

--- When true, opening the tablet jumps directly into the Billing app instead of the home screen.
Config.DisableHomeScreen = false

--- Adds a simple tax to each created bill. When enabled, the final stored amount is increased by this percentage.
--- Example: rate 10 means amount = floor(amount * 1.10)
Config.TaxEnabled = false
Config.TaxRate = 10

--- Auto pay configuration - automatically pays bills after a specified time
Config.AutoPayEnabled = true
Config.AutoPayTime = 72 -- hours until auto pay

--- Billing cut configuration - gives issuer a percentage of paid bills
Config.BillingCutEnabled = true
Config.BillingCutPercentage = 10 -- percentage cut for issuer (0-100)
