import classes from './styles.module.scss'

export const ErrorModalComponent = () => {
  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <p>
          API not working at the moment.
          <br />
          Please refresh the page or try again later.
        </p>
      </div>
    </div>
  )
}
