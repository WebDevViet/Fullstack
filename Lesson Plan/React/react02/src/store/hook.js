/** custom Hook - Tạo ra các hook riêng
 * Có thể sử dụng với các hook khác: hook react, custom hook
 * Tuân thủ các quy định về React hook
 */

import { useContext, useReducer } from 'react'
import { ProviderContext } from './Provider'

// Tạo ra 2 hook để đọc state và dispatch từ global state (để ko cần phải import context cho từng component)
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

// Tạo ra 1 hook middleware để xử lý trước khi dispatch vào store

export const useREducerWithMiddleware = (reducer, initialState, middleware) => {
  // middleware là function
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchWithMiddleware = (action) => {
    if (typeof action === 'object') return dispatch(action)

    if (typeof middleware === 'function') {
      const store = {
        getState: () => state,
        dispatch
      }

      const middlewareFn = middleware(store)

      if (typeof middlewareFn !== 'function') {
        throw new Error('Middleware must be a function')
      }

      middlewareFn(action)
    }
  }

  return [state, dispatchWithMiddleware]
}

/** Có middleware
 * TH1: action là function
 * TH2: action là object
 */

/** Ko có middleware
 * action là object
 */
