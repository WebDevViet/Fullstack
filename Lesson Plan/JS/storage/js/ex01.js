/*
Storage: Bộ nhớ trình duyệt
1. localStorage
- Lưu trữ không giới hạn thời gian
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
  //Hỗ trợ Storage
  //   localStorage.setItem("email", "contact@fullstack.edu.vn");
  //   console.log(localStorage.getItem("email"));
  //   localStorage.removeItem("email");
  //   localStorage.clear(); //Xóa tất cả
  //   localStorage.email = "abcb@gmail.com";
  //   console.log(localStorage.email);
  //   delete localStorage.email;

  //Lưu ý:
  localStorage.setItem('email', 'contact@fullstack.edu.vn')
  console.log(localStorage.email)
}

//Cookie
//- Tạo cookie ở phía client
// document.cookie = "name=An;max-age=600;domain=127.0.0.1;path=/";
// document.cookie = "age=32;domain=127.0.0.1;path=/";
// console.log(document.cookie);

// - Xóa cookie
document.cookie = `email=;expires=${new Date().toUTCString()};path=/`
