import 'bootstrap/dist/css/bootstrap.min.css'

// import Counter from './components/Counter'
import Todos from './components/Todos/Todos'
import Provider from './store/Provider'

export default function App() {
  return (
    <Provider>
      <div className='container mt-5'>
        {/* <Content /> */}
        {/* <Counter /> */}
        <Todos />
      </div>
    </Provider>
  )
}

//A => B => C => D

//Context

/**
- Khởi tạo đối tượng Context==> Dùng hàm createContext()
- Bọc Component Provider (Của Context) ==> Để gửi dữ liệu vào context
- Lấy dữ liệu từ Context: Dùng component Consumer ( dùng với class Component) hoặc hook useContext
*/
