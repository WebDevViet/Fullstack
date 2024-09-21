import { useEffect } from 'react'
import { useState } from 'react'

export default function CommentList() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    let ignore = false
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setComments(data)
          console.log('🚀 ~ .then ~ data:', data)
        }
      })

    return () => {
      ignore = true
    }
  }, [])

  useEffect(() => {
    const scroll = () => {
      console.log('scroll')
    }

    window.addEventListener('scroll', scroll)

    return () => {
      window.removeEventListener('scroll', scroll)
    }
  }, [])

  return (
    <>
      {comments.map((comment) => (
        <p key={comment.id}>{comment.body}</p>
      ))}
    </>
  )
}
