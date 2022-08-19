import { useEffect, useState, Fragment } from 'react'
import { getData } from '../../services/coingecko'
import classes from './styles.module.scss'
import classesList from '../table-header/styles.module.scss'
import LoadingComponent from '../loading-component'
import TableHeader from '../table-header'
import TableHeaderFix from '../table-header-fix'
import TableRows from '../table-rows/table-rows'
import { ICoinTickers } from '../interfaces/coingecko'
import FetchNextPageTrigger from '../fetch-next-page-trigger'
import BackToTopIcon from '../back-to-top-icon'

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTickers[]>([])
  const [page, setPage] = useState(1)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState<boolean>()
  const [firstLoad, setFirstLoad] = useState<boolean>()
  const [loadNextPage, setLoadNextPage] = useState(false)

  useEffect(() => {
    if (loadNextPage) setPage((prev) => prev + 1)
  }, [loadNextPage])

  useEffect(() => {
    if (page > 1) return
    if (page === 1) setFirstLoad(true)
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
    if (page === 1) setFirstLoad(false)
    setLoading(false)
  }

  if (firstLoad) return <LoadingComponent />

  return (
    <div className={classes.root}>
      <div className={classes.contentWrapper}>
        {loading && <LoadingComponent />}
        <h1 style={{ marginTop: 0, marginBottom: 30 }}>Virtualized List</h1>
        <TableHeaderFix />

        <div className={classesList.tableGrid}>
          <TableHeader />
          {data.map((cur, i) => (
            <Fragment key={i}>
              <TableRows {...cur} index={i} />
            </Fragment>
          ))}
          <FetchNextPageTrigger setLoadNextPage={setLoadNextPage} />
          <BackToTopIcon />
        </div>
      </div>
    </div>
  )
}
export default VirtualizedList
