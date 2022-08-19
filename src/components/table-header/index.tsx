import classes from './styles.module.scss'

export const TableHeader = () => {
  return (
    <>
      <div className={[classes.tableHeader, classes.tableCell].join(' ')}>Coin ID</div>
      <div className={[classes.tableHeader, classes.tableCell, classes.hideOnSmallWidth1].join(' ')}>Base</div>
      <div className={[classes.tableHeader, classes.tableCell].join(' ')}>Volume</div>
      <div className={[classes.tableHeader, classes.tableCell, classes.hideOnSmallWidth2].join(' ')}>Target</div>
      <div className={[classes.tableHeader, classes.tableCell].join(' ')}>Market</div>
    </>
  )
}
export default TableHeader
