import { useEffect, useState } from 'react'
import classes from '../table-header/styles.module.scss'
import { onScrollTrigger } from '../utils/onScrollTrigger'
import classesHeaderFix from './styles.module.scss'

export const TableHeaderFix = () => {
  const [showHide, setShowHide] = useState(false)
  useEffect(() => {
    onScrollTrigger(60, setShowHide)
  }, [])

  return (
    <>
      <div className={[classesHeaderFix.tableHeaderFixRoot, showHide && classesHeaderFix.showHeaderFix].join(' ')} />
      <div className={[classes.tableGrid, classesHeaderFix.tableHeaderFix, showHide && classesHeaderFix.showHeaderFix].join(' ')}>
        <div className={[classes.tableCell, classes.tableHeader].join(' ')}>Coin ID</div>
        <div className={[classes.tableCell, classes.tableHeader, classes.hideOnSmallWidth1].join(' ')}>Base</div>
        <div className={[classes.tableCell, classes.tableHeader].join(' ')}>Volume</div>
        <div className={[classes.tableCell, classes.tableHeader, classes.hideOnSmallWidth2].join(' ')}>Target</div>
        <div className={[classes.tableCell, classes.tableHeader].join(' ')}>Market</div>
      </div>
    </>
  )
}
export default TableHeaderFix
