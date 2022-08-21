export const corruptedMockResponse = {
  status: 200,
  data: {
    name: 'Bitcoin',
    tickers: [
      {
        coin_id: 'bitcoin',
        base: 'BTC',
        volume: 285037.6663233262,
        target: 'USDT',
        market: {
          name: 'Binance',
          logo: 'https://assets.coingecko.com/markets/images/52/small/binance.jpg?1519353250',
        },
        trade_url: 'https://www.binance.com/en/trade/BTC_USDT?ref=37754157',
      },
      {
        base: 'ETH',
        target: 'BTC',
      },
      {
        base: 'BTC',
        target: 'USD',
        market: {
          name: 'Currency.com',
          identifier: 'currency',
          has_trading_incentive: false,
          logo: 'https://assets.coingecko.com/markets/images/512/small/Currency.com_200x200.png?1582086630',
        },
        volume: 9472.55813332,
        trade_url: 'https://exchange.currency.com/btc-to-usd',
        coin_id: 'bitcoin',
      },
      {
        base: 'BTC',
        target: 'USDT',
        market: {
          name: 'Digifinex',
          identifier: 'digifinex',
          has_trading_incentive: false,
          logo: 'https://assets.coingecko.com/markets/images/225/small/DF_logo.png?1594264355',
        },
        last: 21110.27,
        volume: 34455.84605747,
        trade_url: 'https://www.digifinex.com/en-ww/trade/USDT/BTC',
        token_info_url: null,
        coin_id: 'bitcoin',
      },
      {
        base: 'BTC',
        volume: 9196,
        coin_id: 'bitcoin',
      },
    ],
  },
}
