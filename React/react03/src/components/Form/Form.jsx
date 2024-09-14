import { useEffect, useRef, useState } from 'react'
import { Input } from '../Input'

export default function Form() {
  const [form, setForm] = useState({ text: '' })
  const inputRef = useRef()

  const handleChange = ({ target: { name, value } }) => {
    setForm({ ...form, [name]: value }) // immutable
  }

  const handleEmptyValue = () => {
    inputRef.current.value = ''
  }

  const handleChangeValue = () => {
    inputRef.current.value = 'Changed' // modify the value
  }

  const handleChangePlaceholder = () => {
    inputRef.current.placeholder = 'Changed placeholder'
  }

  useEffect(() => {
    console.log(inputRef)
  }, [form])

  return (
    <div>
      <form action=''>
        <Input name={'text'} label={'text'} value={form.text} onChange={handleChange} ref={inputRef} />
      </form>
      <div>
        <button onClick={handleEmptyValue}>Empty Value</button>
        <button onClick={handleChangeValue}>Change Value</button>
        <button onClick={handleChangePlaceholder}>ChangePlaceholder</button>
      </div>
      <p>{form.show}</p>
    </div>
  )
}
