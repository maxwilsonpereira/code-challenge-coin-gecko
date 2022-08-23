import { ICoinTicker } from '../../interfaces/coingecko'
import { getDataLocal, getData } from '../../services/coinGecko/coingecko'
import { delayHandler } from '../../utils/delay-handler'
import { isICoinTicker } from '../../utils/interfaces-check'

export function localStorageHandler(
  setLocalDataCount: React.Dispatch<React.SetStateAction<number>>,
  setData: React.Dispatch<React.SetStateAction<ICoinTicker[]>>
) {
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

let fetchRetries = 0

export async function fetchDataHandler(
  data: ICoinTicker[],
  setData: React.Dispatch<React.SetStateAction<ICoinTicker[]>>,
  localDataCount: number,
  page: number,
  totalRowsFetched: number,
  setTotalRowsFetched: React.Dispatch<React.SetStateAction<number>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>,
  firstLoad: boolean,
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>,
  showErrorModal: boolean,
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>,
  usingLocalData: boolean,
  setUsingLocalData: React.Dispatch<React.SetStateAction<boolean>>
) {
  setLoading(true)
  let fetchAgainOnError = false

  try {
    let res: any
    if (usingLocalData) res = await getDataLocal(page.toString(), fetchRetries % 2 === 0 ? 'ethereum' : 'bitcoin')
    else res = await getData(page.toString(), fetchRetries % 2 === 0 ? 'ethereum' : 'bitcoin')
    if (res.status === 200) {
      setLoading(false)
      if (res.data.tickers.length === 0) {
        fetchAgainOnError = true
        if (fetchRetries < 4) {
          fetchRetries++
          console.log('Fetch retry ', fetchRetries)
          if (page > 0) await delayHandler(fetchRetries * 3000)
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
        } else {
          const error = { code: 403, message: 'myMessage' }
          throw error
        }
      }

      if (fetchAgainOnError) return

      setTotalRowsFetched((prev) => {
        console.log('Total rows fetched: ', prev + res.data.tickers.length)
        return prev + res.data.tickers.length
      })
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
      console.log('Fetch retry ', fetchRetries)
      if (page > 1) await delayHandler(fetchRetries * 4000)
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
    } else {
      fetchRetries = 0
      setShowErrorModal(true)
    }
  }
}
