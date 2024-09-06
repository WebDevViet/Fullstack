/* eslint-disable react/prop-types */
const User = ({ name, age, onClick, children }) => {
  return (
    <>
      <h2>{name}</h2>
      {children}
      <p>Age: {age}</p>
      <button onClick={onClick}>Contact</button>
    </>
  )
}

export default User
