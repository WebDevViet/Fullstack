## Các keywords sử dụng với Redux Toolkit

- store: được coi như state toàn cục
- reducer: phân biệt action được gửi lên từ hàm dispatch để update state tương ứng trên store
- action: là 1 biến object mô tả hành động {type: string, payload: any}
- dispatch: là 1 hàm có đối số là action, có nhiệm vụ truyền action lên reducer
- slice: nơi khởi tạo reducer trả về reducer store và action creator

## Redux Store

Redux Store là nơi lưu trữ "global data" (store lưu trữ state application)

- Bước 1: [Create a redux store](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-store)

> [!NOTE]
> Với redux toolkit đã auto setup redux devtool, redux thunk

- Bước 2: [Provide the Redux Store to React](https://redux-toolkit.js.org/tutorials/quick-start#provide-the-redux-store-to-react)

  - => nói cho ứng dụng React biết sự tồn tại của Redux Store (không gian lưu trữ Redux)

- Bước 3: Test với Redux dev tool => empty

## Redux Slice

Slide là công cụ giúp cập nhật Redux Store

- Bước 1: [Khai báo slide](https://redux-toolkit.js.org/tutorials/quick-start#create-a-redux-state-slice)

- Bước 2: [Nạp slide vào Store thông qua reducer](https://redux-toolkit.js.org/tutorials/quick-start#add-slice-reducers-to-the-store)

- Bước 3: test với Redux dev tool => hiển thị data trong store

## useSelector - useDispatch

- [Read Redux's State](https://redux-toolkit.js.org/tutorials/quick-start#use-redux-state-and-actions-in-react-components)

### useSelector

- Mục đích: Sử dụng data của Redux bên trong React Component
  => sử dụng useSelector hook
  > [!NOTE]
  > Thay đổi Redux State => component auto render (tương tự props)

### useDispatch - Update Redux's State

- Cập nhật Redux State khi người dùng thực hành động trên giao diện (onClick, onChange...)
- Why? Redux state được cập nhật => giao diện auto cập nhật theo (do sử dụng useSelector)

## Tổng kết cách sử dụng Redux với Redux Toolkit (React)

Tài liệu: https://redux-toolkit.js.org/tutorials/quick-start

Bước 1: Setup Redux Store (nơi lưu trữ data của Redux)

- File store.ts
- configStore làm mọi thứ:
  - Nạp "reducer"
  - Cung cấp "default settings", ví dụ như redux dev tool

Bước 2: Cấu hình React "tiếp nhận" Redux Store

- Update ứng dụng React:
  - Sử dụng `<Provider>` bọc ngoài `<App/>`
  - Cung cấp store: `<Provider store={store}>`

Bước 3: Tạo Redux "slice"

- Thông qua createSlice, gồm có:
  - **name** của slice
  - initial state
  - reducer function => Xuất ra "reducer" và "action"
  - reducer dùng để khai báo tại file "store.ts"
  - actions được dùng tại view (React component)

Bước 4: Sử dụng Redux bên trong ứng dụng

- Read data với useSelector hook
- Update data với:
  - useDispatch và dispatch(actions)
