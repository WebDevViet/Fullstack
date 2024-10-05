import './Menu.css'
import NavItem from './NavItem'

const Menu = () => {
  return (
    <ul className='menu'>
      <NavItem href='/'>Home</NavItem>
      <NavItem href='/about'>About</NavItem>
      <NavItem href='/products'>Products</NavItem>
      <NavItem href='/blog'>Blog</NavItem>
      <NavItem href='/contact'>Contact</NavItem>
      {/* <NavLink href='/profile'>Profile</NavLink>
      <NavLink href='/admin'>Admin</NavLink> */}
    </ul>
  )
}

export default Menu

// TODO: Case 1
// const activeMenu = (value) => {
//   console.log('🚀 ~ activeMenu ~ value:', value)
//   return value.isActive ? 'current' : ''
// }

// className={activeMenu}

// TODO: Case 2
// const activeMenu = (value) => {
//   console.log('🚀 ~ activeMenu ~ value:', value)
//   return value.isActive ? {color: 'red'} : {}
// }

// TODO: Case 3
{
  /* <NavItem href='/'>Home</NavItem>
<NavItem href='/about'>About</NavItem>
<NavItem href='/products'>Products</NavItem>
<NavItem href='/blog'>Blog</NavItem>
<NavItem href='/contact'>Contact</NavItem> */
}
