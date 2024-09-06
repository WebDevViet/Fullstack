import { useEffect, useState, useRef } from 'react'

export default function CheckBox() {
  const [state, setState] = useState(true)
  const listCheckbox = ['Checkbox 1', 'Checkbox 2', 'Checkbox 3', 'Checkbox 4']

  const checkAllRef = useRef(null)
  const checkItemRef = useRef([])

  const handleCheckAll = () => {
    checkItemRef.current.forEach((el) => {
      el.checked = checkAllRef.current.checked
    })
  }

  // const getCheckItemRef = (el) => {
  //   if (listCheckbox.length !== checkItemRef.current.length) {
  //     checkItemRef.current.push(el)
  //   }
  // }

  const handleCheckItem = (e) => {
    if (!e.target.checked) return (checkAllRef.current.checked = false)
    checkAllRef.current.checked = checkItemRef.current.every((el) => el.checked)
  }

  useEffect(() => {
    console.log(checkItemRef.current)
  })

  return (
    <div style={{ userSelect: 'none' }}>
      <label>
        <input onChange={handleCheckAll} ref={checkAllRef} type='checkbox' /> Checkbox all
      </label>
      <hr />
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {listCheckbox.map((checkbox, index) => (
          <li key={index}>
            <label>
              <input onChange={handleCheckItem} ref={(el) => (checkItemRef.current[index] = el)} type='checkbox' /> {checkbox}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={() => setState(!state)}>Click me</button>
    </div>
  )
}
