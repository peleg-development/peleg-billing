
export const isNuiEnv = (): boolean => {
  return typeof (window as any).GetParentResourceName === 'function'
}

export async function nuiFetch<T = unknown>(eventName: string, data?: Record<string, unknown>): Promise<T> {
  const debug = (() => {
    try { return localStorage.getItem('pelegBilling:nuiDebug') === '1' } catch { return false }
  })()
  if (!isNuiEnv()) {
    if (debug) console.debug('[NUI] skip (not nui env):', eventName, data)
    return Promise.resolve(undefined as unknown as T)
  }
  const resource = (window as any).GetParentResourceName()
  const url = `https://${resource}/${eventName}`
  const startedAt = performance.now()
  try {
    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(data ?? {})
    })
    const dt = Math.round(performance.now() - startedAt)
    if (!resp.ok) {
      if (debug) console.debug('[NUI] http error:', eventName, resp.status, dt + 'ms')
      return undefined as unknown as T
    }
    try {
      const json = (await resp.json()) as T
      if (debug) console.debug('[NUI] ok:', eventName, dt + 'ms', json)
      return json
    } catch (e) {
      if (debug) console.debug('[NUI] json parse failed:', eventName, dt + 'ms', e)
      return undefined as unknown as T
    }
  } catch (e) {
    const dt = Math.round(performance.now() - startedAt)
    if (debug) console.debug('[NUI] fetch failed:', eventName, dt + 'ms', e)
    return undefined as unknown as T
  }
}

/**
 * Formats a CID string to 8 characters, adding ellipsis if longer
 * @param cid The CID string to format
 * @returns Formatted CID string
 */
export function formatCid(cid: string): string {
    if (!cid || cid.length <= 8) return cid;
    return cid.substring(0, 5) + '...';
}


