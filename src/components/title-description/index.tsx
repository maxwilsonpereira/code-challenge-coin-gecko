import classes from './styles.module.scss'

export const TitleDescription = () => {
  return (
    <>
      <h1 className={classes.pageTitle}>Virtualized List</h1>
      <p className={classes.pageDescription}>Click on the line to open the corresponding currency trading website</p>
    </>
  )
}

export default TitleDescription
