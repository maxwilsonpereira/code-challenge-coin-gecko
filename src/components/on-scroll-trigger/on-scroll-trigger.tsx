import { useEffect, useRef } from 'react'
import useIntersectionObserver from '../../utils/use-intersection-observer'

const OnScrollTrigger = ({
  positionY,
  setPage,
}: {
  positionY: number
  setPage: React.Dispatch<React.SetStateAction<number>>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry?.isIntersecting

  useEffect(() => {
    if (isVisible) setPage((prev) => prev + 1)
  }, [isVisible])

  return <span style={{ transform: `translateY(${positionY}px)` }} ref={ref} />
}

export default OnScrollTrigger
