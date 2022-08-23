import classes from './styles.module.scss'

export const TableHeader = () => {
  return (
    <>
      <div className={[classes.tableCell, classes.tableHeader].join(' ')}>Coin ID</div>
      <div className={[classes.tableCell, classes.tableHeader, classes.hideOnSmallWidth1].join(' ')}>Base</div>
      <div className={[classes.tableCell, classes.tableHeader, classes.tableHeader].join(' ')}>Volume</div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth2].join(' ')}>Target</div>
      <div className={[classes.tableCell, classes.tableHeader].join(' ')}>Market</div>
    </>
  )
}
export default TableHeader
