import { useEffect, useState } from 'react'
import classes from '../table-header/styles.module.scss'
import { onScrollTrigger } from '../../utils/on-scroll-trigger'
import classesHeaderFix from './styles.module.scss'

export const TableHeaderFix = () => {
  const [showHide, setShowHide] = useState(false)
  useEffect(() => {
    onScrollTrigger(400, setShowHide)
  }, [])

  return (
    <>
      <div
        className={[classesHeaderFix.tableHeaderFixBackground, showHide && classesHeaderFix.showHeaderFix].join(' ')}
      />
      <div
        className={[
          classes.tableGrid,
          classesHeaderFix.tableHeaderFix,
          showHide && classesHeaderFix.showHeaderFix,
        ].join(' ')}
      >
        <div className={[classes.tableCell, classesHeaderFix.tableCellFix].join(' ')}>Coin ID</div>
        <div className={[classes.tableCell, classesHeaderFix.tableCellFix, classes.hideOnSmallWidth1].join(' ')}>
          Base
        </div>
        <div className={[classes.tableCell, classesHeaderFix.tableCellFix].join(' ')}>Volume</div>
        <div className={[classes.tableCell, classesHeaderFix.tableCellFix, classes.hideOnSmallWidth2].join(' ')}>
          Target
        </div>
        <div className={[classes.tableCell, classesHeaderFix.tableCellFix].join(' ')}>Market</div>
      </div>
    </>
  )
}
export default TableHeaderFix
