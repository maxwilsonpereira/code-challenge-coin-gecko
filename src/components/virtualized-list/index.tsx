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

let totalRowsFetched = 0

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTicker[]>([])
  const [localDataCount, setLocalDataCount] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState<boolean>()
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [loadNextPage, setLoadNextPage] = useState(false)
  const [showErrorModal, setShowErrorModal] = useState<JSX.Element>()
  const [hideTableHeaderFix, setHideTableHeaderFix] = useState(true)
  const [usingLocalData, setUsingLocalData] = useState<boolean>(false)
  let fetchRetries = 0

  useEffect(() => {
    if (loadNextPage) setPage((prev) => prev + 1)
  }, [loadNextPage])

  useEffect(() => {
    if (page === 0) {
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
    console.log('fetchRetries: ', fetchRetries)

    if (showErrorModal != undefined) return
    setLoading(true)
    let fetchAgainOnError = false

    try {
      let res: any
      if (usingLocalData) res = await getDataLocal(page.toString(), fetchRetries % 2 == 0 ? 'ethereum' : 'bitcoin')
      else res = await getData(page.toString(), fetchRetries % 2 == 0 ? 'ethereum' : 'bitcoin')
      console.log('Total rows res: ', res)

      if (res.status === 200) {
        setLoading(false)
        if (res.data.tickers.length === 0) {
          fetchAgainOnError = true
          if (fetchRetries < 4) {
            fetchRetries++
            if (page > 0) await delayHandler(fetchRetries * 3000)
            fetchData()
          } else throw 'API error. Corrupted response.'
        }

        if (fetchAgainOnError) return

        totalRowsFetched = totalRowsFetched + res.data.tickers.length
        console.log('Total rows fetched: ', totalRowsFetched)
        if (data.length < 550 + localDataCount) setData((prev) => prev.concat(res.data.tickers))
        else {
          const dataUpdated = data
            .slice(0, localDataCount)
            .concat(data.slice(100 + localDataCount, data.length).concat(res.data.tickers))

          setData(dataUpdated)
          window.scrollBy(0, -6200)
        }
        if (page === 0) setFirstLoad(false)
      }
    } catch {
      if (firstLoad && fetchRetries > 0) setUsingLocalData(true)
      if (fetchRetries < 4) {
        fetchRetries++
        if (page > 1) await delayHandler(fetchRetries * 4000)
        fetchData()
      } else {
        fetchRetries = 0
        setShowErrorModal(
          <ErrorModalComponent
            fetchData={fetchData}
            setShowErrorModal={setShowErrorModal}
            setUsingLocalData={setUsingLocalData}
            setLoading={setLoading}
          />
        )
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
          loading={loading}
          setLocalDataCount={setLocalDataCount}
        />
        {localDataCount > 0 && (
          <ButtonColor
            title="DELETE ALL"
            type="delete"
            localDataCount={localDataCount}
            setLocalDataCount={setLocalDataCount}
            loading={loading}
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
          {!loading && totalRowsFetched < 550 && (
            <OnScrollTrigger positionY={-3000} setStateHandler={setLoadNextPage} />
          )}

          {!loading && <OnScrollTrigger positionY={0} setStateHandler={setLoadNextPage} />}
        </div>
      </div>
    </div>
  )
}

export default VirtualizedList
