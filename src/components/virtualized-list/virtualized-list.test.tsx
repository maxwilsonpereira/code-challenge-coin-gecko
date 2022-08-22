import { render, queryByAttribute } from '@testing-library/react'
import { VirtualizedList } from './index'

test('component VirtualizedList renders correctly and has the right elements on first load', () => {
  window.scrollTo = jest.fn()
  const dom = render(<VirtualizedList />)
  const getById = queryByAttribute.bind(null, 'id')
  const intro = getById(dom.container, 'intro-page')
  const loading = getById(dom.container, 'loading-indicator')
  expect(intro).not.toBeFalsy()
  expect(loading).not.toBeFalsy()
})
