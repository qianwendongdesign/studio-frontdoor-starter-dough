import { useRef, useEffect } from 'react'

export function useDragToScroll() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let isDown = false
    let startX = 0
    let scrollStart = 0

    const onDown = (e: MouseEvent) => {
      isDown = true
      startX = e.pageX
      scrollStart = el.scrollLeft
      el.style.userSelect = 'none'
    }
    const onMove = (e: MouseEvent) => {
      if (!isDown) return
      e.preventDefault()
      const dx = e.pageX - startX
      el.scrollLeft = scrollStart - dx
    }
    const onUp = () => {
      isDown = false
      el.style.userSelect = ''
    }

    const onWheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) return // native horizontal scroll
      if (el.scrollWidth <= el.clientWidth) return // not scrollable
      e.preventDefault()
      el.scrollLeft += e.deltaY
    }

    el.addEventListener('mousedown', onDown)
    el.addEventListener('wheel', onWheel, { passive: false })
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => {
      el.removeEventListener('mousedown', onDown)
      el.removeEventListener('wheel', onWheel)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseup', onUp)
    }
  }, [])

  return ref
}
