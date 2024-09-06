import React from 'react'
import { createRoot } from 'react-dom/client'

const rootEL = document.getElementById('root')

// const h1 = React.createElement('h1', { className: 'title', id: 'title' }, 'Học React không khó')

// const h2 = React.createElement(
//   'h2',
//   { className: 'sub-title', style: { color: 'red', backgroundColor: 'yellow' } },
//   'Học react khó vc',
//   React.createElement(
//     'a',
//     {
//       href: 'https://reactjs.org/',
//       target: '_blank',
//       rel: 'noreferrer'
//     },
//     'url bên ngoài'
//   )
// )

//JSX (Javascript XML) ==> Javascript Compiler (SWC, Babel) ==> React Element ==> HTML

/**
 * Gợi ý: spread
 * for
 *
 *
 * Tạo thẻ ul trước thẻ h2
 *
 * <ul>
 *    <li>Nội dung 1</li>
 *    <li>Nội dung 2</li>
 *    ...
 *    <li>Nội dung 100</li>
 * </ul>
 */

const str = '<em>Phuc pro 123</em>'
const jsx = <p>Một pha tự huỷ của Bray</p>
const users = ['user 1', 'user 2', 'user 3', 'user 4', 'user 5']
const getContent = () => {
  return <h2>Nội dung từ hàm</h2>
}

class ClassCompo extends React.Component {
  render() {
    return <h2>Class Component</h2>
  }
}

const FunctionCompo = () => {
  return <h2>Function Component</h2>
}

const eElement = (
  <div>
    <h1 id='title' className='title'>
      Học React không khó
    </h1>

    {/* string */}
    {str}
    <h2 id='sub-title'>Học react khó vc</h2>

    {/* JSX */}
    {jsx}

    {/* Function */}
    {getContent()}

    {/* Array */}
    <ul>
      {users.map((user, index) => {
        return <li key={index}>{user}</li>
      })}
    </ul>

    {/* Component */}
    <ClassCompo />
    <FunctionCompo></FunctionCompo>

    <p>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero natus suscipit aut autem nemo dicta eligendi. Amet, enim
      quod? Quisquam sit libero odio laudantium dolorum iusto consectetur rem eius animi!
    </p>
  </div>
)

console.log('🚀 ~ eElement:', eElement)

createRoot(rootEL).render(eElement)
