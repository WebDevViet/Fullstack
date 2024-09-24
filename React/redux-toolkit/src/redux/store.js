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

export const store = configureStore({
  reducer: {
    counter: counterReducer
  }
})

//Redux Thunk với Redux Toolkit
//createAsyncThunk
