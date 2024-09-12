import 'bootstrap/dist/css/bootstrap.min.css'
import { useSelector } from './store/hook'
import Login from './components/Auth/Login'
import Profile from './components/Auth/Profile'

// import Counter from './components/Counter'
// import PostList from './components/Post/PostList'

export default function App() {
  const auth = useSelector((state) => state.auth)
  return (
    <div className='container mt-5'>
      {/* <Counter /> */}
      {/* <Todos /> */}
      {/* <PostList /> */}
      {auth.user ? <Profile /> : <Login />}
    </div>
  )
}

//A => B => C => D

//Context

/**
- Khởi tạo đối tượng Context==> Dùng hàm createContext()
- Bọc Component Provider (Của Context) ==> Để gửi dữ liệu vào context
- Lấy dữ liệu từ Context: Dùng component Consumer ( dùng với class Component) hoặc hook useContext
*/
