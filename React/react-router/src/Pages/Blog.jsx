import { useSearchParams } from 'react-router-dom'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const page = searchParams.get('page')
  const limit = searchParams.get('limit')
  const handleClick = () => {
    const sParams = {}

    Array.from(searchParams).forEach(([key, value]) => {
      if (!sParams[key]) {
        sParams[key] = value
      } else {
        if (typeof sParams[key] === 'string') {
          sParams[key] = [sParams[key]]
        }
        sParams[key].push(value)
      }
    })
    sParams.page ??= 0
    sParams.limit ??= 10
    sParams.page++
    setSearchParams(sParams)
  }

  return (
    <div>
      <h1>Blog</h1>
      <h2>Page: {page}</h2>
      <h2>Limit: {limit}</h2>
      <button onClick={handleClick}>Click me</button>
    </div>
  )
}

export default Blog

// const categories = searchParams.getAll('category')
// const categories = searchParams.getAll("category");
// const params = {}
// Array.from(searchParams).forEach(([key, value]) => {
//   if (!params[key]) {
//     params[key] = value
//   } else {
//     if (typeof params[key] === 'string') {
//       params[key] = [params[key]]
//     }
//     params[key].push(value)
//   }
// })
