const todoMiddleware = () => (next) => (action) => {
  if (action.type === 'todos/get') {
    // call api ở đây
    fetch('https://jsonplaceholder.typicode.com/todos')
      .then((res) => res.json())
      .then((todos) => next({ type: 'todos/set', payload: todos }))
      .catch((err) => next({ type: 'todos/setErrorTodos', payload: err.message }))
  } else {
    next(action) // action sẽ được đưa lên store
  }
  /** Tuỳ vào nghiệp vụ mà có mutate action hay không
   * store.dispatch(action) nếu không muốn thông qua middleware nào sau đó
   * next(action) action sẽ được dùng cho middleware tiếp theo
   * nếu đã ở middleware cuối cùng thì có thể dùng next(action) để action được đẩy thẳng lên store
   */
}

export default todoMiddleware
