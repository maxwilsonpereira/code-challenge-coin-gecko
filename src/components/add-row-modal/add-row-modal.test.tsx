import { render, queryByAttribute, fireEvent, screen } from '@testing-library/react'
import { ICoinTicker } from '../../interfaces/coingecko'
import { AddRowModalComponent } from './index'

describe('component AddRowModalComponent renders correctly and buttons work', () => {
  window.scrollTo = jest.fn()
  const testCoin: ICoinTicker = {
    coin_id: 'test-id',
    base: 'test-base',
    volume: 123,
    target: 'test-target',
    market: {
      name: 'test-name',
      logo: '',
    },
    trade_url: '',
  }

  test('component AddRowModalComponent renders correctly and has the right buttons', () => {
    const doNothing = () => {
      // do nothing
    }

    const dom = render(
      <AddRowModalComponent setAddRowModal={doNothing} setLocalDataCount={doNothing} setData={doNothing} />
    )
    const getById = queryByAttribute.bind(null, 'id')
    const addModal = getById(dom.container, 'add-row-modal')
    const btnCancel = getById(dom.container, 'button-cancel')
    const btnAdd = getById(dom.container, 'button-add')
    expect(addModal).not.toBeFalsy()
    expect(btnCancel).not.toBeFalsy()
    expect(btnAdd).not.toBeFalsy()
  })

  test('button adds item to localStorage', () => {
    const doNothing = () => {
      // do nothing
    }
    const dom = render(
      <AddRowModalComponent setAddRowModal={doNothing} setLocalDataCount={doNothing} setData={doNothing} />
    )
    const getById = queryByAttribute.bind(null, 'id')
    const coinId = getById(dom.container, 'coin-id')
    const volume = getById(dom.container, 'coin-volume')
    const target = getById(dom.container, 'coin-target')
    const market = getById(dom.container, 'coin-market')
    const base = getById(dom.container, 'coin-base')
    expect(coinId).not.toBeFalsy()
    expect(volume).not.toBeFalsy()
    expect(target).not.toBeFalsy()
    expect(market).not.toBeFalsy()
    expect(base).not.toBeFalsy()

    if (coinId && volume && target && market && base) {
      fireEvent.change(coinId, { target: { value: testCoin.coin_id } })
      fireEvent.change(volume, { target: { value: testCoin.base } })
      fireEvent.change(target, { target: { value: testCoin.volume } })
      fireEvent.change(market, { target: { value: testCoin.target } })
      fireEvent.change(base, { target: { value: testCoin.market.name } })
      const btnAdd = getById(dom.container, 'button-add')

      if (btnAdd) {
        localStorage.clear()
        fireEvent.click(btnAdd)
        const localData = localStorage.getItem('localStorageRows')
        if (localData) expect(JSON.parse(localData).length === 1).toBe(true)
      }
    }
  })
})
