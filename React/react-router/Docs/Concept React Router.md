# React Router

Thường sẽ có 2 loại chính:

- Browser Router ==> Có sự hỗ trợ của server (Rewrite URL)
- Hash Router ==> Không cần hỗ trợ của server (Thông qua #)

## Nested Router

- Kỹ thuật gom nhóm Route
- Dễ quản lý, thay đổi
- Dễ dàng tạo layout cho 1 nhóm
- Dễ dàng private

- Các điều kiện có thể nhóm các route
  - Chung tiền tố (/route)
  - Chung chức năng
  - Chung private
  - Chung layout

## Private Router

- Bảo vệ Router khỏi các truy cập trái phép
- Bảo vệ bằng 1 hoặc 1 số component ==> gọi Middleware

Request ==> Router ==> Middleware ==> Component

## Phân biệt một số loại Router Component

### BrowsersRouter

99% anh em sẽ dùng `<BrowsersRouter>`, được build trên history API của trình duyệt, dùng để lưu trữ URL và chuyển trang.

Ví dụ:

Đối với SPA thì server sẽ cấu hình là khi bạn nhập url nào thì server cũng trả về url nhắm đến file `index.html`, ví dụ `/`.

Khi enter url `https://react.com/about` vào trình duyệt, server nhận được url là `https://react.com/about` và sẽ trả về nội dụng là file `index.html`. Lúc này React Router sẽ đảm nhiệm việc hiển thị component cho đúng tùy vào url.

Tóm lại khi dùng BrowserRouter, quy trình hoạt động như sau:

1. Người dùng nhập URL https://hospital.com/manager
2. Trình duyệt gửi yêu cầu đến server
3. Server trả về trang index.html
4. React Router được kích hoạt trên client-side
5. React Router sử dụng lịch sử trình duyệt để xác định trang hiện tại
6. React Router hiển thị component tương ứng với trang hiện tại

### HashRouter

HashRouter dùng dấu `#` trong URL ví dụ: `https://react.com/#/about`, `https://react.com/#/blog/hoc-react-nhu-the-nao`.

Lợi ích của việc thêm dấu `#` vào url là để server không nhận biết được chúng ta vào url nào. Khi anh em nhập các url ở ví dụ trên vào trình duyệt và nhấn enter thì trình duyệt chỉ gửi lên server là `https://react.com` và server chỉ nhận được là `https://react.com`.

Điều này khá hữu ích khi server anh em là một share hosting và không toàn quyền điều hành server.

Ví dụ:

Có một server được cấu hình cho nhiều dịch vụ, mỗi dịch vụ là một url khác nhau.

- Landing Page cho user: `https://hospital.com`
- Manager: `https://hospital.com/manager`
- Doctor: `https://hospital.com/doctor`
- Staff: `https://hospital.com/staff`

Mình đảm nhiệm thiết kế một Landing Page cho user là một SPA có nhiều trang trong đó, và chỉ được cấp cho url là `https://hospital.com`.

Bây giờ nếu mình thiết kế thêm url `/manager` là dành cho việc quản lý profile cá nhân của người dùng

- BrowsersRouter: người dùng enter url `https://hospital.com/manager` thì server sẽ trả về trang của manager (người quản lý), điều này không tốt!

- HashRouter: người dùng enter url `https://hospital.com/#/manager` thì server sẽ trả về trang `https://hospital.com`, lúc này React Router sẽ thực hiện hiển thị cho đúng trang `/manager`.

### MemoryRouter

MemoryRouter lưu trữ url vào một array. Không như `<BrowserHistory>` và `<HashRouter>`, nó không bị ràng buộc bởi history stack trong trình duyệt. Điều này rất hữu ích khi viết unit test cho React Router.

### Router

Đây là cấp thấp nhất của tất cả Router component, tức là các Router component như `BrowsersRouter` hay `HashRouter` đều được build nên từ `Router` này.

Bạn không cần dùng Router, thay vì đó dùng các Router cấp cao hơn như `BrowsersRouter`

### StaticRouter

StaticRouter dùng để render React Router trong môi trường nodejs, phục vụ cho việc Server Side Rendering

## Rewrite URL

`RewriteURL` là một kỹ thuật được sử dụng trong `BrowserRouter` để giúp server trả về trang `index.html` cho bất kỳ URL nào được yêu cầu.

Khi người dùng nhập URL `https://hospital.com/manager`, trình duyệt sẽ gửi yêu cầu đến server và server sẽ nhận được URL này. Nếu server không được cấu hình để sử dụng `RewriteURL`, nó sẽ trả về lỗi 404 (Not Found) vì không có trang nào có URL `https://hospital.com/manager`.

Tuy nhiên, nếu server được cấu hình để sử dụng `RewriteURL`, nó sẽ tự động chuyển hướng yêu cầu đến trang `index.html` thay vì trả về lỗi 404. Điều này giúp React Router có thể quản lý việc điều hướng giữa các trang trên client-side.

`RewriteURL` giúp ích gì?

- Giúp server trả về trang `index.html` cho bất kỳ URL nào được yêu cầu, giúp React Router có thể quản lý việc điều hướng giữa các trang trên client-side.
- Giúp tránh lỗi 404 (Not Found) khi người dùng nhập URL không tồn tại trên server.
- Giúp ứng dụng SPA hoạt động đúng cách, vì React Router có thể tự động hiển thị trang tương ứng với URL được yêu cầu.

Ví dụ, nếu server được cấu hình để sử dụng `RewriteURL`, nó sẽ chuyển hướng yêu cầu như sau:

- `https://hospital.com/manager` -> `https://hospital.com/index.html`
- `https://hospital.com/doctor` -> `https://hospital.com/index.html`
- `https://hospital.com/staff` -> `https://hospital.com/index.html`

Sau đó, React Router sẽ tự động hiển thị trang tương ứng với URL được yêu cầu trên client-side.
