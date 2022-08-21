import { useEffect, useState } from 'react'
import classes from './styles.module.scss'

export const ErrorModalComponent = ({
  fetchData,
  setShowErrorModal,
}: {
  fetchData: () => void
  setShowErrorModal: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
}) => {
  const [timer, setTimer] = useState(1)

  useEffect(() => {
    timerHandler()
  }, [])

  const timerHandler = () => {
    var timeLeft = 1
    var downloadTimer = setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval(downloadTimer)
      } else {
        setTimer(timeLeft - 1)
        timeLeft -= 1
      }
    }, 1000)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.content}>
          <p>
            API not working at the moment.
            <br />
            Please wait 30 seconds and try again.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div className={classes.timer}>{timer}</div>
            <div>
              <button
                onClick={() => {
                  fetchData()
                  setShowErrorModal(undefined)
                }}
                className={[classes.buttonBasic, timer > 0 && classes.buttonDisabled].join(' ')}
              >
                TRY AGAIN
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorModalComponent
