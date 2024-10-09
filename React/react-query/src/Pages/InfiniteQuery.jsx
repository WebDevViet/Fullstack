import { Link } from 'react-router-dom'
import { useInfiniteQueryUserList } from '../Hooks/useQueryUser'
import { Loading } from '../Components'

const InfiniteQuery = () => {
  const { data, isLoading, isError, fetchNextPage, hasNextPage, ...rest } = useInfiniteQueryUserList()
  console.log('🚀 ~ InfiniteQuery ~ rest:', rest)
  console.log('🚀 ~ Home ~ data:', data)

  if (isLoading) {
    return <Loading />
  }

  if (isError) {
    return <h2>Error</h2>
  }

  return (
    <>
      <h1>Infinite Query</h1>
      <ul>
        {data?.map((user) => {
          return (
            <li key={user.id}>
              <Link to={`/users/${user.id}`}>{user.name}</Link>
            </li>
          )
        })}
      </ul>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Load More
        </button>
      </div>
    </>
  )
}

export default InfiniteQuery

// {
//   data?.pages.map((page) => {
//     return page.data.map((user) => {
//       return (
//         <li key={user.id}>
//           <Link to={`/users/${user.id}`}>{user.name}</Link>
//         </li>
//       )
//     })
//   })
// }
