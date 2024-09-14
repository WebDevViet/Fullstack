import { forwardRef, useId, useImperativeHandle, useRef } from 'react'

/* eslint-disable react/prop-types */
export default forwardRef(function Input({ type = 'text', label, name, value = '', onChange = () => {} }, ref) {
  const id = useId()
  const inputRef = useRef()

  useImperativeHandle(ref, () => ({
    get value() {
      return inputRef.current.value
    },

    set value(value) {
      inputRef.current.value = value
    },

    set placeholder(value) {
      inputRef.current.placeholder = value
    }
  }))
  return (
    <div>
      <label htmlFor={id}>{label}</label>
      <input type={type} name={name} value={value} onChange={onChange} placeholder={`${label}...`} id={id} ref={inputRef} />
    </div>
  )
})
