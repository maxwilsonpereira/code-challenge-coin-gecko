import classes from './styles.module.scss'

export const TableHeathers = () => {
  return (
    <>
      <div className={classes.tableCell}>Coin ID</div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth1].join(' ')}>Base</div>
      <div className={classes.tableCell}>Volume</div>
      <div className={[classes.tableCell, classes.hideOnSmallWidth2].join(' ')}>Target</div>
      <div className={classes.tableCell}>Market</div>
    </>
  )
}
export default TableHeathers
