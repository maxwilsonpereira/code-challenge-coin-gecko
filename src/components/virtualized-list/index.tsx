import { useEffect, useState } from 'react'
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
import ButtonColor from '../ui/button-color/button-color'
import IntroPage from '../intro-page'
import { fetchDataHandler, localStorageHandler } from './virtualized-list-functions'

export const VirtualizedList = () => {
  const [data, setData] = useState<ICoinTicker[]>([])
  const [localDataCount, setLocalDataCount] = useState(0)
  const [page, setPage] = useState(0)
  const [totalRowsFetched, setTotalRowsFetched] = useState(0)
  const [loading, setLoading] = useState<boolean>()
  const [firstLoad, setFirstLoad] = useState<boolean>(true)
  const [showErrorModal, setShowErrorModal] = useState<boolean>(false)
  const [hideTableHeaderFix, setHideTableHeaderFix] = useState<boolean>()
  const [usingLocalData, setUsingLocalData] = useState<boolean>(false)

  useEffect(() => {
    if (page === 0) localStorageHandler(setLocalDataCount, setData)
    fetchData()
  }, [page])

  const fetchData = async () => {
    fetchDataHandler(
      data,
      setData,
      localDataCount,
      page,
      totalRowsFetched,
      setTotalRowsFetched,
      setLoading,
      firstLoad,
      setFirstLoad,
      showErrorModal,
      setShowErrorModal,
      usingLocalData,
      setUsingLocalData
    )
  }

  if (firstLoad)
    return (
      <>
        {showErrorModal && (
          <ErrorModalComponent
            fetchData={fetchData}
            setShowErrorModal={setShowErrorModal}
            setUsingLocalData={setUsingLocalData}
            setLoading={setLoading}
          />
        )}
        <IntroPage />
        <LoadingComponent fade={true} />
      </>
    )

  return (
    <div id="virtualized-list-root" className={classes.root}>
      {showErrorModal && (
        <ErrorModalComponent
          fetchData={fetchData}
          setShowErrorModal={setShowErrorModal}
          setUsingLocalData={setUsingLocalData}
          setLoading={setLoading}
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
        <OnScrollTrigger positionY={-35} element="div" setHideTableHeaderFix={setHideTableHeaderFix} />
        <div className={classesList.tableGrid}>
          <>{!hideTableHeaderFix && <TableHeaderFix />}</>
          <TableHeader />
          {data.map((cur, i) => (
            <TableRow key={i} {...cur} index={i} />
          ))}
          <BackToTopIcon />
          {!loading && totalRowsFetched < 550 && !showErrorModal && (
            <OnScrollTrigger positionY={-3000} setPage={setPage} />
          )}

          {!loading && !showErrorModal && <OnScrollTrigger positionY={0} setPage={setPage} />}
        </div>
      </div>
    </div>
  )
}

export default VirtualizedList
