import { useEffect } from 'react'
import { useDispatch, useSelector } from '../../store/hook'
import fetchPost from '../../store/middlewares/fetchPost'

export default function PostList() {
  const dispatch = useDispatch()
  const postList = useSelector((state) => state.postList)
  useEffect(() => {
    dispatch(fetchPost())
  }, [])

  return (
    <div>
      <h1>Post List</h1>
      {postList.map(({ id, title }) => (
        <div key={id}>{title}</div>
      ))}
    </div>
  )
}
