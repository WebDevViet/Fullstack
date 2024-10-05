import { useQueryUsers } from '../Hooks/queryUser'

const Home = () => {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isFetchNextPageError } = useQueryUsers()
  console.log('🚀 ~ Home ~ data:', data)
  // console.log('🚀 ~ Home ~ hasNextPage:', hasNextPage)
  // console.log('🚀 ~ Home ~ isFetchingNextPage:', isFetchingNextPage)
  // console.log('🚀 ~ Home ~ isFetchNextPageError:', isFetchNextPageError)

  return (
    <>
      <h1>Home</h1>
      <div>
        <button disabled={!hasNextPage} onClick={fetchNextPage}>
          Next
        </button>
      </div>
    </>
  )
}

export default Home
