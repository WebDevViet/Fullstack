import { useState } from 'react'
import CommentList from './CommentList'
// const CommentList = lazy(() => import('./CommentList'))

export default function Comment() {
  const [isOpen, setOpen] = useState(true)

  const handleClick = () => {
    setOpen(!isOpen)
  }

  return (
    <div>
      <button onClick={handleClick}>Show Comments</button>
      {isOpen && (
        // <Suspense fallback={<Loading />}>
        <CommentList />
        // </Suspense>
      )}
    </div>
  )
}
