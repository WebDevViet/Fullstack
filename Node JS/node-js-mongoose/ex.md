# Thực Hành Tốt Nhất Để Viết Mã TypeScript Sạch

Việc viết mã TypeScript sạch và dễ bảo trì yêu cầu tuân theo một số thực hành tốt nhất. Dưới đây là 10 mẹo giúp bạn giữ cho mã TypeScript của mình sạch sẽ, dễ đọc và có thể mở rộng.

## 1. Sử Dụng Kiểu Dữ Liệu Nghiêm Ngặt

- TypeScript cung cấp cờ `--strict` để kích hoạt nhiều kiểm tra nghiêm ngặt, như `noImplicitAny` và `strictNullChecks`.
- Kích hoạt kiểu dữ liệu nghiêm ngặt giúp phát hiện lỗi tiềm ẩn và buộc bạn phải khai báo kiểu một cách rõ ràng. Dưới đây là cách kích hoạt chế độ nghiêm ngặt trong `tsconfig.json`:

```json
{
  "compilerOptions": {
    "strict": true
  }
}
```

- Sử dụng chế độ nghiêm ngặt ngăn TypeScript suy diễn kiểu `any` nơi nó không thể xác định kiểu cụ thể, giảm thiểu sự mơ hồ và nâng cao chất lượng mã.

## 2. Tránh Sử Dụng `any` và Sử Dụng Kiểu Cụ Thể

- Mặc dù `any` có vẻ tiện lợi, nhưng nó làm suy yếu khả năng kiểm tra kiểu của TypeScript.
- Thay vào đó, hãy cố gắng sử dụng các kiểu cụ thể (`string`, `number`, `boolean`, `Date`, v.v.), hoặc tạo các `types/interfaces` tùy chỉnh để định nghĩa cấu trúc đối tượng.

```typescript
interface User {
  id: number;
  name: string;
  email: string;
}

function getUser Data(user: User) {
  console.log(user.name);
}
```

## 3. Tận Dụng Suy Diễn Kiểu

- TypeScript có thể suy diễn kiểu trong nhiều tình huống, chẳng hạn như khi khởi tạo biến.
- Tránh các chú thích kiểu dư thừa nơi TypeScript có thể suy diễn kiểu, vì điều này có thể làm mã của bạn sạch hơn.

```typescript
// Kiểu rõ ràng (ít sạch hơn)
const age: number = 25

// Kiểu suy diễn (sạch hơn)
const age = 25
```

## 4. Sử Dụng Kiểu Hợp Nhất và Hợp Nhất Một Cách Khôn Ngoan

- Kiểu hợp nhất (`|`) và hợp nhất (`&`) trong TypeScript cho phép bạn tạo ra các kiểu linh hoạt có thể kết hợp nhiều kiểu hoặc thuộc tính.
- Sử dụng chúng một cách chính xác giúp mã trở nên mô-đun và dễ hiểu hơn.

```typescript
type Admin = {
  id: number
  role: string
}

type User = {
  name: string
  email: string
}

type SuperUser = Admin & User // Kiểu Hợp Nhất
```

## 5. Thực Hiện Giao Diện Thay Vì Kiểu Định Danh Cho Đối Tượng

- Mặc dù cả giao diện và kiểu định danh đều cho phép bạn định nghĩa hình dạng của các đối tượng, giao diện linh hoạt và có thể mở rộng hơn, đặc biệt khi cần mở rộng hoặc hợp nhất.
- Sử dụng giao diện để định nghĩa cấu trúc đối tượng và kiểu định danh cho các tình huống khác như hợp nhất.

```typescript
interface Vehicle {
  make: string
  model: string
  year: number
}

const car: Vehicle = {
  make: 'Toyota',
  model: 'Corolla',
  year: 2020
}
```

## 6. Giữ Mã Của Bạn DRY (Không Lặp Lại Chính Mình)

- Tránh sự dư thừa trong mã TypeScript của bạn bằng cách sử dụng generics, các kiểu tiện ích và các hàm trợ giúp để tạo ra các thành phần có thể tái sử dụng.
- Generics đặc biệt hữu ích trong các hàm và lớp khi làm việc với nhiều kiểu khác nhau.

```typescript
function wrapInArray<T>(value: T): T[] {
  return [value]
}
```

## 7. Xử Lý Null và Undefined Một Cách Chính Xác

- Kiểm tra `strictNullChecks` của TypeScript giúp phát hiện các trường hợp mà giá trị `null` hoặc `undefined` có thể được sử dụng.
- Luôn kiểm tra các giá trị null khi truy cập các thuộc tính có thể là `null` hoặc `undefined`.

```typescript
function printUser(user?: User) {
  if (user) {
    console.log(user.name)
  }
}
```

- Sử dụng chuỗi tùy chọn (`?.`) và toán tử hợp nhất null (`??`) cũng có thể làm cho mã của bạn sạch hơn và mạnh mẽ hơn.

## 8. Sử Dụng `readonly` Cho Dữ Liệu biến

- Để bảo vệ dữ liệu không bị thay đổi, hãy sử dụng từ khóa `readonly` cho các thuộc tính trong các kiểu hoặc giao diện của bạn.
- Điều này giúp đảm bảo rằng các giá trị không bị thay đổi sau khi được khởi tạo.

```typescript
interface Point {
  readonly x: number
  readonly y: number
}

const point: Point = { x: 10, y: 20 }
// point.x = 15; // Lỗi: không thể thay đổi thuộc tính readonly
```

## 9. Sử Dụng Các Tên Biến Có Ý Nghĩa

- Đặt tên biến rõ ràng và có ý nghĩa giúp mã của bạn dễ đọc và dễ hiểu hơn.
- Tránh sử dụng các tên biến mơ hồ hoặc viết tắt không rõ ràng.

```typescript
const userAge: number = 30 // Tên biến rõ ràng
const a: number = 30 // Tên biến mơ hồ
```

## 10. Viết Kiểm Tra Đơn Vị

- Việc viết kiểm tra đơn vị cho mã TypeScript của bạn giúp đảm bảo rằng mã hoạt động như mong đợi và giúp phát hiện lỗi sớm.
- Sử dụng các thư viện như Jest hoặc Mocha để viết và chạy các bài kiểm tra đơn vị cho mã của bạn.

```typescript
describe('wrapInArray', () => {
  it('should wrap a value in an array', () => {
    expect(wrapInArray(5)).toEqual([5])
  })
})
```

## Kết Luận

Việc tuân theo các thực hành tốt nhất này sẽ giúp bạn viết mã TypeScript sạch hơn, dễ bảo trì và dễ hiểu hơn. Hãy luôn cập nhật và cải thiện kỹ năng lập trình của bạn để trở thành một lập trình viên TypeScript giỏi hơn.
