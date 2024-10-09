import { useQueries } from '@tanstack/react-query'
import * as Req from '../services/user'

const ReactQueries = () => {
  const queryKeys = [1, 2]

  const queryResults = useQueries({
    queries: queryKeys.map((query) => ({
      queryKey: ['user', query],
      queryFn: async () => (await Req.getUserDetail({ id: query })).data
    }))
  })
  console.log('🚀 ~ QueryClient ~ queryResults:', queryResults)

  return <h1>Queries</h1>
}

export default ReactQueries
