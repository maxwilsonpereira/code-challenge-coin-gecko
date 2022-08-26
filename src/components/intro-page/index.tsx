import { useEffect, useState } from 'react'
import classes from './styles.module.scss'
import introImg from '../../assets/intro-img.png'
import LoadingComponent from '../loading-component'

export const IntroPage = ({
  setFirstLoad,
  fetchData,
}: {
  setFirstLoad: React.Dispatch<React.SetStateAction<boolean>>
  fetchData: () => Promise<void>
}) => {
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setFirstLoad(true)
  }, [])

  const fetchDataHandler = () => {
    setLoading(true)
    fetchData()
  }

  return (
    <div id="intro-page" className={classes.root}>
      <div className={classes.content}>
        <h1 className={classes.title}>Welcome to Max Wilson's DeepOpinion Coding Challenge </h1>
        <img src={introImg} alt="intro-image" className={classes.introImage} />
        <br />
        <button
          onClick={fetchDataHandler}
          className={[classes.buttonBasic, loading && classes.buttonDisabled].join(' ')}
        >
          ENTER
        </button>
        {loading && (
          <>
            <p className={classes.description}>Fetching data from GeckoAPI</p>
            <LoadingComponent fade={true} />
          </>
        )}
      </div>
    </div>
  )
}

export default IntroPage
