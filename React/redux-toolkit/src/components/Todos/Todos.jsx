import { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Show } from '../Core'
import { getTodos } from '../../redux/middlewares/todoMiddleware'

const Todos = () => {
  const { todoList, status, error } = useSelector((state) => state.todos)
  const dispatch = useDispatch()
  const isUnmount = useRef(false)

  useEffect(() => {
    // call api thông qua middleware
    if (!isUnmount.current) {
      dispatch(getTodos('ôke chưa'))
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
      <Show.When isTrue={status === 'pending'}>
        <p>Loading...</p>
      </Show.When>

      <Show.When isTrue={status === 'failed'}>
        <p>
          <strong>{error}</strong>
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
