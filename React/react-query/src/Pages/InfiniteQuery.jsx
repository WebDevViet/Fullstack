import { Link } from 'react-router-dom'
import { Loading } from '../Components'
import { useInfiniteQueryUserList } from '../Hooks/useQueryUser'

const InfiniteQuery = () => {
  // const { data, isLoading, isError, fetchNextPage, hasNextPage } = useInfiniteQueryUserList()

  const { data, isLoading, isError, fetchPreviousPage, hasPreviousPage } = useInfiniteQueryUserList({
    initialPageParam: 0
  })

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
        {/* <button disabled={!hasNextPage} onClick={fetchNextPage}> */}
        <button disabled={!hasPreviousPage} onClick={fetchPreviousPage}>
          Load More
        </button>
      </div>
    </>
  )
}

export default InfiniteQuery

{
  /* {data?.pages.map((page) => {
          return page.data.map((user) => {
            return (
              <li key={user.id}>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </li>
            )
          })
        })} */
}
