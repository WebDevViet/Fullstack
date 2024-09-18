import { useEffect } from 'react'
import { useState } from 'react'

export default function CommentList() {
  const [comments, setComments] = useState([])

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/comments')
      .then((res) => res.json())
      .then((data) => {
        setComments(data)
        console.log('🚀 ~ .then ~ data:', data)
      })
  }, [])

  useEffect(() => {
    const scroll = () => {
      console.log('scroll')
    }
    console.log('window')

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

// useEffect(() => {
//   const scroll = (event) => {
//     console.log('🚀 ~ //scroll ~ event:', event)
//   }

//   window.addEventListener('scroll', scroll)
// }, [])
