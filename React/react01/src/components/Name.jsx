import { useState } from 'react'

export default function Name() {
  const [name, setName] = useState('Max')

  console.count('re-render')

  return (
    <div className='w-75 mx-auto'>
      <h1>{name}</h1>
      <button onClick={() => setName('My')}>Set New Name</button>
    </div>
  )
}
