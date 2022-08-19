import { useState } from 'react'
import classes from '../table-header/styles.module.scss'
import { ICoinTickers } from '../interfaces/coingecko'
import TableCell from './table-cell'

interface ITableRow extends ICoinTickers {
  index: number
  ref?: HTMLDivElement
}

const TableRow = ({ ...props }: ITableRow) => {
  const { index, coin_id, base, volume, target, market, trade_url } = props
  const [onHover, setOnHover] = useState(false)

  const openInNewTab = (url: string): void => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
    if (newWindow) newWindow.opener = null
  }

  return (
    <div
      className={[classes.tableRow, !(trade_url && trade_url.length) && classes.noPointerEvents].join(' ')}
      onClick={() => openInNewTab(trade_url)}
      onMouseOver={() => setOnHover(trade_url && trade_url.length ? true : false)}
      onMouseLeave={() => setOnHover(false)}
    >
      <TableCell
        text={coin_id}
        color="rgb(19, 99, 34)"
        onHover={onHover}
        classesAdd={[index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell
        text={base}
        onHover={onHover}
        classesAdd={[classes.hideOnSmallWidth1, index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell text={volume} color="rgb(128, 11, 0)" onHover={onHover} classesAdd={[index % 2 ? classes.rowColor1 : classes.rowColor2]} />
      <TableCell
        text={target}
        onHover={onHover}
        classesAdd={[classes.hideOnSmallWidth2, index % 2 ? classes.rowColor1 : classes.rowColor2]}
      />
      <TableCell onHover={onHover} classesAdd={[classes.tableCellFlex, index % 2 ? classes.rowColor1 : classes.rowColor2]}>
        <img src={market.logo} alt={`${market.name}-image`} className={classes.image} />
        <div className={classes.ellipsisText} style={{ color: 'rgb(128, 11, 0)' }}>
          {market.name}
        </div>
      </TableCell>
    </div>
  )
}

export default TableRow
