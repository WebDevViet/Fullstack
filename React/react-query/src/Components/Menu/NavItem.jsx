/* eslint-disable react/prop-types */
import { NavLink } from 'react-router-dom'
export default function NavItem({ href, children, ...props }) {
  return (
    <li>
      <NavLink to={href} {...props}>
        {children}
      </NavLink>
    </li>
  )
}
