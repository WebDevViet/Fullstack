# Express

**1. `app.use(express.json())`**

Dòng này cho phép ứng dụng Express.js nhận và xử lý dữ liệu JSON từ request body. Khi client gửi request đến server với dữ liệu JSON trong body, Express.js sẽ tự động parse dữ liệu đó thành đối tượng JavaScript, giúp bạn dễ dàng truy cập và xử lý dữ liệu.

**2. `app.use(express.urlencoded({ extended: false }))`**

Dòng này cho phép ứng dụng Express.js nhận và xử lý dữ liệu từ form (URL-encoded) từ request body. Khi client gửi request đến server với dữ liệu từ form, Express.js sẽ tự động parse dữ liệu đó thành đối tượng JavaScript.

Cụ thể, `express.urlencoded()` là một middleware giúp parse dữ liệu từ form thành đối tượng JavaScript. Đối số `{ extended: false }` có nghĩa là chỉ cho phép parse dữ liệu từ form với định dạng `application/x-www-form-urlencoded`. Nếu bạn muốn cho phép parse dữ liệu từ form với định dạng `multipart/form-data` (ví dụ: file upload), bạn cần thiết lập `extended: true`.

**3. `app.use(cookieParser())`**

Dòng này cho phép ứng dụng Express.js nhận và xử lý cookie từ request. `cookieParser()` là một middleware giúp parse cookie từ request thành đối tượng JavaScript, giúp bạn dễ dàng truy cập và xử lý cookie.

Tóm lại, ba dòng code này giúp ứng dụng Express.js nhận và xử lý dữ liệu từ request body, form và cookie, giúp bạn dễ dàng xây dựng ứng dụng web với Express.js.

**4. `app.use(logger('dev'))`**

Đây là một phần của ứng dụng Express.js, và nó được sử dụng để thiết lập một middleware cho việc logging (ghi lại) thông tin về các request và response.

Cụ thể, `app.use(logger('dev'))` sử dụng middleware `logger` từ package `morgan` (một package logging phổ biến cho Node.js) để ghi lại thông tin về các request và response.

Đoạn code này có nghĩa là:

- `logger`: là middleware logging từ package `morgan`.
- `'dev'`: là chế độ logging, trong trường hợp này là `dev` (development). Có các chế độ logging khác như `combined`, `common`, `short`, `tiny`,...

Khi sử dụng `logger('dev')`, middleware sẽ ghi lại thông tin về các request và response, bao gồm:

- Phương thức request (GET, POST, PUT, DELETE,...)
- Đường dẫn URL của request
- Mã trạng thái response (200, 404, 500,...)
- Thời gian thực hiện request
- Kích thước response

Thông tin này sẽ được ghi lại trong console (trình điều khiển) khi ứng dụng Express.js chạy ở chế độ phát triển (development).

Ví dụ, khi bạn chạy ứng dụng Express.js và gửi một request GET đến `/`, middleware logging sẽ ghi lại thông tin như sau:

```
GET / 200 10.123 ms - 12
```

Trong đó:

- `GET`: phương thức request
- `/`: đường dẫn URL của request
- `200`: mã trạng thái response
- `10.123 ms`: thời gian thực hiện request
- `12`: kích thước response (bytes)

Tóm lại, dòng code `app.use(logger('dev'))` giúp bạn dễ dàng theo dõi và debug ứng dụng Express.js bằng cách ghi lại thông tin về các request và response.
