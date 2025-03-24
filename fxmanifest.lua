fx_version 'cerulean'
game 'gta5'

author 'Peleg / (discord: peleg_3)'
description 'billing system for QBCore/ESX'
version '1.0.0'

client_scripts {
    'Client/Client.lua'
}

server_scripts {
    'Server/Server.lua',
    'Shared/Sv_Config.lua',
    '@oxmysql/lib/MySQL.lua'
}

shared_scripts {
    'Shared/Sh_Config.lua',
    "Locales/Locales.lua",
}

ui_page 'Nui/build/index.html'

files {
    'Nui/build/index.html',
    'Nui/build/assets/*.js',
    'Nui/build/assets/*.css',
    'Nui/build/assets/*.woff',
    'Nui/build/assets/*.woff2'
}