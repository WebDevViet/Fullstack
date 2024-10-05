import { useEffect, useState } from 'react'

import { Loading } from '../Components'
import * as Req from '../services/user'

const ReactFetch = () => {
  const [userList, setUserList] = useState([])
  const [isSuccess, setIsSuccess] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllPost = async () => {
    setIsLoading(true)
    try {
      const res = await Req.getUserList()
      if (res?.status !== 200) throw new Error()
      setUserList(res.data)
      setIsSuccess(true)
    } catch {
      setIsError(true)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchAllPost()
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
      <b style={{ color: 'green', fontSize: '1.5rem' }}>{isSuccess && 'Fetch Success'}</b>
      <ul>
        {userList?.map((user) => {
          return <li key={user.id}>{user.name}</li>
        })}
      </ul>
    </>
  )
}

export default ReactFetch
