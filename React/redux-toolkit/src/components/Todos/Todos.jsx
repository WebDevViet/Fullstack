import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import getTodos from '../../redux/middlewares/todoMiddleware'

const Todos = () => {
  const { todoList, errorTodos } = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const isUnmount = useRef(false)

  useEffect(() => {
    // call api thông qua middleware
    if (!isUnmount.current) {
      dispatch(getTodos('Ok chưa'))
    }

    return () => {
      /**
       * component đã bị unmount trong khi res chưa được trả về thì phải huỷ call api
       * nhưng nếu res đã trả về rồi và component đã bị unmount -> không cho setState or dispatch store
       */
      isUnmount.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {errorTodos && (
        <p>
          <b>{errorTodos}</b>
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
