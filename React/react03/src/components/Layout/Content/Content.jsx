import { useState } from 'react'
import Confirm from '../Confirm'

export default function Content() {
  const [showModal, setShowModal] = useState(false)

  const handleClose = () => {
    setShowModal(false)
  }

  return (
    <div className='content'>
      <button onClick={() => setShowModal(true)}>Show Modal</button>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      <Confirm showModal={showModal} onClick={handleClose} />
    </div>
  )
}
