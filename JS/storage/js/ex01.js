/*
Storage: Bộ nhớ trình duyệt
1. localStorage
- Lưu trữ không giới hạn thời gian (trừ khi xoá lịch sử)
- Dung lượng lớn: Khoảng 10mb
- Chỉ lưu trữ text
- Server không thể đọc, ghi
- Phân biệt theo origin: scheme + hostname + port
2. sessionStorage
- Lưu trữ theo phiên (Tắt trình duyệt sẽ bị xóa)
3. cookie
- Lưu trữ theo phiên hoặc theo thời gian chỉ định
- Dung lượng nhỏ: Khoảng 4kb
- Chỉ lưu trữ text
- Server có thể đọc ghi (Làm việc thông qua http request, http response)
- Phân biệt theo path
- Cookie có thể share tới tất cả tên miền con (subdomain)

Trong cùng tên miền: set cookie /a và /b
*/

if (typeof Storage !== 'undefined') {
  localStorage.email = 'a@a.com'
  localStorage.email = 'a@a.com'
  console.log('🚀 ~ localStorage.email:', localStorage.email)
  delete localStorage.email
  localStorage.clear()
}

/** Tạo cookie ở client
 *
 */

document.cookie = `name=a;expires=${new Date().toUTCString()}`
document.cookie = 'name=b'

console.log('🚀 ~ document.cookie:', document.cookie)
