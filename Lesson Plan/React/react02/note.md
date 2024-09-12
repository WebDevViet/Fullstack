# Triển khai hệ thống quản lý global state

- State chỉ ở 1 component
- Chia sẻ dữ liệu giữa các component => đẩy lên component cha
- Muốn có 1 state dùng chung cho toàn bộ project

> [!TIP]
> Thư viện: redux, zustand,... or useContext with useReducer

# Custom Hook

- Hàm thông thường không dùng được Hook
- Muốn dùng Hook ==>

* Tạo component ==> Không kế thừa được logic
* Tạo Hook mới ==> Kế thừa logic

Cách tạo Hook

- Tạo hàm bắt đầu bằng từ khóa use
- Không return về jsx mà sẽ return về các kiểu dữ liệu khác tùy theo nghiệp vụ: object, array, null, undefined, string, number,...

# Lưu ý khi làm việc với Global State

Các action khi dispatch thường là object ==> Gặp vấn đề khi thay đổi lại logic trong reducer hoặc thay đổi type, kiểu của payload,...
