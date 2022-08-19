import classes from '../table-header/styles.module.scss'

export const TableCell = ({
  text,
  color = '#000',
  children,
  onHover,
  classesAdd,
}: {
  text?: string
  color?: string
  children?: any
  onHover: boolean
  classesAdd: any[]
}) => {
  return (
    <div className={[classes.tableCell, onHover && classes.cellOnHover].concat(classesAdd).join(' ')}>
      {text ? (
        <div className={classes.ellipsisText} style={{ color: color }}>
          {text}
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  )
}

export default TableCell
