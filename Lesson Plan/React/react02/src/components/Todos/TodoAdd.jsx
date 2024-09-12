import { useState } from 'react'
import { useDispatch } from '../../store/hook'
import { addTodo } from '../../store/actions/todosActions'

export default function TodoAdd() {
  const [form, setForm] = useState({
    todo: ''
  })

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.todo) {
      return alert('Please enter a todo')
    }

    dispatch(addTodo(form.todo))
    setForm({
      todo: ''
    })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name='todo' onChange={handleChange} type='text' value={form.todo} />
        <button>Add</button>
      </form>
    </div>
  )
}
