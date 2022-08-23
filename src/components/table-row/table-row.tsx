import { useState } from 'react'
import classes from '../table-header/styles.module.scss'
import { ICoinTicker } from '../../interfaces/coingecko'
import TableCell from './table-cell'

interface ITableRow extends ICoinTicker {
  index: number
}

const TableRow = ({ ...props }: ITableRow) => {
  const { index, coin_id, base, volume, target, market, trade_url } = props
  const [onHover, setOnHover] = useState(false)

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  const handleRowClick = () => {
    if (trade_url) openInNewTab(trade_url)
  }

  return (
    <div
      id={`row-${index}-${coin_id}`}
      className={[classes.tableRow, !(trade_url && trade_url.length) && classes.noPointerEvents].join(' ')}
      onClick={handleRowClick}
      onMouseOver={() => setOnHover(trade_url && trade_url.length ? true : false)}
      onMouseLeave={() => setOnHover(false)}
    >
      <TableCell
        text={coin_id || ''}
        color="rgb(19, 99, 34)"
        onHover={onHover}
        classesAdd={[index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell
        text={base || ''}
        onHover={onHover}
        classesAdd={[classes.hideOnSmallWidth1, index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell
        text={volume ? volume.toString() : ''}
        color="rgb(128, 11, 0)"
        onHover={onHover}
        classesAdd={[index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell
        text={target || ''}
        onHover={onHover}
        classesAdd={[classes.hideOnSmallWidth2, index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell
        onHover={onHover}
        classesAdd={[classes.tableCellFlex, index % 2 ? classes.rowColor1 : classes.rowColor2]}
      >
        <img
          src={
            market.logo ? market.logo : 'https://assets.coingecko.com/markets/images/267/small/Coinsbit.png?1605153697'
          }
          alt={`${market.name}-image`}
          className={classes.marketImage}
        />
        <div className={classes.ellipsisText} style={{ color: 'rgb(128, 11, 0)' }}>
          <span className={classes.marketName}>{market.name}</span>
        </div>
      </TableCell>
    </div>
  )
}

export default TableRow
