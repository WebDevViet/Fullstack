// import { Fragment } from 'react'

import User from './components/User'
import Avatar from './components/Avatar'

// const users = [
//   { id: 1, name: 'John' },
//   { id: 2, name: 'Jane' },
//   { id: 3, name: 'Jim' }
// ]

// rfc
export default function App() {
  const handleClick = (e) => {
    console.log('🚀 ~ handleClick ~ e:', e.target.innerText)
  }

  return (
    <>
      <h1>Học React không khó</h1>
      <button onClick={handleClick}>Click me</button>
      <button onClick={(e) => handleClick(e, 'abc')}>Click me 2</button>
      {/* {users.map((user) => (
        <Fragment key={user.id}>
          <h3>Name:</h3>
          <div>{user.name}</div>
        </Fragment>
      ))} */}

      <User name='John' age='18' onClick={handleClick}>
        <Avatar src='https://picsum.photos/200' />
      </User>

      {/* <User name='Max' age='20' eventClick={handleClick} /> */}
    </>
  )
}

// rfce

// function App() {
//   return (
//     <div>App</div>
//   )
// }

// export default App

// rafc

// export const App = () => {
//   return (
//     <div>App</div>
//   )
// }

// rafce

// const App = () => {
//   return <div>App</div>
// }

// export default App
