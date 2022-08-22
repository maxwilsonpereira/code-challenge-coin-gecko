import classes from './styles.module.scss'

export const TitleDescription = ({ usingLocalData }: { usingLocalData: boolean }) => {
  return (
    <>
      <h1 className={classes.pageTitle}>Virtualized List</h1>
      {usingLocalData && (
        <p className={[classes.pageDescription, usingLocalData && classes.warning].join(' ')}>
          GeckoAPI not working at the moment. Using local data.
        </p>
      )}
      <p className={classes.pageDescription}>click on the row to open the corresponding currency trading website</p>
    </>
  )
}

export default TitleDescription
