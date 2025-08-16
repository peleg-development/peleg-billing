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
