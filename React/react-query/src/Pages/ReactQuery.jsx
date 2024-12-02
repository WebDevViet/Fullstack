import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Loading } from '../Components'
import { useQueryUserList } from '../Hooks/useQueryUser'

const ReactQuery = () => {
  const { data: userList, isLoading, isError, isSuccess } = useQueryUserList()

  useEffect(() => {
    return () => {
      //cleanup
    }
  }, [])

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
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default ReactQuery
