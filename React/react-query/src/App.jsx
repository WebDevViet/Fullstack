import { Route, Routes } from 'react-router-dom'
import { Home, ReactFetch, InfiniteQuery, ReactQuery, UserDetail, QueryClient, ReactQueries, Mutation } from './Pages'
import { Menu } from './Components'

const App = () => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/react-fetch' element={<ReactFetch />} />
          <Route path='/react-query' element={<ReactQuery />} />
          <Route path='/react-queries' element={<ReactQueries />} />
          <Route path='/users/:id' element={<UserDetail />} />
          <Route path='/infinite-query' element={<InfiniteQuery />} />
          <Route path='/query-client' element={<QueryClient />} />
          <Route path='/mutation' element={<Mutation />} />
        </Routes>
      </main>
    </>
  )
}

export default App
