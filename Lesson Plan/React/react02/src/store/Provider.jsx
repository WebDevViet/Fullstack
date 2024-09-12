/* eslint-disable react/prop-types */
import { createContext } from 'react'
import { initialState, reducer } from './rootReducer'
import { useREducerWithMiddleware } from './hook'
import { middleware } from './middleware'

/**
 * Component này sẽ chứa global state và các logic rồi truyền dữ liệu xuống các component của toàn bộ dự án
 */

export const ProviderContext = createContext()

export default function Provider({ children }) {
  const [state, dispatch] = useREducerWithMiddleware(reducer, initialState, middleware)
  return (
    <ProviderContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ProviderContext.Provider>
  )
}
