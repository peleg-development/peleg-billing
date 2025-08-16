import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useEffect, useState } from 'react'
import { nuiFetch } from '../utils/nui'

interface AppsProps {
  onAppClick: (appType: 'home' | 'settings' | 'billing') => void
}

interface TabletApp {
  id: string
  name: string
  image: string
  type: 'internal' | 'export'
}

const Apps = ({ onAppClick }: AppsProps) => {
  const [apps, setApps] = useState<TabletApp[]>([])

  useEffect(() => {
    const load = async () => {
      const list = await nuiFetch<TabletApp[] | undefined>('tablet:getApps')
      if (!Array.isArray(list)) return
      setApps(list)
    }
    load()
  }, [])

  return (
    <div className="w-full h-full overflow-y-auto app-scrollbar">
      <div className="grid grid-cols-6 gap-x-5 gap-y-4 pt-4 px-4 justify-items-center pb-4">
        {(() => { const t = (k: string, f: string) => { const L: any = (window as any).__locale || {}; return typeof L[k] === 'string' && L[k] ? L[k] : f };
        return (
          <>
        {/* Phone App */}
        <div className="flex flex-col items-center">
          <button
            onClick={async () => { await nuiFetch('tablet:launch', { id: 'phone' }) }}
            className="group w-24 h-24 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
            aria-label={t('phone', 'Phone')}
          >
            <img 
              src="../assets/phone.png" 
              alt={t('phone', 'Phone')} 
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110" 
            />
          </button>
          <div className="mt-2 px-2 py-0.5 rounded-md bg-black/30  text-white text-[12px] font-semibold leading-tight drop-shadow">
            {t('phone', 'Phone')}
          </div>
        </div>
        {/* Billing App */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onAppClick('billing')}
            className="group w-24 h-24 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-120 cursor-pointer overflow-hidden"
            aria-label={t('billing', 'Billing')}
          >
            <img 
              src="../assets/bills.png" 
              alt={t('billing', 'Billing')} 
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110" 
            />
          </button>
          <div className="mt-2 px-2 py-0.5 rounded-md bg-black/30  text-white text-[12px] font-semibold leading-tight drop-shadow">
            {t('billing', 'Billing')}
          </div>
        </div>

        {/* Settings App */}
        <div className="flex flex-col items-center">
          <button
            onClick={() => onAppClick('settings')}
            className="group w-24 h-24 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
            aria-label={t('settings', 'Settings')}
          >
            <img 
              src="../assets/settings.png" 
              alt={t('settings', 'Settings')} 
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110" 
            />
          </button>
          <div className="mt-2 px-2 py-0.5 rounded-md bg-black/30  text-white text-[12px] font-semibold leading-tight drop-shadow">
            {t('settings', 'Settings')}
          </div>
        </div>

        {/* Camera App */}
        <div className="flex flex-col items-center">
          <button
            onClick={async () => { await nuiFetch('tablet:launch', { id: 'camera' }) }}
            className="group w-24 h-24 rounded-2xl transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer overflow-hidden"
            aria-label={t('camera', 'Camera')}
          >
            <img 
              src="../assets/camera.png" 
              alt={t('camera', 'Camera')} 
              className="w-full h-full object-cover transition-transform duration-200 group-hover:scale-110" 
            />
          </button>
          <div className="mt-2 px-2 py-0.5 rounded-md bg-black/30  text-white text-[12px] font-semibold leading-tight drop-shadow">
            {t('camera', 'Camera')}
          </div>
        </div>

        {/* Server Apps */}
        {apps.map((app) => (
          <div key={app.id} className="flex flex-col items-center">
            <button
              onClick={async () => {
                await nuiFetch('tablet:launch', { id: app.id })
              }}
              className="group w-24 h-24 rounded-2xl bg-black/40  border border-white/10 shadow-md transition-all duration-200 hover:scale-105 active:scale-95 hover:shadow-lg cursor-pointer overflow-hidden"
              aria-label={app.name}
            >
              {app.image ? (
                <img src={`nui://peleg-billing/${app.image}`} alt={app.name} className="w-full h-full object-cover" />
              ) : (
                <div className="flex items-center justify-center h-full text-white">
                  <FontAwesomeIcon 
                    icon={'user-secret' as any} 
                    className="text-3xl transition-transform duration-200 group-hover:scale-110" 
                  />
                </div>
              )}
            </button>
            <div className="mt-2 px-2 py-0.5 rounded-md bg-black/30  text-white text-[12px] font-semibold leading-tight drop-shadow">
              {app.name}
            </div>
          </div>
        ))}
          </>
        )})()}
      </div>
    </div>
  )
}

export default Apps