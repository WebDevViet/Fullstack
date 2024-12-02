import { useNavigate, useParams } from 'react-router-dom'
import { Loading } from '../Components'
import { useQueryUserDetail } from '../Hooks/useQueryUser'

const UserDetail = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const {
    data: { name, email, status },
    isLoading,
    isError
  } = useQueryUserDetail(id, { enabled: !!id })

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h2>Error</h2>
  }

  return (
    <>
      <h1>User Detail</h1>
      <a></a>
      <ul>
        <li>
          <b>Name:</b> {name}
        </li>
        <li>
          <b>Email:</b> {email}
        </li>
        <li>
          <b>Status:</b> {status}
        </li>
      </ul>
      <button onClick={() => navigate(-1)}>Back</button>
    </>
  )
}

export default UserDetail
