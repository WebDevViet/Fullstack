import PropTypes from 'prop-types'
import styles from './taskList.module.scss'
import { Todo } from '~/@types/todo.type'

interface TaskListProps {
  doneTaskList?: boolean
  todos: Todo[]
  startEditTodo: (id: string) => void
  doneTodo: (id: string) => void
  deleteTodo: (id: string, name: string) => void
}

export default function TaskList({ doneTaskList, todos, startEditTodo, doneTodo, deleteTodo }: TaskListProps) {
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Not completed'}</h2>
      {todos.map((task) => (
        <div className={styles.task} key={task.id}>
          <input
            type='checkbox'
            className={styles.taskCheckbox}
            checked={task.done}
            onChange={() => doneTodo(task.id)}
          />
          <span className={`${styles.taskName} ${doneTaskList ? styles.taskNameDone : ''}`}>{task.name}</span>
          {/* dùng tạm doneTaskList */}
          <div className={styles.taskActions}>
            <button className={styles.taskBtn} onClick={() => startEditTodo(task.id)}>
              🖊️
            </button>
            <button className={styles.taskBtn} onClick={() => deleteTodo(task.id, task.name)}>
              🗑️
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

TaskList.propTypes = {
  doneTaskList: PropTypes.bool
}
