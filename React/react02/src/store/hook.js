/** custom Hook
 * Tạo ra các hook riêng:
 * Có thể sử dụng với các hook khác
 * Tuân thủ các quy định về React hook
 */

import { useContext } from 'react'
import { ProviderContext } from './Provider'

// Tạo ra 2 hook để đọc state và dispatch từ global state
// useSelector
// useDispatch

export const useDispatch = () => {
  const { dispatch } = useContext(ProviderContext)
  return dispatch
}

export const useSelector = (selector) => {
  if (typeof selector !== 'function') {
    throw new Error('selector must be a function')
  }
  const { state } = useContext(ProviderContext)
  return selector(state)
}
