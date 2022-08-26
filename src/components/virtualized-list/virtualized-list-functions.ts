import { ICoinTicker } from '../../interfaces/coingecko'
import { IFetchDataHandlerProps } from '../../interfaces/data-interfaces'
import { getDataLocal, getData } from '../../services/coinGecko/coingecko'
import { delayHandler } from '../../utils/delay-handler'
import { isICoinTicker } from '../../utils/interfaces-check'

export function localStorageHandler(
  setLocalDataCount: React.Dispatch<React.SetStateAction<number>>,
  setData: React.Dispatch<React.SetStateAction<ICoinTicker[]>>
) {
  const local = localStorage.getItem('localStorageRows')
  if (local) {
    const localData = JSON.parse(local)
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
}

let fetchRetries = 0

export async function fetchDataHandler({ ...props }: IFetchDataHandlerProps) {
  const {
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
    setTotalRowsFetched,
  } = props
  setLoading(true)
  let fetchAgainOnError = false
  try {
    let res: any
    if (usingLocalData) res = await getDataLocal(page, page % 2 === 0 ? 'ethereum' : 'bitcoin')
    else res = await getData(page, fetchRetries % 2 === 0 ? 'ethereum' : 'bitcoin')
    if (res.status === 200) {
      if (res.data.tickers.length === 0) {
        fetchAgainOnError = true
        if (fetchRetries < 4) {
          fetchRetries++
          console.log('Fetch retry:', fetchRetries)
          if (page > 0) await delayHandler(fetchRetries * 3000)
          fetchDataHandler({ ...props })
        } else {
          throw { code: 403, message: 'myMessage' }
        }
      }

      if (fetchAgainOnError) return

      setTotalRowsFetched((prev) => {
        console.log('Total rows fetched: ', prev + res.data.tickers.length)
        return prev + res.data.tickers.length
      })

      if (data.length <= 550 + localDataCount) {
        setData((prev) => prev.concat(res.data.tickers))
        setLoading(false)
      } else {
        setScrollToElement(true)
        setData(
          data.slice(0, localDataCount).concat(data.slice(100 + localDataCount, data.length).concat(res.data.tickers))
        )
      }
      if (page === 0) setFirstLoad(false)
      fetchRetries = 0
    }
  } catch {
    if (firstLoad && fetchRetries > 0) setUsingLocalData(true)
    if (fetchRetries < 4) {
      fetchRetries++
      console.log('Fetch retry:', fetchRetries)
      if (page > 1) await delayHandler(fetchRetries * 4000)
      fetchDataHandler({ ...props })
    } else {
      fetchRetries = 0
      setShowErrorModal(true)
    }
  }
}
