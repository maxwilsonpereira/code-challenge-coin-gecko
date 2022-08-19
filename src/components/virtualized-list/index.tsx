import { useEffect, useState, useRef, Fragment } from 'react'
import { getData } from '../../services/coingecko'
import classes from '../table-heathers/styles.module.scss'
import LoadingComponent from '../loading-component'
import TableHeathers from '../table-heathers/table-heathers'
import TableRows from '../table-rows/table-rows'
import useIntersectionObserver from '../utils/useIntersectionObserver'
import { ICoinTickers } from '../interfaces/coingecko'

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTickers[]>([])
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState('')
  const [loadMore, setLoadMore] = useState(false)
  const [loading, setLoading] = useState<boolean>()

  useEffect(() => {
    if (loadMore) setPage((prev) => prev + 1)
  }, [loadMore])

  useEffect(() => {
    fetchData()
  }, [page])

  const fetchData = async () => {
    setLoading(true)
    const res = await getData(page.toString())
    console.log('RES: ', res)
    if (res.status === 200) {
      setData(data.concat(res.data.tickers))
    } else {
      setMessage('API not working at the moment. Please try again later.')
    }
    setLoading(false)
  }

  const FetchTriggerElement = (props: any) => {
    const ref = useRef<HTMLDivElement | null>(null)
    const entry = useIntersectionObserver(ref, {})
    const isVisible = entry?.isIntersecting

    useEffect(() => {
      if (isVisible !== undefined) setLoadMore(isVisible)
    }, [isVisible])

    return (
      <div ref={ref}>
        <TableRows {...props} />
      </div>
    )
  }

  return (
    <div>
      {loading && <LoadingComponent />}
      <h1 style={{ marginBottom: 30 }}>Virtualized List</h1>
      <div className={classes.tableGrid}>
        <TableHeathers />
        {data.map((cur, i) => (
          <Fragment key={i}>{data.length === i + 10 ? <FetchTriggerElement {...cur} /> : <TableRows {...cur} />}</Fragment>
        ))}
      </div>
    </div>
  )
}
export default VirtualizedList
