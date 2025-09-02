### **Cú pháp chuẩn cho key của Header và Cookie**

Cả **header** và **cookie** trong HTTP đều có quy tắc đặt tên chuẩn để đảm bảo tính tương thích và bảo mật.

---

### **1. Cú pháp chuẩn cho Header**

- **Tên header** thường sử dụng **Pascal-Case** (viết hoa chữ cái đầu mỗi từ).
- **Không chứa dấu cách**, thay vào đó dùng dấu gạch ngang (`-`).
- **Không phân biệt chữ hoa/thường**, nhưng thông thường viết theo Pascal-Case để dễ đọc.

**Ví dụ chuẩn của header:**

```http
Content-Type: application/json
Authorization: Bearer <token>
X-API-Key: abc123
```

**Lưu ý:**

- Các header bắt đầu bằng `X-` thường là header tùy chỉnh (custom headers).
- Một số header phổ biến như `Authorization`, `Content-Type`, `Accept`, `User-Agent` có quy tắc riêng.

---

### **2. Cú pháp chuẩn cho Cookie**

- **Tên cookie** thường viết theo **camelCase** hoặc **snake_case**.
- **Không chứa dấu cách**, có thể dùng dấu gạch dưới (`_`) hoặc dấu gạch ngang (`-`).
- **Không phân biệt chữ hoa/thường**, nhưng thường viết chữ thường để tránh lỗi.

**Ví dụ chuẩn của cookie:**

```http
Set-Cookie: session_id=abc123; Path=/; HttpOnly; Secure
Set-Cookie: user_pref=dark_mode; Max-Age=3600; SameSite=Strict
```

**Lưu ý:**

- Cookie có thể chứa các thuộc tính như `HttpOnly`, `Secure`, `SameSite`, `Max-Age`, `Expires`.
- `HttpOnly` giúp ngăn JavaScript truy cập cookie, tăng cường bảo mật.
- `Secure` yêu cầu cookie chỉ được gửi qua HTTPS.

---

### **3. Tiêu chuẩn RFC**

- **Header** tuân theo tiêu chuẩn **RFC 7231** (HTTP/1.1).
- **Cookie** tuân theo tiêu chuẩn **RFC 6265**, định nghĩa cách trình duyệt và server xử lý cookie.

Bạn đang muốn áp dụng quy tắc này vào một dự án cụ thể không? 🚀
