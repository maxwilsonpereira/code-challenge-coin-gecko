export interface ICoinTickers {
  coin_id: string
  base: string
  volume: string
  target: string
  market: { name: string; logo: string }
  trade_url: string
}
