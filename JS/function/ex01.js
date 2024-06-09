// Hàm trong JS
// - Hàm là cú pháp trong lập trình
// - Cú pháp trong lập trình dùng để thể hiện các chức năng (Động từ)
// - Nhóm các đoạn chương trình con để dễ dàng gọi lại ==> Tái sử dụng
// - Hàm trong JS có 2 loại:
//   + Hàm tự định nghĩa bởi lập trình viên
//   + Hàm có sẵn (Trình duyệt, Engine)

// Cú pháp:
// function tenham() {
//     Nội dung hàm
// }

// function tenham(thamso1, thamso2,...) {
//     Nội dung hàm
// }

// function getMessage() {
//    console.log(123);
// }

// getMessage(); // lời gọi hàm chủ động

// Đặt tên hàm:
// - Quy tắc camelCase
// - Sử dụng động từ
// + get
// + set
// + make
// + build
// + call
// + remove
// + create
// + insert
// ...

// Định nghĩa hàm ==> Tham số (Parameter)
// Gọi hàm ==> Đối số (Argument)

// - Hàm có giá trị trả về (Hàm return)
// - Hàm không có giá trị trả về (Hàm void)

// - Biến toàn cục: Biến khai báo ở phạm vi ngoài hàm
// - Biến cục bộ: Khai báo ở phạm vi trong 1 hàm, chỉ được sử dụng trong phạm vi của hàm đó

// var count = 0;

// function getMessage() {
//    console.log("Bắt đầu: ", count);
//    if (count > 0) {
//       console.log("kết thúc đệ quy");
//       return;
//    }

//    count++;
//    console.log("🚀 ~ getMessage ~ count đã tăng ++ thành:", count);

//    getMessage();

//    /**
//    function getMessage() {
//       console.log("Bắt đầu: ", count);
//       if (count > 0) {
//          console.log("kết thúc đệ quy");
//          return;
//       }

//       count++;
//       console.log("🚀 ~ getMessage ~ count đã tăng ++ thành:", count);

//       getMessage();
//       console.log("Đã xong đệ quy");
//    }
//     */

//    console.log("Đã xong đệ quy");
// }

// getMessage();

// function division(a, b) {
//    if (b !== 0) {
//       return a / b;
//    }

//    return "Không tính được";
// }

// division();

// var data = "F88";

// function getData() {
//    return data;
// }

// function setData(value) {
//    data = value;
//    console.log("🚀 ~ setData ~ data = value:", data);
// }

// setData("Fullstack");
// console.log("🚀 ~ data:", data);

//===========================================

// Tính giá trị biểu thức sau:
// S = 1*2 + 2*3 + 3*4 + ... + n*(n+1)
// Đề bài n = 10;

//  n = 3
// S = 1*2 + 2*3 + 3 * 4

// n = 10
// S = 1*2 + 2*3 + 3*4 + 4 * 5 + 5 *6 +6* 7 + 7*8 + 8* 9 + 9 * 10  + 10 * 11

// // TH1:
// var i = 1;
// var result = 0;

// function calcNumbers(n) {
//    // while (i <= n) {
//    //    result = result + i * (i + 1);
//    //    i++;
//    // }

//    //n = 10
//    if (i > n) {
//       return;
//    }

//    result = result + i * (i + 1);
//    // 0 = 0 + 1 * (1 + 1)

//    i++; // i = 2

//    calcNumbers(n);

//    /**
//    function calcNumbers(n) {
//    // while (i <= n) {
//    //    result = result + i * (i + 1);
//    //    i++;
//    // }

//    // n = undefined => tại vì calcNumbers() không truyền đối số
//    if (i > n) {
//       return;
//    }

//    result = result + i * (i + 1);

//    i++;

//    calcNumbers();
// }
//     */
// }

// calcNumbers(10);

// console.log("🚀 ~ result:", result);

// // TH2:
// var result = 0;

// function calcNumbers(n) {
//    //n = 10
//    if (n < 1) {
//       return;
//    }

//    result += n * (n + 1);

//    n--; // n = 9

//    calcNumbers(n);
// }

// calcNumbers(10);

// console.log("🚀 ~ result:", result);

// TH3:
function calcNumbers(n) {
   if (n < 1) {
      console.log(
         ` 
      function calcNumbers(${n}) {
         if (${n} < 1) {
            return ${n};
         }
      }
      -----------------------------------------------------
      `
      );
      return n;
   }

   console.log(
      ` 
      function calcNumbers(${n}) {
         if (${n} < 1) {
            return n;
         }

         return ${n} * (${n} + 1) + calcNumbers(${n} - 1); 
      }
      -----------------------------------------------------
      `
   );

   return n * (n + 1) + calcNumbers(n--); // 440
}

console.log("🚀 ~ calcNumbers(10): ", calcNumbers(10));
