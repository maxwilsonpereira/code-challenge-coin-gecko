import { useEffect, useState } from 'react'
import { getData } from '../../services/coingecko'
import classes from './styles.module.scss'
import classesList from '../table-header/styles.module.scss'
import LoadingComponent from '../loading-component'
import TableHeader from '../table-header'
import TableHeaderFix from '../table-header-fix'
import TableRow from '../table-row/table-row'
import FetchNextPageTrigger from '../fetch-next-page-trigger'
import BackToTopIcon from '../back-to-top-icon'
import { TitleDescription } from '../title-description'
import { ICoinTickers } from '../interfaces/coingecko'
import { ErrorModalComponent } from '../error-modal'

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTickers[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState<boolean>()
  const [firstLoad, setFirstLoad] = useState<boolean>()
  const [loadNextPage, setLoadNextPage] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState<JSX.Element>()
  let fetchAttempts = 0

  useEffect(() => {
    if (loadNextPage) setPage((prev) => prev + 1)
  }, [loadNextPage])

  useEffect(() => {
    if (page === 1) setFirstLoad(true)
    fetchData()
  }, [page])

  const fetchData = async () => {
    setLoading(true)
    try {
      const res = await getData(page.toString())
      if (res.status === 200) {
        setData(data.concat(res.data.tickers))
        setLoading(false)
        if (page === 1) setFirstLoad(false)
      }
    } catch {
      if (fetchAttempts < 5) {
        fetchAttempts++
        setTimeout(() => {
          fetchData()
        }, 3000)
      } else {
        setShowErrorModal(<ErrorModalComponent />)
      }
    }
  }

  if (firstLoad)
    return (
      <>
        {showErrorModal}
        <LoadingComponent />
      </>
    )

  return (
    <div className={classes.root}>
      {showErrorModal}
      <div className={classes.contentWrapper}>
        {loading && <LoadingComponent />}
        <TitleDescription />
        <TableHeaderFix />

        <div className={classesList.tableGrid}>
          <TableHeader />
          {data.map((cur, i) => (
            <TableRow key={i} {...cur} index={i} />
          ))}
          <FetchNextPageTrigger setLoadNextPage={setLoadNextPage} />
          <BackToTopIcon />
        </div>
      </div>
    </div>
  )
}

export default VirtualizedList
