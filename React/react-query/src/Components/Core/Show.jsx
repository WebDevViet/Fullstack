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

{
  /* <Show.When isTrue={status === 'pending'}>
       <p>Loading...</p>
    </Show.When>

<Show.When isTrue={status === 'failed'}>
    <p> <strong>{error}</strong></p>
</Show.When>

<Show.Else>
  <ul>
    {todoList?.map((todo) => (
      <li key={todo.id}>{todo.title}</li>
    ))}
  </ul>
</Show.Else> */
}

// Show When
//  <Show.When isTrue={true}><Component/></Show.When> => return children
//  <Show.When isTrue={false}><Component/></Show.When> => return false

// Show Else
// TH1: <Show.Else><Component/></Show.Else>
// TH2: <Show.Else render={<Component/>}/></Show.Else>
