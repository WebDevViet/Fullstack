import { produce } from 'immer'

const initState = {
  todoList: [],
  errorTodos: null
}

const todosReducer = produce((state = initState, action) => {
  switch (action.type) {
    case TODO_SET:
      state.todoList = action.payload
      break
    case TODO_SET_ERROR:
      state.errorTodos = action.payload
      break
    default:
      return state
  }
})

export const TODO_SET = 'todos/set'
export const TODO_SET_ERROR = 'todos/setError'

export default todosReducer
