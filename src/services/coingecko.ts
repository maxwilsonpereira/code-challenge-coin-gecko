import axios from 'axios'

const url = 'https://api.coingecko.com/api/v3/coins/bitcoin/tickers'

export async function getData(page: string) {
  return await axios.get(url, { params: { include_exchange_logo: 'true', page: page } })
}
