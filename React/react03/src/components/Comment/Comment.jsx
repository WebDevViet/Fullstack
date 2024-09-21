import { lazy, Suspense, useState } from 'react'
// import CommentList from './CommentList'
import Loading from '../Loading/Loading'
const CommentList = lazy(() => import('./CommentList'))

export default function Comment() {
  const [isOpen, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={handleClick}>Show Comments</button>
      <p>{isOpen ? 'Show Comments' : 'Hide Comments'}</p>
      {isOpen && (
        <Suspense fallback={<Loading />}>
          <CommentList />
        </Suspense>
      )}
    </div>
  )
}
