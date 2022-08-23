import { useEffect, useState } from 'react'
import { getDataLocal } from '../../services/coinGecko/coingecko'
import classes from './styles.module.scss'

export const ErrorModalComponent = ({
  fetchData,
  setShowErrorModal,
  setUsingLocalData,
  setLoading,
}: {
  fetchData: () => void
  setShowErrorModal: React.Dispatch<React.SetStateAction<boolean>>
  setUsingLocalData: React.Dispatch<React.SetStateAction<boolean>>
  setLoading: React.Dispatch<React.SetStateAction<boolean | undefined>>
}) => {
  const [timer, setTimer] = useState(30)

  useEffect(() => {
    timerHandler()
  }, [])

  const timerHandler = () => {
    let timeLeft = 30
    const downloadTimer = setInterval(function () {
      if (timeLeft <= 0) {
        clearInterval(downloadTimer)
      } else {
        setTimer(timeLeft - 1)
        timeLeft -= 1
      }
    }, 1000)
  }

  const tryAgainHandler = async () => {
    setShowErrorModal(false)
    fetchData()
  }

  const fetchLocalDataHandler = () => {
    getDataLocal('1', 'bitcoin')
    setUsingLocalData(true)
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
    setLoading(false)
    setShowErrorModal(false)
  }

  return (
    <div className={classes.root}>
      <div className={classes.container}>
        <div className={classes.content}>
          <p>
            API not working at the moment.
            <br />
            Please wait 30 seconds and try again or use Local Data.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            {timer > 0 && <div className={classes.timer}>{timer}</div>}
            <div className={classes.btnsGrid}>
              <div>
                <button
                  onClick={tryAgainHandler}
                  className={[
                    classes.buttonBasic,
                    classes.btnRed,
                    classes.btnTryAgain,
                    timer > 0 && classes.buttonDisabled,
                  ].join(' ')}
                >
                  TRY AGAIN
                </button>
              </div>
              <div>
                <button onClick={fetchLocalDataHandler} className={classes.buttonBasic} style={{ marginLeft: 20 }}>
                  LOCAL DATA
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ErrorModalComponent
