import { useEffect, useState } from 'react'

export default function useWelcome() {
  const [state, setState] = useState('')

  const API = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve('Hello World')
      }, 2000)
    })
  }

  useEffect(() => {
    API().then((data) => setState(data))
  }, [])
  return state
}
