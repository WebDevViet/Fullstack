/* eslint-disable react/prop-types */
import { memo } from 'react'
import students from '../../assets/db.json'

function StudentList({ query = '' }) {
  return (
    <div>
      {students.map((student) => {
        const index = student.fullName.toLowerCase().indexOf(query.toLowerCase())
        if (index === -1) return <p key={student.id}>{student.fullName}</p>

        return (
          <p key={student.id}>
            {student.fullName.slice(0, index)}
            <span style={{ backgroundColor: 'yellow' }}>{student.fullName.slice(index, index + query.length)}</span>
            {student.fullName.slice(index + query.length)}
          </p>
        )
      })}
    </div>
  )
}

export default memo(StudentList)
