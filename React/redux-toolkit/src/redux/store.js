/*
Redux Toolkit

store
    - counterSlice
      - reducer
      - state
      - action
    - todoSlice
      - reducer
      - state
      - action
    */
// import { counterSlice } from './slices/counterSlice'
// import { todoSlice } from './slices/todoSlice'

import { configureStore } from '@reduxjs/toolkit'

import counterReducer from './slices/counterSlice'
import todoReducer from './slices/todoSlice'

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    todos: todoReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: {
        extraArgument: {
          api: import.meta.env.VITE_API
        }
      }
    })
})

//Redux Thunk với Redux Toolkit
//createAsyncThunk
