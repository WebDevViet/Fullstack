const initialState = {
  count: 0
}

const counterReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'count/increment':
      return {
        ...state,
        count: state.count + 1
      }
    case 'count/decrement':
      return {
        ...state,
        count: state.count - 1
      }
    default:
      return state
  }
}

export default counterReducer
