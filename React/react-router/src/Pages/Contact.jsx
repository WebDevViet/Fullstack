import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Contact = () => {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/thank-you', {
      state: { email }
    })
  }
  return (
    <>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
        <button>Submit</button>
      </form>
    </>
  )
}

export default Contact
