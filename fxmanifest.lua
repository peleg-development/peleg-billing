fx_version 'cerulean'

game 'gta5'

author 'Peleg' -- peleg_3
description "An advacned billing script for FiveM"
version "1.2.6"

lua54 'yes'
use_fxv2_oal 'yes'

shared_scripts {
    'shared/config.lua',
    'bridge/bridge.lua',
    'locales/locales.lua',
}

client_scripts {
    'client/client.lua'
}

server_scripts {
    '@oxmysql/lib/MySQL.lua',
    'server/server.lua'
}

ui_page 'nui/build/index.html'

files {
    'nui/build/index.html',
    'nui/build/assets/*.js',
    'nui/build/assets/*.css',
    'nui/build/assets/*.woff',
    'nui/build/assets/*.woff2'
}
