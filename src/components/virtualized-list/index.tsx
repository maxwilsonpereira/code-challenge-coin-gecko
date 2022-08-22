import { useEffect, useState } from 'react'
import { getData, getDataLocal } from '../../services/coinGecko/coingecko'
import classes from './styles.module.scss'
import classesList from '../table-header/styles.module.scss'
import LoadingComponent from '../loading-component'
import TableHeader from '../table-header'
import TableHeaderFix from '../table-header-fix'
import TableRow from '../table-row/table-row'
import OnScrollTrigger from '../on-scroll-trigger/on-scroll-trigger'
import BackToTopIcon from '../back-to-top-icon'
import ErrorModalComponent from '../error-modal'
import { TitleDescription } from '../title-description'
import { ICoinTicker } from '../../interfaces/coingecko'
import { isICoinTicker } from '../../utils/interfaces-check'
import ButtonColor from '../ui/button-color/button-color'
import IntroPage from '../intro-page'
import { delayHandler } from '../../utils/delay-handler'

let usingLocalData = false
let totalRowsFetched = 0

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTicker[]>([])
  const [localDataCount, setLocalDataCount] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState<boolean>()
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [loadNextPage, setLoadNextPage] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState<JSX.Element>()
  const [hideTableHeaderFix, setHideTableHeaderFix] = useState(true)
  let fetchAttempts = 0

  useEffect(() => {
    if (loadNextPage) setPage((prev) => prev + 1)
  }, [loadNextPage])

  useEffect(() => {
    if (page === 1) {
      const localData = JSON.parse(localStorage.getItem('localStorageRows')!)
      if (localData) {
        let localStorageIsCorrupted = false
        localData.forEach((cur: ICoinTicker) => {
          if (localStorageIsCorrupted) return
          if (!isICoinTicker(cur)) localStorageIsCorrupted = true
        })
        if (!localStorageIsCorrupted) {
          setLocalDataCount(localData.length)
          setData(localData)
        }
      }
    }
    fetchData()
  }, [page])

  const fetchData = async () => {
    if (showErrorModal != undefined) return
    setLoading(true)
    let fetchAgainOnError = false

    try {
      let res: any
      if (usingLocalData) res = await getDataLocal(page.toString(), fetchAttempts % 2 == 0 ? 'ethereum' : 'bitcoin')
      else res = await getData(page.toString(), fetchAttempts % 2 == 0 ? 'ethereum' : 'bitcoin')
      if (res.status === 200) {
        setLoading(false)
        if (res.data.tickers.length === 0) {
          fetchAgainOnError = true
          if (fetchAttempts < 5) {
            fetchAttempts++
            if (page > 1) await delayHandler(fetchAttempts * 3000)
            fetchData()
          } else throw 'API error. Corrupted response.'
        }

        if (fetchAgainOnError) return

        totalRowsFetched = totalRowsFetched + res.data.tickers.length
        console.log('Total rows fetched: ', totalRowsFetched)
        if (data.length < 350 + localDataCount) setData((prev) => prev.concat(res.data.tickers))
        else {
          setData(
            data.slice(0, localDataCount).concat(data.slice(100 + localDataCount, data.length).concat(res.data.tickers))
          )
          window.scrollBy(0, -6200)
        }
        if (page === 1) setFirstLoad(false)
      }
    } catch {
      if (firstLoad && fetchAttempts > 0) usingLocalData = true
      if (fetchAttempts < 5) {
        fetchAttempts++
        if (page > 1) await delayHandler(fetchAttempts * 3000)
        fetchData()
      } else {
        setShowErrorModal(<ErrorModalComponent fetchData={fetchData} setShowErrorModal={setShowErrorModal} />)
      }
    }
  }

  if (firstLoad)
    return (
      <>
        {showErrorModal}
        <IntroPage />
        <LoadingComponent fade={true} />
      </>
    )

  return (
    <div id="virtualized-list-root" className={classes.root}>
      {showErrorModal}
      <div className={classes.contentWrapper}>
        {loading && <LoadingComponent />}
        <TitleDescription usingLocalData={usingLocalData} />
        <ButtonColor
          title="ADD ROW"
          type="add"
          setData={setData}
          localDataCount={localDataCount}
          setLocalDataCount={setLocalDataCount}
        />
        {localDataCount > 0 && (
          <ButtonColor
            title="DELETE ALL"
            type="delete"
            localDataCount={localDataCount}
            setLocalDataCount={setLocalDataCount}
            setData={setData}
          />
        )}

        <OnScrollTrigger positionY={-36} element="div" setStateHandler={setHideTableHeaderFix} />
        <div className={classesList.tableGrid}>
          <>{!hideTableHeaderFix && <TableHeaderFix />}</>
          <TableHeader />
          {data.map((cur, i) => (
            <TableRow key={i} {...cur} index={i} />
          ))}
          <BackToTopIcon />
          {totalRowsFetched < 350 && <OnScrollTrigger positionY={-3000} setStateHandler={setLoadNextPage} />}

          <OnScrollTrigger positionY={0} setStateHandler={setLoadNextPage} />
        </div>
      </div>
    </div>
  )
}

export default VirtualizedList
