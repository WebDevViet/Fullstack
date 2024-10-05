import './Menu.css'
import NavItem from './NavItem'

const Menu = () => {
  return (
    <ul className='menu'>
      <NavItem href='/'>Home</NavItem>
      <NavItem href='/react-query'>React Query</NavItem>
      <NavItem href='/react-fetch'>React Fetch</NavItem>
    </ul>
  )
}

export default Menu
