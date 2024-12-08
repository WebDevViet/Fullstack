# Express Cookie

Trong `express-session`, hai tùy chọn `resave` và `saveUninitialized` có vai trò quan trọng trong cách phiên (session) được lưu trữ và quản lý. Dưới đây là giải thích chi tiết về chúng:

---

### **1. `resave`**

**Ý nghĩa**:

- Tùy chọn này kiểm soát việc session có được lưu lại trong **store** (nơi lưu trữ session, như Redis, MemoryStore, etc.) mỗi khi có một request đến, ngay cả khi session đó **không thay đổi** hay không có cập nhật nào.

**Giá trị**:

- `true` - **default**: Mỗi lần có request, session sẽ được lưu lại vào store **bất kể nội dung có thay đổi hay không**.
- `false`: Session **chỉ được lưu lại** nếu nó thực sự bị thay đổi trong request đó.

**Khi nào nên sử dụng**:

- **Nên để `false`** để tối ưu hiệu suất, tránh ghi đè không cần thiết vào store, đặc biệt khi sử dụng các hệ thống lưu trữ như Redis.
- Chỉ nên để `true` khi bạn sử dụng một số store không kiểm tra được trạng thái thay đổi của session hoặc cần tương thích với các store cũ.

---

### **2. `saveUninitialized`**

**Ý nghĩa**:

- Tùy chọn này kiểm soát việc session **mới (uninitialized)**, tức là session chưa được chỉnh sửa hay ghi dữ liệu nào, có được lưu vào store hay không.

**Giá trị**:

- `true` - **default**: Một session mới sẽ được tạo và lưu vào store ngay cả khi **chưa có dữ liệu nào được thêm vào**.
- `false`: Session mới sẽ **không được lưu** vào store cho đến khi có dữ liệu được thêm vào nó.

**Khi nào nên sử dụng**:

- **Nên để `false`** để giảm số lượng session rỗng được tạo ra, điều này quan trọng trong các hệ thống có lưu lượng truy cập cao hoặc sử dụng store như Redis/MongoDB.
- **Để `true`** khi bạn cần theo dõi mọi session ngay từ khi chúng được khởi tạo, chẳng hạn như khi sử dụng session để quản lý số lượng kết nối của người dùng.

---

### **Kết luận và khuyến nghị**

- **Cấu hình tối ưu phổ biến**:

  ```javascript
  app.use(session({
    secret: 'yourSecretKey',
    resave: false, // Chỉ lưu khi có thay đổi
    saveUninitialized: false, // Không lưu session rỗng
    store: new RedisStore(...), // Hoặc các store phù hợp
    cookie: { secure: true } // Chỉ gửi cookie qua HTTPS
  }));
  ```

- **Tình huống cần bật `true`**:
  - **`resave: true`**: Khi sử dụng các store cũ hoặc không hỗ trợ kiểm tra trạng thái session.
  - **`saveUninitialized: true`**: Khi cần theo dõi tất cả kết nối, kể cả khi chúng chưa thêm dữ liệu.

Việc chọn giá trị đúng giúp tối ưu hiệu năng hệ thống và tiết kiệm tài nguyên cho store lưu trữ session.

Có thể tìm hiểu thêm chi tiết trong tài liệu của [express-session](https://www.npmjs.com/package/express-session).
