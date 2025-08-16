import { useEffect, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Apps from './Apps.tsx'
import SettingsApp from './SettingsApp.tsx'
import BillingApp from './BillingApp'
import { isNuiEnv, nuiFetch } from '../utils/nui'

type AppType = 'home' | 'settings' | 'billing'


interface TabletProps {
  /**
   * Optional data passed from client when opening, used to speed up initial UI state.
   */
  initialSelf?: { cid: string, job: string, grade: number, name: string, wallpaper?: string, boss?: boolean }
  /**
   * Runtime locale dictionary injected from server; used to localize UI at runtime.
   */
  locale?: Record<string, string>
  /**
   * When true, skip home screen and open billing immediately.
   */
  forceBilling?: boolean
}

const Tablet = ({ initialSelf, locale, forceBilling }: TabletProps) => {
  const [currentApp, setCurrentApp] = useState<AppType>(forceBilling ? 'billing' : 'home')
  const [currentTime, setCurrentTime] = useState<string>(formatTime(new Date()))
  const [showQuickSettings, setShowQuickSettings] = useState<boolean>(false)
  const [isDoNotDisturb, setIsDoNotDisturb] = useState<boolean>(false)
  const [brightness, setBrightness] = useState<number>(100)
  const [volume, setVolume] = useState<number>(60)
  const [batteryLevel] = useState<number>(82)
  const [hasNotification] = useState<boolean>(true)
  const [transitionStage, setTransitionStage] = useState<'idle' | 'out' | 'in'>('idle')
  const [wallpaper, setWallpaper] = useState<string | null>(null)
  const DEFAULT_WALLPAPER = '../assets/assets.png'

  function t(key: string, fallback: string): string {
    if (locale && typeof (locale as any)[key] === 'string' && (locale as any)[key]) return (locale as any)[key] as string
    return fallback
  }

  function normalizeWallpaperPath(path: string | null | undefined): string {
    if (!path) return DEFAULT_WALLPAPER
    const p = String(path)
    if (/^https?:\/\//i.test(p)) return p
    if (p.startsWith('web/')) return '../' + p.slice(4)
    if (p.startsWith('/assets/')) return '..' + p
    if (p.startsWith('wallpaper/')) return '../' + p
    if (p.startsWith('../assets/')) return p
    return DEFAULT_WALLPAPER
  }

  function formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0')
    const minutes = date.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
  }

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(formatTime(new Date()))
    }, 15000)
    return () => clearInterval(intervalId)
  }, [])

  useEffect(() => {
    if (initialSelf?.wallpaper) {
      setWallpaper(normalizeWallpaperPath(initialSelf.wallpaper))
    } else if (isNuiEnv()) {
      ;(async () => {
        try {
          const self = await nuiFetch<any>('peleg-billing:getSelf')
          if (self?.wallpaper) setWallpaper(normalizeWallpaperPath(self.wallpaper))
        } catch {}
      })()
    }
    const onMsg = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'tablet:updateWallpaper') {
        setWallpaper(normalizeWallpaperPath(String(e.data.url || '')))
      }
    }
    window.addEventListener('message', onMsg)
    return () => window.removeEventListener('message', onMsg)
  }, [initialSelf])

  /**
   * Smoothly transitions between apps using a fade/scale animation.
   */
  const switchApp = (appType: AppType) => {
    if (currentApp === appType) return
    setTransitionStage('out')
    setTimeout(() => {
      setCurrentApp(appType)
      setTransitionStage('in')
      setTimeout(() => setTransitionStage('idle'), 220)
    }, 180)
  }

  const handleAppClick = (appType: AppType) => {
    switchApp(appType)
  }

  const handleBackToHome = () => {
    if (forceBilling) return
    switchApp('home')
  }

  const isSettings = currentApp === 'settings'
  const isBilling = currentApp === 'billing'

  return (
    <div
      className="w-[1400px] h-[900px] rounded-[3rem] shadow-2xl border-8 border-gray-800 relative overflow-hidden tablet-glow"
      style={{ backgroundImage: `url(${wallpaper || DEFAULT_WALLPAPER})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
    >
      <div className={`relative z-10 h-14 flex items-center px-6 border-b border-white/10  text-white ${
        isSettings ? 'bg-gray-900/95' : isBilling ? 'bg-gray-900/95' : 'bg-black/40'
      }`}>
        <div className="flex-1 flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="signal" className="text-white/80" />
            <span className="text-xs font-medium">5G</span>
            <FontAwesomeIcon icon="wifi" className="text-white/80" />
          </div>
        </div>
        <div className="flex-1 flex justify-center items-center">
          <div className="bg-black/30 rounded-full px-4 py-1">
            <span className="text-sm font-semibold tracking-wide">{currentTime}</span>
          </div>
        </div>
        <div className="flex-1 flex justify-end items-center gap-3 text-sm">
          <button
            type="button"
            aria-label="Notifications"
            className="relative p-1 rounded-md hover:bg-white/10 transition"
            title="Notifications"
          >
            <FontAwesomeIcon icon="bell" className="text-white/80" />
            {hasNotification && (
              <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full"></span>
            )}
          </button>
          {isDoNotDisturb && (
            <FontAwesomeIcon icon="moon" className="text-white/80" title="Do Not Disturb" />
          )}
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon="battery-full" className="text-white/80" />
            <span className="text-xs font-medium">{batteryLevel}%</span>
          </div>
          <button
            type="button"
            onClick={() => setShowQuickSettings(v => !v)}
            aria-label="Quick settings"
            title="Quick settings"
             className="p-1 rounded-md hover:bg-white/10 transition"
          >
            <FontAwesomeIcon icon="ellipsis-h" className="text-white/80" />
          </button>
        </div>
      </div>

      <div className={`relative z-10 h-[calc(100%-56px+1px)] p-0 overflow-hidden transition-all duration-300 ${
        transitionStage === 'out' ? 'opacity-0 scale-[0.98] blur-[1px]' : transitionStage === 'in' ? 'opacity-100 scale-100 blur-0' : ''
      }`}>
        {currentApp === 'home' ? (
          <div className="w-full h-full">
            <div className="px-6 pt-4">
              <div className="flex items-center gap-3 bg-black/30  border border-white/10 rounded-2xl px-4 py-2 text-white">
                <FontAwesomeIcon icon="search" className="text-white/70" />
                <input
                  type="text"
                  placeholder={t('search', 'Search')}
                  className="bg-transparent outline-none placeholder-white/60 text-sm w-full"
                  aria-label="Search"
                />
              </div>
            </div>
            <div className="w-full h-[calc(100%-56px)]">
              <Apps onAppClick={handleAppClick} />
            </div>
          </div>
        ) : currentApp === 'settings' ? (
          <SettingsApp onBackToHome={handleBackToHome} />
        ) : currentApp === 'billing' ? (
          <BillingApp onBackToHome={handleBackToHome} initialSelf={initialSelf as any} />
        ) : null}
      </div>

      {showQuickSettings && (
        <div className="absolute top-16 right-4 w-80 rounded-2xl bg-black/60 border border-white/10 shadow-2xl z-[60] p-4 text-white">
          <div className="flex items-center justify-between mb-3">
            <div className="text-sm font-semibold">{t('control_center', 'Control Center')}</div>
            <div className="text-xs text-white/70">{currentTime}</div>
          </div>
          <div className="grid grid-cols-3 gap-2">
            <button
              type="button"
              className={`rounded-xl px-3 py-3 border ${isDoNotDisturb ? 'bg-white/20 border-white/20' : 'bg-white/10 border-white/10'} transition`}
              onClick={() => setIsDoNotDisturb(v => !v)}
              aria-pressed={isDoNotDisturb}
            >
              <div className="flex flex-col items-center gap-1">
                <FontAwesomeIcon icon="moon" />
                <span className="text-[11px]">{t('dnd', 'DND')}</span>
              </div>
            </button>
            <div className="rounded-xl px-3 py-3 border bg-white/10 border-white/10">
              <div className="flex flex-col items-center gap-1">
                <FontAwesomeIcon icon="wifi" />
                <span className="text-[11px]">{t('wifi', 'Wi‑Fi')}</span>
              </div>
            </div>
            <div className="rounded-xl px-3 py-3 border bg-white/10 border-white/10">
              <div className="flex flex-col items-center gap-1">
                <FontAwesomeIcon icon="mobile-alt" />
                <span className="text-[11px]">{t('cellular', 'Cellular')}</span>
              </div>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs mb-2">{t('brightness', 'Brightness')}</div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon="bolt" className="text-white/70" />
              <input
                type="range"
                min={10}
                max={100}
                value={brightness}
                onChange={e => setBrightness(parseInt(e.target.value))}
                className="w-full accent-white/80"
                aria-label="Brightness"
              />
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs mb-2">{t('volume', 'Volume')}</div>
            <div className="flex items-center gap-3">
              <FontAwesomeIcon icon="volume-up" className="text-white/70" />
              <input
                type="range"
                min={0}
                max={100}
                value={volume}
                onChange={e => setVolume(parseInt(e.target.value))}
                className="w-full accent-white/80"
                aria-label="Volume"
              />
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <button
              type="button"
              className="rounded-xl px-3 py-2 border bg-white/10 border-white/10 hover:bg-white/20 transition"
              onClick={handleBackToHome}
            >
              <div className="flex items-center justify-center gap-2 text-sm">
                <FontAwesomeIcon icon="lock" />
                <span>{t('lock', 'Lock')}</span>
              </div>
            </button>
            <button
              type="button"
              className="rounded-xl px-3 py-2 border bg-white/10 border-white/10 hover:bg-white/20 transition"
              onClick={() => setShowQuickSettings(false)}
            >
              <div className="flex items-center justify-center gap-2 text-sm">
                <FontAwesomeIcon icon="info-circle" />
                <span>{t('close_btn', 'Close')}</span>
              </div>
            </button>
          </div>
        </div>
      )}

      {currentApp === 'home' && (
        <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/20 to-transparent z-40"></div>
      )}
      
        {currentApp !== 'home' && !forceBilling && (
        <button
          onClick={handleBackToHome}
          className="absolute bottom-4 left-1/2 -translate-x-1/2 w-32 h-1.5 rounded-full bg-white/60 hover:bg-white/80 transition-colors  border border-white/30 z-50 shadow-lg"
          aria-label="Home"
          title="Home"
        />
      )}

      {currentApp === 'home' && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-50">
          <div className="px-5 py-2 rounded-3xl bg-black/30  border border-white/10 shadow-xl">
            <div className="flex items-center gap-6 text-white">
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-white/10 transition"
                aria-label={t('phone', 'Phone')}
                title={t('phone', 'Phone')}
              >
                <img src="../assets/phone.png" alt="Phone" className="w-8 h-8 rounded-lg object-cover" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-white/10 transition"
                aria-label={t('billing', 'Billing')}
                title={t('billing', 'Billing')}
                onClick={() => handleAppClick('billing')}
              >
                <img src="../assets/bills.png" alt="Billing" className="w-8 h-8 rounded-lg object-cover" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-white/10 transition"
                aria-label={t('settings', 'Settings')}
                title={t('settings', 'Settings')}
                onClick={() => handleAppClick('settings')}
              >
                <img src="../assets/settings.png" alt="Settings" className="w-8 h-8 rounded-lg object-cover" />
              </button>
              <button
                type="button"
                className="p-2 rounded-xl hover:bg-white/10 transition"
                aria-label={t('camera', 'Camera')}
                title={t('camera', 'Camera')}
              >
                <img src="../assets/camera.png" alt="Camera" className="w-8 h-8 rounded-lg object-cover" />
              </button>
            </div>
          </div>
        </div>
      )}      
      
      <div className="absolute left-0 top-20 w-1 h-16 bg-gray-700 rounded-r-sm"></div>
      <div className="absolute left-0 top-40 w-1 h-8 bg-gray-700 rounded-r-sm"></div>
      <div className="absolute right-0 top-32 w-1 h-12 bg-gray-700 rounded-l-sm"></div>
    </div>
  )
}

export default Tablet