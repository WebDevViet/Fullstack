import { v7 as uuidv7 } from 'uuid'

export const initialState = {
  counter: 0,
  todos: [],
  postList: [],
  auth: {
    user: null,
    isLoading: 'idle'
  }
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
            content: action.payload,
            isCompleted: false
          }
        ]
      }
    case 'todos/delete':
      return {
        ...state,
        todos: state.todos.filter((todo) => todo.id !== action.payload)
      }
    case 'todos/complete':
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.payload) {
            return {
              ...todo,
              isCompleted: !todo.isCompleted
            }
          }
          return todo
        })
      }
    case 'post/get':
      return {
        ...state,
        postList: action.payload
      }
    case 'auth/setUser': {
      return { ...state, auth: { ...state.auth, user: action.payload } }
    }
    case 'auth/setLoading': {
      return { ...state, auth: { ...state.auth, isLoading: action.payload } }
    }
    default:
      return state
  }
}
