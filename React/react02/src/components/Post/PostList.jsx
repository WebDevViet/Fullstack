import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../store/hook'
import fetchPost from '../../store/middlewares/fetchPost'

export default function PostList() {
  const dispatch = useDispatch()
  const postList = useSelector((state) => state.postList)
  useEffect(() => {
    dispatch(fetchPost('get post'))
    // fetchPost('abc') => trả về cb action
    // dispatch('action') action = {type, payload}
    // dispatch(functionMiddleware(action))
  }, [])

  return (
    <div>
      <h1>Post List</h1>
      {postList.isLoading && <p>Loading...</p>}
      {postList.error && (
        <p>
          <strong>{postList.error}</strong>
        </p>
      )}
      {postList.data.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}
    </div>
  )
}
