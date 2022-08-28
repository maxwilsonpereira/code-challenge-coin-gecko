import { render, queryByAttribute } from '@testing-library/react'
import { VirtualizedList } from './index'

test('component VirtualizedList renders correctly and shows component IntroPage', () => {
  window.scrollTo = jest.fn()
  const dom = render(<VirtualizedList />)
  const getById = queryByAttribute.bind(null, 'id')
  const intro = getById(dom.container, 'intro-page')
  const loading = getById(dom.container, 'intro-page')
  expect(intro).not.toBeFalsy()
  expect(loading).not.toBeFalsy()
})
