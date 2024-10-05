import { useState } from 'react'
import { Loading } from '../Components'
import { Link } from 'react-router-dom'

const ReactQuery = () => {
  const [userList] = useState([])
  const [isSuccess] = useState(false)
  const [isError] = useState(false)
  const [isLoading] = useState(false)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h2>Error</h2>
  }

  return (
    <>
      <h1>React Fetch</h1>
      <b style={{ color: 'green', fontSize: '1.5rem' }}>{isSuccess && 'TanStack Success'}</b>
      <ul>
        {userList?.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/react-query/${user.id}`}>{user.name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ReactQuery
