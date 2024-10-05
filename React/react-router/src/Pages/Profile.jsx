import { useOutletContext } from 'react-router-dom'

const Profile = () => {
  const context = useOutletContext()

  return (
    <>
      <h1>Profile</h1>
      <h2>{JSON.stringify(context)}</h2>
    </>
  )
}

export default Profile
