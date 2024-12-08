# Express File Upload

```javascript
app.use(
  fileUpload({
    limits: { fileSize: 1024 * 1024 * 5 }, // giới hạn kích thước file là 5MB
    abortOnLimit: true,
    limitHandler: (req, res) => {
      res.status(400).json({ message: 'File size too large' })
    },
    useTempFiles: true,
    tempFileDir: '/tmp/'
  })
)
```

Giải thích các tùy chọn cấu hình:

- `limits: { fileSize: 5 * 1024 * 1024 }`: Giới hạn kích thước file là 5MB. Tùy theo nhu cầu, bạn có thể điều chỉnh giới hạn này.
- `abortOnLimit`: Ngừng quá trình tải lên nếu kích thước file vượt quá giới hạn.
- `responseOnLimit`: Thông báo cho client khi kích thước file vượt quá giới hạn.
- `useTempFiles` và `tempFileDir`: Sử dụng thư mục tạm để lưu trữ các file tạm thời.
- `limitHandler`: callback này sẽ chạy khi file vượt quá giới hạn.

Ngoài ra, bạn cần đảm bảo rằng thư mục `uploads` tồn tại và có quyền ghi để lưu trữ file đã tải lên. Bạn có thể tạo thư mục này nếu chưa tồn tại:

```bash
mkdir uploads
```