import { useParams } from 'react-router-dom'

const ProductDetail = () => {
  const { id, slug } = useParams()

  return (
    <>
      <h1>Product Detail</h1>
      <h2>Slug: {slug}</h2>
      <h2>Id: {id}</h2>
    </>
  )
}

export default ProductDetail

// const { path } = useParams()
// const match = path.match(/(.+)-(\d+)$/)
// if (!match) {
//   return <h2>Not found</h2>
// }
// const slug = match[1]
// const id = match[2]
