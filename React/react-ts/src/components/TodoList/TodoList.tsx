import TaskInput from '@/TaskInput'
import TaskList from '@/TaskList'
import { useEffect, useRef, useState } from 'react'
import { Todo } from '~/@types/todo.type'
import styles from './todoList.module.scss'

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>(JSON.parse(localStorage.getItem('todos') || '[]'))
  const [todoEditing, setTodoEditing] = useState<Todo | null>(null)
  const doneTaskList = todos.filter((task) => task.done)
  const notDoneTaskList = todos.filter((task) => !task.done)

  const addTodo = (name: string) => {
    const newTodo = { name, done: false, id: Date.now().toString() }
    setTodos([...todos, newTodo])
  }

  const startEditTodo = (id: string) => {
    setTodoEditing(todos.find((task) => task.id === id) || null)
  }

  const finishEditTodo = (name: string) => {
    if (!todoEditing) return

    if (name !== todoEditing.name) {
      setTodos(
        todos.map((task) => {
          if (task.id === todoEditing.id) {
            return { ...task, name }
          }
          return task
        })
      )
    }

    setTodoEditing(null)
  }

  const doneTodo = (id: string) => {
    setTodos(
      todos.map((task) => {
        if (task.id === id) {
          return { ...task, done: !task.done }
        }
        return task
      })
    )
  }

  const deleteTodo = (id: string, name: string) => {
    if (!confirm(`Delete todo: ${name}`)) return
    setTodos(todos.filter((task) => task.id !== id))
    if (todoEditing && todoEditing.id === id) setTodoEditing(null)
  }

  const firstRender = useRef(true)

  useEffect(() => {
    if (!firstRender.current) {
      localStorage.setItem('todos', JSON.stringify(todos))
    }
    firstRender.current = false
  }, [todos])

  return (
    <div className={styles.todoList}>
      <div className={styles.todoListContainer}>
        <TaskInput addTodo={addTodo} todoEditing={todoEditing} finishEditTodo={finishEditTodo} />
        <TaskList todos={notDoneTaskList} startEditTodo={startEditTodo} doneTodo={doneTodo} deleteTodo={deleteTodo} />
        <TaskList
          todos={doneTaskList}
          startEditTodo={startEditTodo}
          doneTodo={doneTodo}
          deleteTodo={deleteTodo}
          doneTaskList
        />
      </div>
    </div>
  )
}
