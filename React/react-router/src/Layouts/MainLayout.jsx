import { Outlet } from 'react-router-dom'
import { Menu } from '../Components/Menu'

const MainLayout = () => {
  return (
    <>
      <header>
        <Menu />
      </header>
      <main>
        <Outlet />
      </main>
    </>
  )
}

export default MainLayout
