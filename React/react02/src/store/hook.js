/** custom Hook
 * Tạo ra các hook riêng:
 * Có thể sử dụng với các hook khác
 * Tuân thủ các quy định về React hook
 */

import { useContext, useReducer } from 'react'
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

// Tạo ra 1 hook middleware để xử lý trước khi dispatch vào store

export const useREducerWithMiddleware = (reducer, initialState, middleware) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const dispatchWithMiddleware = (action) => {
    // do Something in middleware => done => dispatch

    // TH1: action là plain object = {type, payload}
    if (typeof action === 'object') {
      dispatch(action)
    }

    // TH2: action là function => có sử dụng middleware
    if (typeof middleware === 'function') {
      const store = {
        dispatch,
        getState: () => state
      }

      const middlewareFn = middleware(store) // hàm middleware
      if (typeof middlewareFn !== 'function') {
        throw new Error('middleware must be return a function')
      }
      middlewareFn(action)
    }
  }

  return [state, dispatchWithMiddleware]
}

/**
 * TH1: Có middleware => action là hàm: (dispatch, state) => {await call api => dispatch}
 * TH2: Ko có middleware => action là plain object: {type, payload}
 */
