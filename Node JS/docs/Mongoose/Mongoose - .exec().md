Trong **Mongoose**, sự khác biệt giữa việc **có dùng `.exec()`** và **không dùng `.exec()`** liên quan đến cách xử lý **queries** (truy vấn) và **promises**. Dưới đây là giải thích chi tiết và khi nào nên sử dụng `.exec()`.

---

### **1. Không dùng `.exec()`**

Khi bạn **không gọi `.exec()`**, Mongoose sẽ tự động trả về một **promise-like object**, cho phép bạn sử dụng các phương thức như `.then()` và `.catch()`.

#### **Cách sử dụng:**

```javascript
const user = await User.findOne({ email: 'example@gmail.com' })
console.log(user)
```

Hoặc:

```javascript
User.findOne({ email: 'example@gmail.com' })
  .then((user) => console.log(user))
  .catch((err) => console.error(err))
```

#### **Đặc điểm:**

1. **Trả về promise-like object**:

   - Truy vấn sẽ được thực thi khi bạn gọi `.then()`, `.catch()`, hoặc sử dụng `await`.

2. **Dễ sử dụng**:

   - Không cần gọi thêm `.exec()`, tiện lợi cho các truy vấn đơn giản.

3. **Giới hạn**:
   - Nếu bạn muốn thực hiện thêm xử lý đặc biệt với query (như các callback của `.exec()`), bạn không thể làm điều đó mà không gọi `.exec()`.

---

### **2. Dùng `.exec()`**

Khi bạn **gọi `.exec()`**, truy vấn sẽ được chuyển đổi thành một **Promise thực sự**. Điều này mang lại sự rõ ràng hơn và hỗ trợ nhiều tính năng bổ sung.

#### **Cách sử dụng:**

```javascript
const user = await User.findOne({ email: 'example@gmail.com' }).exec()
console.log(user)
```

Hoặc:

```javascript
User.findOne({ email: 'example@gmail.com' })
  .exec()
  .then((user) => console.log(user))
  .catch((err) => console.error(err))
```

#### **Đặc điểm:**

1. **Trả về một Promise chuẩn**:

   - `.exec()` trả về một **Promise thực sự** (không chỉ là promise-like object). Điều này giúp bạn làm việc rõ ràng hơn với các thư viện hoặc công cụ yêu cầu Promise chuẩn.

2. **Cần thiết trong một số trường hợp**:

   - **Callback truyền thống**: `.exec()` hỗ trợ truyền callback như một tham số:
     ```javascript
     User.findOne({ email: 'example@gmail.com' }).exec((err, user) => {
       if (err) console.error(err)
       else console.log(user)
     })
     ```

3. **Tăng tính rõ ràng**:
   - Việc gọi `.exec()` rõ ràng đánh dấu rằng truy vấn sẽ được thực thi ngay lúc đó, tránh nhầm lẫn với các phương thức như `.find()` vốn chỉ tạo một query chưa thực thi.

---

### **3. Khi nào nên dùng `.exec()`?**

#### **Nên dùng `.exec()` khi:**

1. **Cần sử dụng Promise thực sự**:
   - Nếu bạn làm việc với các thư viện yêu cầu Promise chuẩn (chẳng hạn như `async/await` kết hợp với `Promise.all()`), việc sử dụng `.exec()` đảm bảo truy vấn trả về Promise chuẩn.
2. **Muốn dùng callback**:

   - Khi bạn cần truyền callback vào để xử lý kết quả (thay vì sử dụng Promise).

3. **Truy vấn phức tạp hoặc để tăng tính rõ ràng**:
   - Với các truy vấn phức tạp, việc dùng `.exec()` giúp bạn phân biệt rõ truy vấn chỉ được định nghĩa (chưa thực thi) và truy vấn đã thực thi.

#### **Không cần dùng `.exec()` khi:**

1. **Truy vấn đơn giản và sử dụng promise-like**:

   - Nếu bạn sử dụng `await` hoặc `.then()` trực tiếp, không nhất thiết phải dùng `.exec()` vì Mongoose tự trả về promise-like object.

2. **Không cần callback hoặc Promise chuẩn**:
   - Nếu bạn chỉ làm việc trong ngữ cảnh của Mongoose và không yêu cầu tính năng bổ sung từ `.exec()`.

---

### **4. Tóm tắt sự khác biệt**

| **Không dùng `.exec()`**                            | **Dùng `.exec()`**                                            |
| --------------------------------------------------- | ------------------------------------------------------------- |
| Trả về **promise-like object**                      | Trả về **Promise chuẩn**                                      |
| Đơn giản, tiện lợi với `await` hoặc `.then()`       | Cần thiết khi làm việc với các thư viện yêu cầu Promise chuẩn |
| Không hỗ trợ truyền callback                        | Hỗ trợ callback như một tham số                               |
| Truy vấn tự động thực thi khi gọi `.then()`/`await` | Yêu cầu gọi `.exec()` để thực thi truy vấn                    |

---

### **Ví dụ thực tế**

#### **Truy vấn đơn giản (không cần `.exec()`)**

```javascript
const user = await User.findOne({ email: 'example@gmail.com' })
```

#### **Truy vấn phức tạp (nên dùng `.exec()`)**

```javascript
// Đảm bảo Promise chuẩn cho việc kết hợp với Promise.all
const [user, posts] = await Promise.all([
  User.findOne({ email: 'example@gmail.com' }).exec(),
  Post.find({ author: 'userId' }).exec()
])
```

#### **Sử dụng callback với `.exec()`**

```javascript
User.findOne({ email: 'example@gmail.com' }).exec((err, user) => {
  if (err) return console.error(err)
  console.log(user)
})
```

---

Tóm lại, bạn **không cần dùng `.exec()`** cho các trường hợp truy vấn đơn giản, nhưng nên dùng nó khi cần:

- Promise chuẩn.
- Callback truyền thống.
- Tăng tính rõ ràng cho truy vấn phức tạp.
