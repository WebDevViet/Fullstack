import { useContext } from 'react'
import { AppContext } from '../App'

/* eslint-disable react/prop-types */
export default function Button({ children }) {
  const { onClick } = useContext(AppContext)
  return <button onClick={onClick}>{children}</button>
}
