import axios from 'axios'
import { delayHandler } from '../../utils/delay-handler'
import { isICoinTicker } from '../../utils/interfaces-check'
import {
  mockResponseBitcoin,
  mockResponseEthereum,
  // emptyResponse
} from './mockResponse'

const url = 'https://api.coingecko.com/api/v3/coins'
// exchanges: /exchanges/{id}/tickers

export async function getData(page: string, coinId: string) {
  if (parseInt(page) === 1) await delayHandler(3000)
  const res = await axios.get(`${url}/${coinId}/tickers`, { params: { include_exchange_logo: 'true', page: page } })
  res.data.tickers.forEach((cur: any) => {
    if (!isICoinTicker(cur)) throw 'corrupted response'
  })
  return res
}

export async function getDataLocal(page: string, coinId: string) {
  // await delayHandler(parseInt(page) === 1 ? 3000 : 500)
  if (coinId === 'bitcoin') return mockResponseBitcoin
  else return mockResponseEthereum
}
