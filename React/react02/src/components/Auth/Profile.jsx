import { useSelector } from '../../store/hook'

export default function Profile() {
  const profile = useSelector((state) => state.authen.user)
  return (
    <>
      <h1>Welcome Back</h1>
      <p>Hello {profile.name}</p>
      <button>Logout</button>
    </>
  )
}
