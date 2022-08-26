import { useEffect, useLayoutEffect, useState } from 'react'
import classes from './styles.module.scss'
import classesList from '../table-header/styles.module.scss'
import LoadingComponent from '../loading-component'
import TableHeader from '../table-header'
import TableRow from '../table-row/table-row'
import OnScrollTrigger from '../on-scroll-trigger/on-scroll-trigger'
import BackToTopIcon from '../back-to-top-icon'
import ErrorModalComponent from '../error-modal'
import { TitleDescription } from '../title-description'
import { ICoinTicker } from '../../interfaces/coingecko'
import ButtonColor from '../ui/button-color/button-color'
import IntroPage from '../intro-page'
import { fetchDataHandler, localStorageHandler } from './virtualized-list-functions'

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTicker[]>([])
  const [localDataCount, setLocalDataCount] = useState(0)
  const [page, setPage] = useState(0)
  const [loading, setLoading] = useState<boolean>()
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [scrollToElement, setScrollToElement] = useState(false)
  const [usingLocalData, setUsingLocalData] = useState<boolean>(false)

  useEffect(() => {
    localStorageHandler(setLocalDataCount, setData)
  }, [])

  useEffect(() => {
    if (page > 0) fetchData()
  }, [page])

  useEffect(() => {
    if (usingLocalData) fetchData()
  }, [usingLocalData])

  useLayoutEffect(() => {
    if (scrollToElement) {
      window.scrollBy(0, -7200)
      setLoading(false)
    }
  }, [data])

  const fetchData = async () => {
    fetchDataHandler({
      data,
      setData,
      localDataCount,
      page,
      setLoading,
      firstLoad,
      setFirstLoad,
      setShowErrorModal,
      setScrollToElement,
      usingLocalData,
      setUsingLocalData,
    })
  }

  if (firstLoad)
    return (
      <>
        <IntroPage setFirstLoad={setFirstLoad} fetchData={fetchData} />
        {showErrorModal && (
          <ErrorModalComponent
            fetchData={fetchData}
            setShowErrorModal={setShowErrorModal}
            setUsingLocalData={setUsingLocalData}
          />
        )}
      </>
    )

  return (
    <div id="virtualized-list-root" className={classes.root}>
      {showErrorModal && (
        <ErrorModalComponent
          fetchData={fetchData}
          setShowErrorModal={setShowErrorModal}
          setUsingLocalData={setUsingLocalData}
        />
      )}
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
        <div className={classesList.tableGrid}>
          <TableHeader />
          {data.map((cur, i) => (
            <TableRow key={i} {...cur} index={i} />
          ))}
          <BackToTopIcon />
          <OnScrollTrigger positionY={-6000} setPage={setPage} />
          {!loading && !showErrorModal && <OnScrollTrigger positionY={0} setPage={setPage} />}
        </div>
      </div>
    </div>
  )
}

export default VirtualizedList
