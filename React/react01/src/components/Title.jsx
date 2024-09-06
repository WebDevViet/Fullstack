import { useEffect, useState } from 'react'

export default function Title() {
  const [title, setTitle] = useState('')

  const handleChangeValue = ({ target: { value } }) => setTitle(value)

  useEffect(() => {
    document.title = title
  }, [title])

  return (
    <div className='w-75 mx-auto py-3'>
      <h1>Title</h1>
      <input type='text' value={title} onChange={handleChangeValue} />
    </div>
  )
}
