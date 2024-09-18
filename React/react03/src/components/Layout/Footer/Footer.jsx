import { useState } from 'react'
import Confirm from '../Confirm'

export default function Footer() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
  }
  return (
    <div className='footer'>
      <h3>Footer</h3>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <Confirm showModal={showModal} onClick={handleClose} />
    </div>
  )
}
