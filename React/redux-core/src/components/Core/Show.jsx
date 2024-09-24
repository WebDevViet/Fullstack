import { Children } from 'react'

const Show = ({ children }) => {
  let when, otherwise

  Children.forEach(children, (child) => {
    if (child.props.isTrue === void 0) {
      otherwise = child
    } else if (!when && child.props.isTrue === true) {
      when = child
    }
  })

  return when || otherwise
}

export default Show

Show.When = ({ isTrue, children }) => isTrue && children
Show.Else = ({ render, children }) => render || children
