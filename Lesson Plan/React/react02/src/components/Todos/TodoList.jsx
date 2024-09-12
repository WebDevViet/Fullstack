import { completeTodo, deleteTodo } from '../../store/actions/todosActions'
import { useDispatch, useSelector } from '../../store/hook'

export default function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const handleDelete = (id) => {
    if (confirm('Are you sure?')) {
      dispatch(deleteTodo(id))
    }
  }

  const handleCompletedTodo = (id) => {
    dispatch(completeTodo(id))
  }

  return (
    <ul>
      {todos?.map(({ id, content, isCompleted }) => (
        <li key={id}>
          <span onClick={() => handleCompletedTodo(id)} style={{ textDecoration: isCompleted ? 'line-through' : 'none' }}>
            {content}
          </span>{' '}
          <button onClick={() => handleDelete(id)}>❌</button>
        </li>
      ))}
    </ul>
  )
}
