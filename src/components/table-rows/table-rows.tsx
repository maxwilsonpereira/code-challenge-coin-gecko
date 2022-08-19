import { ICoinTickers } from '../interfaces/coingecko'
import classes from '../table-heathers/styles.module.scss'

export const TableRows = ({ ...props }: ICoinTickers) => {
  return (
    <>
      <div className={classes.tableCell}>{props.coin_id}</div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth1].join(' ')}>{props.base}</div>
      <div className={classes.tableCell}>{props.volume}</div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth2].join(' ')}>{props.target}</div>
      <div className={[classes.tableCell, classes.tableCellFlex].join(' ')}>
        <img src={props.market.logo} alt={`${props.market.name}-image`} />
        <div>{props.market.name}</div>
      </div>
    </>
  )
}
export default TableRows
