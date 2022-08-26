import axios from 'axios'
import { delayHandler } from '../../utils/delay-handler'
import { isICoinTicker } from '../../utils/interfaces-check'
import { mockResponseBitcoin, mockResponseEthereum } from './mockResponse'

const url = 'https://api.coingecko.com/api/v3/coins'

export async function getData(page: string, coinId: string) {
  if (parseInt(page) === 0) await delayHandler(1500)
  const res = await axios.get(`${url}/${coinId}/tickers`, { params: { include_exchange_logo: 'true', page: page } })
  res.data.tickers.forEach((cur: any) => {
    if (!isICoinTicker(cur)) {
      throw { code: 403, message: 'myMessage' }
    }
  })
  return res
}

export async function getDataLocal(coinId: string) {
  console.log('getDataLocal')
  if (coinId === 'bitcoin') return mockResponseBitcoin
  else return mockResponseEthereum
}
