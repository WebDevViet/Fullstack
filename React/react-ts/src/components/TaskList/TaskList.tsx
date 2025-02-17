import styles from './taskList.module.scss'

interface TaskListProps {
  doneTaskList?: boolean
}

export default function TaskList({ doneTaskList }: TaskListProps) {
  return (
    <div className='mb-2'>
      <h2 className={styles.title}>{doneTaskList ? 'Completed' : 'Not completed'}</h2>
      <div className={styles.task}>
        <input
          title={doneTaskList ? 'Undone' : 'Done'}
          type='checkbox'
          className={styles.taskCheckbox}
          checked={doneTaskList}
        />
        <span className={`${styles.taskName} ${doneTaskList ? styles.taskNameDone : ''}`}>ok</span>
        {/* dùng tạm doneTaskList */}
        <div className={styles.taskActions}>
          <button title='Edit' className={styles.taskBtn}>
            🖊️
          </button>
          <button title='Delete' className={styles.taskBtn}>
            🗑️
          </button>
        </div>
      </div>
    </div>
  )
}
