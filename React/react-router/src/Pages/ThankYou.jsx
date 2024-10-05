import { useNavigate } from 'react-router-dom'

const ThankYou = () => {
  const navigate = useNavigate()
  return (
    <>
      <h1>ThankYou</h1>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  )
}

export default ThankYou
