/**
 * useStores — fetches fresh store data from the local Snowflake API server
 * on every page load. Falls back to static placeholder data if the server
 * isn't running (e.g. during static demos or GitHub Pages deployment).
 *
 * To enable live data:
 *   source backend/venv/bin/activate
 *   python3 scripts/serve_stores.py
 */

import { useApiData } from './useApiData'
import { STORES as FALLBACK } from '@shared/data/storeData'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function useStores(): any[] {
  return useApiData(
    '/api/stores',
    FALLBACK,
    (json: unknown) => {
      const data = json as { stores?: unknown[] }
      return Array.isArray(data.stores) && data.stores.length > 0
        ? data.stores
        : null
    },
  )
}
