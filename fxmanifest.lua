fx_version 'cerulean'
game 'gta5'

name 'peleg-billing'
author 'peleg'
description 'Billing tablet with ESX/QBCore'
version '1.4.0'

lua54 'yes'

shared_scripts {
	'@ox_lib/init.lua',
	'shared/config.lua',
	'shared/sv_config.lua'
}

client_scripts {
	'client/client.lua'
}

server_scripts {
	'@oxmysql/lib/MySQL.lua',
	'server/logs.lua',
	'server/server.lua',
	'server/boss.lua'
}

ui_page 'web/dist/index.html'

files {
	'web/dist/index.html',
	'web/dist/assets/*.*',
	'web/assets/*.png',
	'locale/*.json'
}


dependency 'ox_lib'
