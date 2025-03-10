import 'bootstrap/dist/css/bootstrap.min.css'

// import Counter from './components/Counter'
// import Todos from './components/Todos/Todos'
// import PostList from './components/Post/PostList'
import Authen from './components/Auth/Authen'

export default function App() {
  return (
    <div className='container mt-5'>
      {/* <Counter /> */}
      {/* <Todos /> */}
      {/* <PostList /> */}
      <Authen />
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
