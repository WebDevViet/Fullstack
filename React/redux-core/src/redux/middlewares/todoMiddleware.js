//TODO: Redux-thunk: thunk fn đóng vai trò giống như là action creator

import { TODO_SET, TODO_SET_ERROR } from '../reducers/todoReducer'

const getTodos = () => {
  return async (dispatch, _, API) => {
    try {
      const res = await fetch(`${API}/todos`)

      if (!res.ok) throw new Error(res.statusText)

      const todos = await res.json()
      dispatch({ type: TODO_SET, payload: todos })
    } catch (error) {
      dispatch({ type: TODO_SET_ERROR, payload: error.message })
    }
  }
}

export default getTodos

//TODO: Middleware Core
// const todoMiddleware = () => (next) => async (action) => {
//   if (action.type === 'todos/get') {
//     // call api ở đây
//     // fetch('https://jsonplaceholder.typicode.com/todos')
//     //   .then((res) => res.json())
//     //   .then((todos) => next({ type: 'todos/set', payload: todos }))
//     //   .catch((err) => next({ type: 'todos/setError', payload: err.message }))

//     try {
//       const res = await fetch(`https://jsonplaceholder.typicode.com/todos`)
//       if (!res.ok) throw new Error(res.statusText)

//       const todos = await res.json()
//       next({ type: 'todos/set', payload: todos })
//     } catch (error) {
//       next({ type: 'todos/setError', payload: error.message })
//     }
//   } else {
//     next(action) // action sẽ được đưa lên store
//   }
//   // Tuỳ vào nghiệp vụ mà có mutate action hay không
//   // - store.dispatch(action) nếu không muốn thông qua middleware nào sau đó
//   // - next(action) action sẽ được dùng cho middleware tiếp theo
//   // - nếu đã ở middleware cuối cùng thì có thể dùng next(action) để action được đẩy thẳng lên store
// }

// export default todoMiddleware
