import { Dispatch, SetStateAction, useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { isNuiEnv, nuiFetch } from '../utils/nui'

interface SettingsAppProps {
  onBackToHome: () => void
}

interface BaseSettingsItem {
  icon: string
  title: string
  subtitle: string
}

interface ToggleSettingsItem extends BaseSettingsItem {
  type: 'toggle'
  value: boolean
  onChange: Dispatch<SetStateAction<boolean>>
}

interface InputSettingsItem extends BaseSettingsItem {
  type: 'input'
  value: string
  placeholder: string
  onChange: Dispatch<SetStateAction<string>>
  action: () => void
}

interface LinkSettingsItem extends BaseSettingsItem {
  type: 'link'
}

interface InfoSettingsItem extends BaseSettingsItem {
  type: 'info'
}

type SettingsItem = ToggleSettingsItem | InputSettingsItem | LinkSettingsItem | InfoSettingsItem

interface SettingsSection {
  title: string
  items: SettingsItem[]
}

const SettingsApp = ({ onBackToHome }: SettingsAppProps) => {
  const [wallpaperUrl, setWallpaperUrl] = useState('')
  const [notifications, setNotifications] = useState(true)
  const [darkMode, setDarkMode] = useState(true)
  const [autoLock, setAutoLock] = useState(false)
  const [soundEnabled, setSoundEnabled] = useState(true)
  const [vibration, setVibration] = useState(false)

  const handleWallpaperChange = async () => {
    if (!wallpaperUrl.trim()) return
    if (isNuiEnv()) {
      await nuiFetch('peleg-billing:setWallpaper', { url: wallpaperUrl })
      window.postMessage({ type: 'tablet:updateWallpaper', url: wallpaperUrl }, '*')
    }
    setWallpaperUrl('')
  }

  useEffect(() => {
    if (!isNuiEnv()) return
    ;(async () => {
      const self = await nuiFetch<any>('peleg-billing:getSelf')
      if (self?.wallpaper) {
        setWallpaperUrl('')
      }
    })()
  }, [])

  const loc: Record<string, string> = (window as any).__locale || {}
  const settingsSections: SettingsSection[] = [
    {
      title: loc.display_brightness || 'Display & Brightness',
      items: [
        {
          icon: 'image',
          title: loc.wallpaper || 'Wallpaper',
          subtitle: loc.wallpaper_sub || 'Change tablet wallpaper',
          type: 'input',
          value: wallpaperUrl,
          onChange: setWallpaperUrl,
          placeholder: loc.enter_image_url || 'Enter image URL...',
          action: handleWallpaperChange
        },
        {
          icon: 'moon',
          title: loc.dark_mode || 'Dark Mode',
          subtitle: loc.dark_mode_sub || 'Use dark appearance',
          type: 'toggle',
          value: darkMode,
          onChange: setDarkMode
        }
      ]
    },
    {
      title: loc.notifications_section || 'Notifications',
      items: [
        {
          icon: 'bell',
          title: loc.notifications_title || 'Notifications',
          subtitle: loc.notifications_sub || 'Enable push notifications',
          type: 'toggle',
          value: notifications,
          onChange: setNotifications
        },
        {
          icon: 'volume-up',
          title: loc.sound_title || 'Sound',
          subtitle: loc.sound_sub || 'Play notification sounds',
          type: 'toggle',
          value: soundEnabled,
          onChange: setSoundEnabled
        },
        {
          icon: 'mobile-alt',
          title: loc.vibration_title || 'Vibration',
          subtitle: loc.vibration_sub || 'Vibrate on notifications',
          type: 'toggle',
          value: vibration,
          onChange: setVibration
        }
      ]
    },
    {
      title: loc.security_section || 'Security',
      items: [
        {
          icon: 'lock',
          title: loc.auto_lock_title || 'Auto-Lock',
          subtitle: loc.auto_lock_sub || 'Lock tablet automatically',
          type: 'toggle',
          value: autoLock,
          onChange: setAutoLock
        },
        {
          icon: 'shield-alt',
          title: loc.privacy_title || 'Privacy',
          subtitle: loc.privacy_sub || 'Manage privacy settings',
          type: 'link'
        }
      ]
    },
    {
      title: loc.about_section || 'About',
      items: [
        {
          icon: 'info-circle',
          title: loc.tablet_info_title || 'Tablet Info',
          subtitle: loc.tablet_info_sub || 'Version 1.0.0',
          type: 'info'
        },
        {
          icon: 'cog',
          title: loc.system_settings_title || 'System Settings',
          subtitle: loc.system_settings_sub || 'Advanced configuration',
          type: 'link'
        }
      ]
    }
  ]

  return (
    <div className="h-full bg-gray-900 text-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToHome}
            className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700 transition-colors"
          >
            <FontAwesomeIcon icon="chevron-left" className="text-sm" />
          </button>
          <div>
            <h1 className="text-lg font-semibold">{loc.settings_title || 'Settings'}</h1>
            <p className="text-xs text-gray-400">{loc.settings_subtitle || 'Configure your tablet'}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon="search" className="text-gray-400" />
          <FontAwesomeIcon icon="ellipsis-h" className="text-gray-400" />
        </div>
      </div>

      {/* Settings Content */}
      <div className="flex-1 overflow-y-auto h-full app-scrollbar pb-8">
        <div className="p-5 space-y-6 pb-16">
          {settingsSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-2">
              <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wide px-2">
                {section.title}
              </h3>
              <div className="bg-gray-800 rounded-xl overflow-hidden">
                {section.items.map((item, itemIndex) => (
                  <div
                    key={itemIndex}
                    className={`flex items-center justify-between p-4 ${
                      itemIndex !== section.items.length - 1 ? 'border-b border-gray-700' : ''
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                        <FontAwesomeIcon icon={item.icon as any} className="text-white text-sm" />
                      </div>
                      <div>
                        <h4 className="font-medium text-white">{item.title}</h4>
                        <p className="text-xs text-gray-400">{item.subtitle}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      {item.type === 'toggle' && (
                        <button
                          onClick={() => item.onChange(!item.value)}
                          className={`w-12 h-6 rounded-full transition-colors ${
                            item.value ? 'bg-blue-600' : 'bg-gray-600'
                          }`}
                        >
                          <div className={`w-4 h-4 bg-white rounded-full transition-transform ${
                            item.value ? 'translate-x-6' : 'translate-x-1'
                          }`} />
                        </button>
                      )}
                      
                      {item.type === 'input' && (
                        <div className="flex items-center gap-2">
                          <input
                            type="text"
                            value={item.value}
                            onChange={(e) => item.onChange(e.target.value)}
                            placeholder={item.placeholder}
                            className="w-48 bg-gray-700 border border-gray-600 rounded-lg px-3 py-1 text-white text-sm placeholder-gray-400 focus:outline-none focus:border-blue-500"
                          />
                          <button
                            onClick={item.action}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm transition-colors"
                          >
                            {loc.apply || 'Apply'}
                          </button>
                        </div>
                      )}
                      
                      {item.type === 'link' && (
                        <FontAwesomeIcon icon="chevron-right" className="text-gray-400 text-sm" />
                      )}
                      
                      {item.type === 'info' && (
                        <span className="text-gray-400 text-sm">{item.subtitle}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SettingsApp
