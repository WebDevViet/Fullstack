import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const Todos = () => {
  const { todoList, setErrorTodos } = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const todoMounting = useRef(true)

  useEffect(() => {
    // call api thông qua middleware

    if (todoMounting.current) {
      dispatch({ type: 'todos/get' })
    }

    // TODO: 'todos/get' -> middleware -> fetch GET todos -> 'todos/set' -> store

    return () => {
      /**
       * component đã bị unmount trong khi res chưa được trả về thì phải huỷ call api
       * nhưng nếu res đã trả về rồi và component đã bị unmount -> không cho setState or dispatch store
       */
      todoMounting.current = false
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {setErrorTodos && (
        <p>
          <b>{setErrorTodos}</b>
        </p>
      )}
      <ul>
        {todoList?.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </>
  )
}

export default Todos
