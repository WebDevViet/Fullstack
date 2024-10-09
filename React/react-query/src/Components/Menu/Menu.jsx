import './Menu.css'
import NavItem from './NavItem'

const Menu = () => {
  return (
    <ul className='menu'>
      <NavItem href='/react-fetch'>React Fetch</NavItem>
      <NavItem href='/'>Home</NavItem>
      <NavItem href='/react-query'>React Query</NavItem>
      {/* <NavItem href='/react-queries'>React Queries</NavItem> */}
      {/* <NavItem href='/infinite-query'>Infinite Query</NavItem> */}
      <NavItem href='/query-client'>Query Client</NavItem>
    </ul>
  )
}

export default Menu
