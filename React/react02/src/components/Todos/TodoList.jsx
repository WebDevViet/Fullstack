import { useDispatch, useSelector } from '../../store/hook'

export default function TodoList() {
  const dispatch = useDispatch()
  const todos = useSelector((state) => state.todos)
  const handleDelete = (id) => {
    dispatch({
      type: 'todos/delete',
      payload: id
    })
  }

  return (
    <ul>
      {todos?.map(({ id, content }) => (
        <li key={id}>
          {content} <button onClick={() => handleDelete(id)}>❌</button>
        </li>
      ))}
    </ul>
  )
}
