import { produce } from 'immer'

const initState = {
  todoList: [],
  setErrorTodos: null
}

const todosReducer = produce((state = initState, action) => {
  switch (action.type) {
    case 'todos/set':
      state.todoList = action.payload
      return
    case 'todos/setError':
      state.setErrorTodos = action.payload
      return
    default:
      return state
  }
})

export default todosReducer
