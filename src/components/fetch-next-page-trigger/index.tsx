import { useEffect, useRef } from 'react'
import useIntersectionObserver from '../../utils/use-intersection-observer'

const FetchNextPageTrigger = ({
  positionY,
  setLoadNextPage,
}: {
  positionY: number
  setLoadNextPage: React.Dispatch<React.SetStateAction<boolean>>
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const entry = useIntersectionObserver(ref, {})
  const isVisible = entry?.isIntersecting

  useEffect(() => {
    if (isVisible !== undefined) setLoadNextPage(isVisible)
  }, [isVisible])

  return <span style={{ transform: `translateY(${positionY}px)` }} ref={ref} />
}

export default FetchNextPageTrigger
