import { ICoinTickers } from '../interfaces/coingecko'
import classes from '../table-header/styles.module.scss'

interface ITableRows extends ICoinTickers {
  index: number
  ref?: HTMLDivElement
}

export const TableRows = ({ ...props }: ITableRows) => {
  const { index, coin_id, base, volume, target, market } = props

  return (
    <>
      <div className={[classes.tableCell, index % 2 ? classes.rowColor1 : classes.rowColor2].join(' ')}>
        <div className={classes.ellipsisText} style={{ color: 'green' }}>
          {coin_id}
        </div>
      </div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth1, index % 2 ? classes.rowColor1 : classes.rowColor2].join(' ')}>
        <div className={classes.ellipsisText}>{base}</div>
      </div>
      <div className={[classes.tableCell, index % 2 ? classes.rowColor1 : classes.rowColor2].join(' ')}>
        <div className={classes.ellipsisText}>{volume}</div>
      </div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth2, index % 2 ? classes.rowColor1 : classes.rowColor2].join(' ')}>
        <div className={classes.ellipsisText}>{target}</div>
      </div>
      <div className={[classes.tableCell, classes.tableCellFlex, index % 2 ? classes.rowColor1 : classes.rowColor2].join(' ')}>
        <img src={market.logo} alt={`${market.name}-image`} className={classes.image} />
        <div className={classes.ellipsisText}>{market.name}</div>
      </div>
    </>
  )
}
export default TableRows
