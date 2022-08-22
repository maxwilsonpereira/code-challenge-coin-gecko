import { useState } from 'react'
import { ICoinTicker } from '../../interfaces/coingecko'
import { isICoinTicker } from '../../utils/interfaces-check'
import AddRowModalInput from './input'
import classes from './styles.module.scss'

export const AddRowModalComponent = ({
  setAddRowModal,
  setLocalDataCount,
  setData,
}: {
  setAddRowModal: React.Dispatch<React.SetStateAction<JSX.Element | undefined>>
  setLocalDataCount: React.Dispatch<React.SetStateAction<number>>
  setData: React.Dispatch<React.SetStateAction<ICoinTicker[]>>
}) => {
  const [coinId, setCoinId] = useState('')
  const [coinBase, setCoinBase] = useState('')
  const [coinVolume, setCoinVolume] = useState('')
  const [coinTarget, setCoinTarget] = useState('')
  const [coinMarket, setCoinMarket] = useState('')

  const addHowHandler = () => {
    let localCorruptedOrFull = false
    const localState: ICoinTicker[] = [
      {
        coin_id: coinId,
        base: coinBase,
        volume: parseInt(coinVolume),
        target: coinTarget,
        market: {
          name: coinMarket,
          logo: 'https://assets.coingecko.com/markets/images/267/small/Coinsbit.png?1605153697',
        },
        trade_url: '',
      },
    ]
    if (!localStorage.getItem('localStorageRows')) {
      localState.forEach((cur: any) => {
        if (localCorruptedOrFull) return
        if (!isICoinTicker(cur)) localCorruptedOrFull = true
      })
      if (!localCorruptedOrFull) {
        localStorage.setItem('localStorageRows', JSON.stringify(localState))
      }
    } else {
      const localData = localStorage.getItem('localStorageRows')
      if (localData) {
        const updateData = JSON.parse(localData)
        if (updateData.length > 29) {
          localCorruptedOrFull = true
          return
        }
        updateData.forEach((cur: any) => {
          if (localCorruptedOrFull) return
          if (!isICoinTicker(cur)) localCorruptedOrFull = true
        })
        if (!localCorruptedOrFull)
          localStorage.setItem('localStorageRows', JSON.stringify(localState.concat(updateData)))
      }
    }
    if (!localCorruptedOrFull) {
      setData((prev) => localState.concat(prev))
      setLocalDataCount((prev) => prev + 1)
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      })
    } else {
      // ADD MESSAGE TO USER IN THE FUTURE
    }
    setAddRowModal(undefined)
  }

  return (
    <div id="add-row-modal" className={classes.root}>
      <div className={classes.container}>
        <p className={classes.title}>Add New Coin</p>
        <div className={classes.inputGrid}>
          <AddRowModalInput coinId="coin-id" value={coinId} placeholder="Coin ID" stateSetter={setCoinId} />
          <AddRowModalInput
            coinId="coin-volume"
            value={coinVolume}
            type="number"
            placeholder="Volume (number required)"
            stateSetter={setCoinVolume}
          />
          <AddRowModalInput coinId="coin-target" value={coinTarget} placeholder="Target" stateSetter={setCoinTarget} />
          <AddRowModalInput coinId="coin-market" value={coinMarket} placeholder="Market" stateSetter={setCoinMarket} />
          <AddRowModalInput coinId="coin-base" value={coinBase} placeholder="Base" stateSetter={setCoinBase} />

          <div id="add-modal">
            <button
              id="button-add"
              onClick={addHowHandler}
              className={[
                classes.buttonBasic,
                (!coinId.length ||
                  !coinBase.length ||
                  !coinVolume.length ||
                  !coinTarget.length ||
                  !coinMarket.length) &&
                  classes.buttonDisabled,
              ].join(' ')}
              style={{ marginLeft: 20 }}
            >
              ADD
            </button>
            <button
              id="button-cancel"
              onClick={() => setAddRowModal(undefined)}
              className={[classes.buttonBasic, classes.btnRed].join(' ')}
            >
              CANCEL
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AddRowModalComponent
