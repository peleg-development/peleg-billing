import Tablet from './components/Tablet'
import Bills from './components/Bills'
import { useEffect, useState } from 'react'
import { isNuiEnv, nuiFetch } from './utils/nui'

function App() {
  const [visible, setVisible] = useState(!isNuiEnv())
  const [self, setSelf] = useState<any | null>(null)
  const [locale, setLocale] = useState<Record<string, string>>((window as any).__locale || {})
  const [showBills, setShowBills] = useState(false)
  useEffect(() => {
    const handleMessage = (e: MessageEvent) => {
      if (!e.data || typeof e.data !== 'object') return
      if (e.data.type === 'openTablet') {
        setVisible(true)
        if (e.data.self) setSelf(e.data.self)
        if (e.data.self && e.data.self.locale) {
          setLocale(e.data.self.locale)
          ;(window as any).__locale = e.data.self.locale
        }
        if (e.data.self && e.data.self.disableHome) {
          ;(window as any).__forceBilling = true
        }
      }
      if (e.data.type === 'tablet:locale') {
        if (e.data.data) {
          setLocale(e.data.data)
          ;(window as any).__locale = e.data.data
        }
        if (e.data.self) setSelf(e.data.self)
        if (e.data.disableHome) {
          setVisible(true)
          ;(window as any).__forceBilling = true
        }
      }
      if (e.data.type === 'closeTablet') {
        setVisible(false)
      }
      if (e.data.type === 'openBills') {
        setShowBills(true)
      }
      if (e.data.type === 'closeBills') {
        setShowBills(false)
      }
    }
    window.addEventListener('message', handleMessage)
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isNuiEnv()) {
        nuiFetch('peleg-billing:close').catch(() => {})
      }
    }
    window.addEventListener('keydown', handleKey)
    return () => {
      window.removeEventListener('message', handleMessage)
      window.removeEventListener('keydown', handleKey)
    }
  }, [])
  return (
    <div className="w-full h-screen flex justify-center items-center">
      {visible && <Tablet initialSelf={self || undefined} locale={locale} forceBilling={Boolean((window as any).__forceBilling)} />}
      {showBills && <Bills />}
    </div>
  )
}

export default App