import { v7 as uuidv7 } from 'uuid'

export const initialState = {
  counter: 0,
  todos: [
    {
      id: 1,
      content: 'todo 1',
      isCompleted: false
    },
    {
      id: 2,
      content: 'todo 2',
      isCompleted: false
    },
    {
      id: 3,
      content: 'todo 3',
      isCompleted: false
    }
  ],
  postList: {
    data: [],
    error: '',
    isLoading: true
  },
  authen: {
    user: null,
    token: null,
    error: '',
    isLoading: 'idle',
    status: 'pending'
  }
}

export const reducer = (state, action) => {
  switch (action.type) {
    case 'authen/setUser':
      return {
        ...state,
        authen: {
          ...state.authen,
          user: action.payload
        }
      }
    case 'authen/setToken':
      return {
        ...state,
        authen: {
          ...state.authen,
          token: action.payload
        }
      }
    case 'authen/isLoading':
      return {
        ...state,
        authen: {
          ...state.authen,
          isLoading: action.payload
        }
      }
    case 'authen/setStatus':
      return {
        ...state,
        authen: {
          ...state.authen,
          status: action.payload
        }
      }
    case 'authen/error':
      return {
        ...state,
        authen: {
          ...state.authen,
          error: action.payload
        }
      }
    case 'post/get':
      return {
        ...state,
        postList: {
          ...state.postList,
          data: action.payload
        }
      }
    case 'post/error':
      return {
        ...state,
        postList: {
          ...state.postList,
          error: action.payload
        }
      }
    case 'post/offloading':
      return {
        ...state,
        postList: {
          ...state.postList,
          isLoading: false
        }
      }
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

    default:
      return state
  }
}
