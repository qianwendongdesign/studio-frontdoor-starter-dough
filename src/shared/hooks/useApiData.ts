/**
 * useApiData — generic hook for fetching data from the local API server.
 * Falls back to static placeholder data if the server isn't running.
 *
 * Usage:
 *   const stores = useApiData<Store[]>('/api/stores', FALLBACK_STORES, d => d.stores)
 */

import { useCallback, useEffect, useRef, useState } from 'react'

export function useApiData<T>(
  endpoint: string,
  fallback: T,
  extract: (json: unknown) => T | null = (d) => d as T,
): T {
  const [data, setData] = useState<T>(fallback)
  const extractRef = useRef(extract)
  extractRef.current = extract

  const stableExtract = useCallback((json: unknown) => extractRef.current(json), [])

  useEffect(() => {
    fetch(endpoint)
      .then((r) => {
        if (!r.ok) throw new Error(`API returned ${r.status}`)
        return r.json()
      })
      .then((json) => {
        const extracted = stableExtract(json)
        if (extracted != null) setData(extracted)
      })
      .catch(() => {
        console.info(`[useApiData] Server not running for ${endpoint}, using static data.`)
      })
  }, [endpoint, stableExtract])

  return data
}
