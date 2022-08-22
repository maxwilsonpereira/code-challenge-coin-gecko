import { render, queryByAttribute, fireEvent } from '@testing-library/react'
import { ButtonColor } from './button-color'

test('component ButtonColor renders correctly and opens AddRowModalComponent on click', () => {
  const doNothing = () => {
    // do nothing
  }
  const dom = render(
    <ButtonColor title="test" type="add" localDataCount={0} setLocalDataCount={doNothing} setData={doNothing} />
  )
  const getById = queryByAttribute.bind(null, 'id')
  const btn = getById(dom.container, 'button-add')
  expect(btn).not.toBeFalsy()
  if (btn) {
    fireEvent.click(btn)
    const modal = getById(dom.container, 'add-modal')
    expect(modal).not.toBeFalsy()
  }
})
test('component ButtonColor closes AddRowModalComponent on click', () => {
  const doNothing = () => {
    // do nothing
  }
  const dom = render(
    <ButtonColor title="test" type="cancel" localDataCount={0} setLocalDataCount={doNothing} setData={doNothing} />
  )
  const getById = queryByAttribute.bind(null, 'id')
  const btn = getById(dom.container, 'button-cancel')
  expect(btn).not.toBeFalsy()
  if (btn) {
    fireEvent.click(btn)
    const modal = getById(dom.container, 'add-modal')
    expect(modal).toBeFalsy()
  }
})
