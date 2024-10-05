import _ from 'lodash'
import { useState } from 'react'
import { createSearchParams, Route, Routes, useNavigate } from 'react-router-dom'
import ProductDetail from './ProductDetail'

const Products = () => {
  const [form, setForm] = useState({})
  const navigate = useNavigate()

  const handleChange = ({ target: { name, value } }) => {
    setForm({
      ...form,
      [name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    const searches = _.omitBy(form, (value) => value === '')

    navigate({
      pathname: '/blog',
      search: createSearchParams(searches).toString()
    })
  }

  return (
    <>
      <h1>Product</h1>
      <form action='' onSubmit={handleSubmit}>
        <input type='text' name='search' onChange={handleChange} placeholder='Search info product in blog' />
        <div>
          <select name='sort' onChange={handleChange}>
            <option value=''>Tìm theo từ khoá liên quan</option>
            <option value='newest'>Newest</option>
            <option value='oldest'>Oldest</option>
          </select>
        </div>
        <button>Search</button>
      </form>
      <Routes>
        <Route path=':id'>
          <Route index element={<ProductDetail />} />
          <Route path=':slug' element={<ProductDetail />} />
        </Route>
      </Routes>
    </>
  )
}

export default Products

// navigate({
//   pathname: '/products',
//   search: '?sort=newest'
// })

// const searches = Object.keys(form).reduce((acc, key) => {
//   if (form[key] !== '') {
//     acc[key] = form[key]
//   }
//   return acc
// }, {})

// navigate({
//   pathname: '/blog',
//   search: createSearchParams(searches).toString()
// })
