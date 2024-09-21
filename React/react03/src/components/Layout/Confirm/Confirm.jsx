/* eslint-disable react/prop-types */
import { createPortal } from 'react-dom'
import './confirm.css'
export default function Confirm({ showModal, onClick }) {
  if (showModal === false) return null

  return createPortal(
    <div className='modal'>
      <div className='overlay' onClick={onClick}></div>
      <div className='confirm'>
        <h3>Oke chưa</h3>
      </div>
    </div>,
    document.body
  )
}
