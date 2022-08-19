import { useState, useEffect } from 'react'
import { onScrollTrigger } from '../utils/onScrollTrigger'
import classes from './styles.module.scss'

export const BackToTopIcon = () => {
  const [showHide, setShowHide] = useState(false)
  useEffect(() => {
    onScrollTrigger(600, setShowHide)
  }, [])

  const onClickHandler = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div onClick={onClickHandler} className={[classes.root, showHide ? classes.showIcon : classes.hideIcon].join(' ')}>
      <span className={classes.arrowUp}>&#8593;</span>
    </div>
  )
}

export default BackToTopIcon
