import { useEffect, useRef } from 'react'
import useIntersectionObserver from '../../utils/use-intersection-observer'

const OnScrollTrigger = ({
  positionY,
  element,
  setPage,
  setHideTableHeaderFix,
}: {
  positionY: number
  element?: string
  setPage?: React.Dispatch<React.SetStateAction<number>>
  setHideTableHeaderFix?: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry?.isIntersecting

  useEffect(() => {
    if (isVisible) {
      if (setPage) setPage((prev) => prev + 1)
      if (setHideTableHeaderFix && isVisible !== undefined) setHideTableHeaderFix(isVisible)
    }
  }, [isVisible])

  if (element && element === 'div') return <div style={{ transform: `translateY(${positionY}px)` }} ref={ref} />

  return <span style={{ transform: `translateY(${positionY}px)` }} ref={ref} />
}

export default OnScrollTrigger
