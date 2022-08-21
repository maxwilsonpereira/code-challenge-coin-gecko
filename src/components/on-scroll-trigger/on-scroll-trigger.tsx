import { useEffect, useRef } from 'react'
import useIntersectionObserver from '../../utils/use-intersection-observer'

const OnScrollTrigger = ({
  positionY,
  element,
  setStateHandler,
}: {
  positionY: number
  element?: string
  setStateHandler: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry?.isIntersecting

  useEffect(() => {
    if (isVisible !== undefined) setStateHandler(isVisible)
  }, [isVisible])

  if (element && element === 'div') return <div style={{ transform: `translateY(${positionY}px)` }} ref={ref} />

  return <span style={{ transform: `translateY(${positionY}px)` }} ref={ref} />
}

export default OnScrollTrigger
