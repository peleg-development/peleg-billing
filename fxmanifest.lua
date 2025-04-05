fx_version 'cerulean'

shared_script "@SecureServe/src/module/module.lua"
shared_script "@SecureServe/src/module/module.js"
file "@SecureServe/secureserve.key"

game 'gta5'

author 'PelegMC'
name "peleg-billing"
description "A simple billing script for FiveM"
version "1.0.0"

lua54 'yes'
use_fxv2_oal 'yes'

shared_scripts {
    'bridge/bridge.lua',
    'shared/config.lua',
    'locales/locales.lua',
}

client_scripts {
    'client/Client.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'Server/Server.lua'
}

ui_page 'nui/build/index.html'

files {
    'nui/build/index.html',
    'nui/build/assets/*.js',
    'nui/build/assets/*.css',
    'nui/build/assets/*.woff',
    'nui/build/assets/*.woff2'
}