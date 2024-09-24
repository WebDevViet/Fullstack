import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice({
  name: 'counter',
  initialState: {
    value: 0
  },
  reducers: {
    incrementCount: (state, action) => {
      console.log(action.payload)
      state.count += action.payload
    },
    decrementCount: (state, action) => {
      state.count -= action.payload
    }
  }
})

export const { incrementCount, decrementCount } = counterSlice.actions
export default counterSlice.reducer
