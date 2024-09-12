export const addTodo = (payload) => ({
  type: 'todos/add',
  payload
})

export const deleteTodo = (payload) => ({
  type: 'todos/delete',
  payload
})

export const completeTodo = (payload) => ({
  type: 'todos/complete',
  payload
})
