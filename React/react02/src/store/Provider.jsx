/* eslint-disable react/prop-types */
import { createContext, useReducer } from 'react'
import { initialState, reducer } from './rootReducer'

export const ProviderContext = createContext()

export default function Provider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState)
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
