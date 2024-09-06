import { v7 as uuidv7 } from 'uuid'

export const initialState = {
  counter: 0,
  todos: [
    {
      id: 1,
      content: 'todo 1'
    },
    {
      id: 2,
      content: 'todo 2'
    }
  ]
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'counter/increment':
      return { ...state, counter: state.counter + action.payload }
    case 'counter/decrement':
      return { ...state, counter: state.counter - action.payload }
    case 'todos/add':
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: uuidv7(),
            content: action.payload
          }
        ]
      }
    case 'todos/delete':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    default:
      return state
  }
}
