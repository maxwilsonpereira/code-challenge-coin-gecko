import { useEffect, useState } from 'react'
import { ICoinTicker } from '../../../interfaces/coingecko'
import { onScrollTrigger } from '../../../utils/on-scroll-trigger'
import AddRowModalComponent from '../../add-row-modal'
import classes from './styles.module.scss'

interface IButtonColorProps {
  title: string
  type: string
  localDataCount: number
  setLocalDataCount: React.Dispatch<React.SetStateAction<number>>
  loading?: boolean
  setData: React.Dispatch<React.SetStateAction<ICoinTicker[]>>
}
export const ButtonColor = (props: IButtonColorProps) => {
  const [modal, setModal] = useState<JSX.Element>()
  const [buttonAdd, changeButtonAdd] = useState(false)
  const [hideButtonDelete, setHideButtonDelete] = useState(false)
  const [component, setComponent] = useState<JSX.Element>()
  const { title, type, localDataCount, setLocalDataCount, loading, setData } = props

  useEffect(() => {
    if (type === 'add') {
      onScrollTrigger(0, changeButtonAdd)
      setComponent(
        <AddRowModalComponent setAddRowModal={setModal} setLocalDataCount={setLocalDataCount} setData={setData} />
      )
    } else onScrollTrigger(0, setHideButtonDelete)
  }, [])

  const onClickHandler = () => {
    if (type === 'add') setModal(component)
    else {
      localStorage.clear()
      setData((prev) => prev.splice(localDataCount, prev.length))
      if (setLocalDataCount) setLocalDataCount(0)
    }
  }

  if (hideButtonDelete) return null
  return (
    <>
      {modal}
      <div
        id={`button-${type}`}
        onClick={onClickHandler}
        className={[
          classes.root,
          type === 'delete' && classes.deleteBtn,
          buttonAdd && classes.buttonDownLeft,
          type === 'add' && localDataCount > 29 && classes.buttonDisabled,
          loading && classes.buttonDisabled,
        ].join(' ')}
      >
        <p className={[classes.addRowText, buttonAdd && classes.buttonDownLeftP].join(' ')}>
          {title.split(' ')[0]} <span className={classes.hideRow}>{title.split(' ')[1]}</span>
        </p>
      </div>
    </>
  )
}

export default ButtonColor
