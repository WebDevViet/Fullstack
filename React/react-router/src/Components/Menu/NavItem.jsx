/* eslint-disable react/prop-types */
import clsx from 'clsx'
import { Link, useMatch, useResolvedPath } from 'react-router-dom'
export default function NavItem({ href, children, className = '', ...props }) {
  //Lấy đường dẫn (pathname) của href
  const { pathname } = useResolvedPath(href) // href: /products?sort=newest => /products
  //So sánh đường dẫn hiện tại với pathname của href
  const match = useMatch({
    path: pathname
  })
  return (
    <li className={clsx(match && 'active', className)}>
      <Link to={href} {...props}>
        {children}
      </Link>
    </li>
  )
}

// <NavLink to='/users' /> => active
// <NavLink to='/users' end /> => no
// <NavLink to='/users/profile' /> => active
