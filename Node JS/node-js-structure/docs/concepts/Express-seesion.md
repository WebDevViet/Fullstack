# Express Cookie

Trong `express-session`, hai tùy chọn `resave` và `saveUninitialized` có ý nghĩa quan trọng trong việc quản lý phiên làm việc (session):

1. **`resave`**:

   - **Mô tả**: Tùy chọn này xác định liệu phiên làm việc có được lưu lại vào store mỗi khi có yêu cầu đến hay không, ngay cả khi phiên làm việc không thay đổi.
   - **Giá trị**: `true` hoặc `false`.
   - **Mặc định**: `true` (nhưng đã bị khuyến cáo không nên dùng mặc định này).
   - **Sử dụng**: Đặt `resave: false` nếu store của bạn hỗ trợ phương thức `touch` (cập nhật thời gian hết hạn mà không thay đổi dữ liệu phiên làm việc). Điều này giúp tránh các điều kiện đua (race conditions) khi có nhiều yêu cầu đồng thời.

2. **`saveUninitialized`**:
   - **Mô tả**: Tùy chọn này xác định liệu phiên làm việc mới (chưa được khởi tạo) có được lưu vào store hay không. Một phiên làm việc được coi là chưa khởi tạo khi nó mới được tạo ra nhưng chưa có bất kỳ thay đổi nào.
   - **Giá trị**: `true` hoặc `false`.
   - **Mặc định**: `true` (nhưng đã bị khuyến cáo không nên dùng mặc định này).
   - **Sử dụng**: Đặt `saveUninitialized: false` để giảm thiểu việc lưu trữ không cần thiết và tuân thủ các quy định về quyền riêng tư (ví dụ: không lưu cookie khi chưa có sự đồng ý của người dùng).

### Lưu ý

- **`resave: false`**: Giúp giảm tải cho store và tránh các vấn đề liên quan đến điều kiện đua.
- **`saveUninitialized: false`**: Giúp giảm thiểu việc lưu trữ không cần thiết và tuân thủ các quy định về quyền riêng tư.

Có thể tìm hiểu thêm chi tiết trong tài liệu của [express-session](https://www.npmjs.com/package/express-session).

### Ví dụ cấu hình

```javascript
const session = require('express-session')

app.use(
  session({
    secret: 'keyboard cat',
    resave: false, // Không lưu lại phiên làm việc nếu không có thay đổi
    saveUninitialized: false, // Không lưu phiên làm việc mới nếu chưa có thay đổi
    cookie: { secure: true } // Chỉ gửi cookie qua HTTPS
  })
)
```
