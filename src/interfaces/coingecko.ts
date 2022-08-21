export interface ICoinTicker {
  coin_id: string | null | undefined
  base: string | null | undefined
  volume: number | null | undefined
  target: string | null | undefined
  market: { name: string | null | undefined; logo?: string | null | undefined }
  trade_url: string | null | undefined
}
