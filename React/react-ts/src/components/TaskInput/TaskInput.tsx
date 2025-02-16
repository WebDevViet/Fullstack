import { useEffect, useState } from 'react'
import styles from './taskInput.module.scss'
import { Todo } from '~/@types/todo.type'

interface TaskInputProps {
  addTodo: (name: string) => void
  finishEditTodo: (name: string) => void
  todoEditing: Todo | null
}

export default function TaskInput({ addTodo, todoEditing, finishEditTodo }: TaskInputProps) {
  const [name, setName] = useState('')

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!name.trim()) return alert('Please enter a caption')

    if (todoEditing) {
      finishEditTodo(name)
    } else {
      addTodo(name)
    }

    setName('')
  }

  const cancelEdit = () => {
    if (todoEditing) {
      finishEditTodo(todoEditing.name)
    }

    setName('')
  }

  useEffect(() => {
    if (todoEditing) {
      setName(todoEditing.name)
    }
  }, [todoEditing])

  return (
    <div className='mb-2'>
      <h1 className={styles.title}>To do list typescript</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type='text' placeholder='caption goes here' onChange={(e) => setName(e.target.value)} value={name} />
        <button title={todoEditing ? 'Save' : 'Add'} type='submit'>
          {todoEditing ? '✅' : '➕'}
        </button>
        {todoEditing && <button onClick={cancelEdit}>❌</button>}
      </form>
    </div>
  )
}
