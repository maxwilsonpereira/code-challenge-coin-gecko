import { ICoinTicker } from './coingecko'

export interface IFetchDataHandlerProps {
  data: ICoinTicker[]
  setData: React.Dispatch<React.SetStateAction<ICoinTicker[]>>
  localDataCount: number
  page: number
  setLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>
  firstLoad: boolean
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>
  setScrollToElement: React.Dispatch<React.SetStateAction<boolean>>
  usingLocalData: boolean
  setUsingLocalData: React.Dispatch<React.SetStateAction<boolean>>
  setTotalRowsFetched: React.Dispatch<React.SetStateAction<number>>
}
