import { ICoinTicker } from '../interfaces/coingecko'

export function isICoinTicker(obj: any): obj is ICoinTicker {
  if (typeof obj === 'object' && obj !== null) {
    return (
      'coin_id' in obj && 'base' in obj && 'volume' in obj && 'target' in obj && 'market' in obj && 'name' in obj.market
    )
  } else return false
}
