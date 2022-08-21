import classes from './styles.module.scss'
import introImg from '../../assets/intro-img.png'

export const IntroPage = () => {
  return (
    <div className={classes.root}>
      <div className={classes.content}>
        <h1 className={classes.title}>Welcome to Max Wilson's DeepOpinion Coding Challenge </h1>
        <img src={introImg} alt="intro-image" className={classes.introImage} />
        <p className={classes.description}>Fetching data from GeckoAPI</p>
      </div>
    </div>
  )
}

export default IntroPage
