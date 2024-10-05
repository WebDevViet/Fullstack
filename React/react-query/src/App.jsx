import { Route, Routes } from 'react-router-dom'
import { Home, ReactFetch, ReactQuery, UserDetail } from './Pages'
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
          <Route path='/react-query' element={<ReactQuery />} />
          <Route path='/react-query/:id' element={<UserDetail />} />
          <Route path='/react-fetch' element={<ReactFetch />} />
        </Routes>
      </main>
    </>
  )
}

export default App
