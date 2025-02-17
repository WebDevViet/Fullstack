import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Show } from '../Core'
import getTodos from '../../redux/middlewares/todoMiddleware'

const Todos = () => {
  const { todoList, errorTodos } = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const isUnmount = useRef(false)

  useEffect(() => {
    // call api thông qua middleware
    if (!isUnmount.current) {
      // dispatch({ type: 'todos/get' })
      dispatch(getTodos())
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
    <Show>
      <Show.When isTrue={errorTodos}>
        <p>
          <b>{errorTodos}</b>
        </p>
      </Show.When>
      <Show.Else>
        <ul>
          {todoList?.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </Show.Else>
    </Show>
  )
}

export default Todos
