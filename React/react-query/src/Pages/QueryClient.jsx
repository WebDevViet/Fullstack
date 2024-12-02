import { useQueryClient } from '@tanstack/react-query'
import { useQueryUserDetail } from '../Hooks/useQueryUser'

const QueryClient = () => {
  const queryClient = useQueryClient()

  const user1 = queryClient.getQueryData(['user', '1'])
  console.log('🚀 ~ QueryClient ~ user1:', user1)

  const { data } = useQueryUserDetail('1')

  const queries = ['2', '3']

  const userList = queries.map((queryId) => {
    return queryClient.getQueryData(['user', queryId])
  })

  console.log('🚀 ~ userList ~ userList:', userList)

  const allUser = queryClient.getQueriesData()
  console.log('🚀 ~ QueryClient ~ users:', allUser)

  const invalidateQueries = async () => {
    queryClient.invalidateQueries({ queryKey: ['user', '1'] })
    queryClient.invalidateQueries({ queryKey: ['user', '2'] })
  }

  return (
    <>
      <h1>Query Client</h1>
      <button onClick={invalidateQueries}>CLick</button>
      {JSON.stringify(data)}
    </>
  )
}

export default QueryClient

// TODO: Delete data cache
// const handleClearCache = () => {
//   // TH1: Xoá 1 query cache
//   // queryClient.removeQueries({ queryKey: ['user', '1'] })
//   // TH2: Xoá nhiều query cache
//   // queries.forEach((queryKey) => {
//   //   queryClient.removeQueries({ queryKey })
//   // })
//   // TH3: Xoá tất cả query cache
//   // queryClient.removeQueries()
// }

{
  /* <button onClick={handleClearCache}>Clear Cache</button> */
}

// TODO: Prefetch data
// import * as Req from '../services/user'
// import { useEffect } from 'react'

// useEffect(() => {
//   queryClient.prefetchQuery({ queryKey: ['user', 3], queryFn: async () => (await Req.getUserDetail(3)).data })
// }, [])
