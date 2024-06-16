// Hàm trong JS
// - Hàm là cú pháp trong lập trình
// - Cú pháp trong lập trình dùng để thể hiện các chức năng (Động từ)
// - Nhóm các đoạn chương trình con để dễ dàng gọi lại ==> Tái sử dụng
// - Hàm trong JS có 2 loại:
//   + Hàm tự định nghĩa bởi lập trình viên
//   + Hàm có sẵn (Trình duyệt, Engine)

// Lưu ý: Trong JS không có khái niệm tham chiếu, tham trị

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

// // TH3:
// function calcNumbers(n) {
//    if (n < 1) {
//       console.log(
//          `
//       function calcNumbers(${n}) {
//          if (${n} < 1) {
//             return ${n};
//          }
//       }
//       -----------------------------------------------------
//       `
//       );
//       return n;
//    }

//    console.log(
//       `
//       function calcNumbers(${n}) {
//          if (${n} < 1) {
//             return n;
//          }

//          return ${n} * (${n} + 1) + calcNumbers(${n} - 1);
//       }
//       -----------------------------------------------------
//       `
//    );

//    return n * (n + 1) + calcNumbers(n--); // 440
// }

// console.log("🚀 ~ calcNumbers(10): ", calcNumbers(10));

//anonymous function: Hàm ẩn danh, hàm không tên
//Muốn thực thi

/*
Cách 1: Gán vào 1 biến (Expression Function)
Cách 2: Đưa vào 1 hàm khác dưới dạng đối số
*/

// getMessage();
// var getMessage; // undefined
// console.log("🚀 ~ getMessage:", typeof getMessage);

// var getMessage = function getMsg() {
//    console.log("Học JS không khó");
// };

// function other(callback) {
//    // console.log("🚀 ~ getMsg ~ callback:", callback(5)); // lời gọi hàm bị động (callback)
//    // console.log("Học JS không khó");
//    // if (typeof callback === "function") {
//    //    callback(5);
//    // }

//    typeof callback === "function" && callback(); // && ngược lại ||

//    console.log("🚀 ~ other ~ :", typeof callback);
// }

// other(function () {
//    console.log("JS");
// });

// var handleDisplay = function (text) {
//    console.log("handleDisplay");
//    console.log(text);
// };

// var display = function (callback, args) {
//    console.log("display");
//    // console.log("🚀 ~ display ~ typeof callback:", typeof callback); ?/ undefined

//    typeof callback === "function" && callback(args);
// };
// display(handleDisplay, "f88");

// display(handleDisplay("f88"));

// -----------------------------------------

// Từ khóa argument
// function log2(a, b) {
//    console.log("🚀 ~ log2 ~ a, b:", a, b);
//    console.table(arguments);
// }

// log2("đối số 1", "đối số 2", "đối số 3");

// -----------------------------------------

// rest parameter

// function log2(a, b, ...args) {
//    console.log("🚀 ~ log2 ~ a:", a);
//    console.log("🚀 ~ log2 ~ b:", b);

//    console.table(args);
// }

// log2("số 1", "số 2", "c");

// -----------------------------------------

// spread operator
// var arr = [1, 2, 3];

// // var listStudent = [
// //    { name: "Decao", age: 18, points: [1, 2, 3] },
// //    { name: "ChauBui", age: 17, points: [3, 2, 1] },
// // ];

// function sum(...args) {
//    console.log(args);
// }

// sum(...arr); // => sum(1, 2, 3)

// sum(...listStudent); //   sum({ name: "Decao", age: 18, points: [1, 2, 3] }, { name: "ChauBui", age: 17, points: [3, 2, 1] })

// var arr2 = {};
// console.log("🚀 ~ arr2:", arr2);

// setTimeout(
//    (a, ...args) => {
//       console.log(1);
//       console.log("🚀 ~ setTimeout ~ a:", a);
//       console.log("🚀 ~ args:", args);
//    },
//    1000,
//    "16 typh",
//    "min",
//    "decao"
// );

// var i = 0;
// var id = setInterval(() => {
//    if (i >= 3) {
//       clearInterval(id);
//    }
//    console.log("🚀 ~ i:", i);
//    i++;
// }, 1000);

// var getA = function (cb) {
//    setTimeout(() => {
//       console.log("🚀 ~ getA");
//       typeof cb === "function" && cb(); // getB(getC);
//    }, 1000);
// };

// var getB = function (cb) {
//    setTimeout(() => {
//       console.log("🚀 ~ getB");
//       typeof cb === "function" && cb(); // cb = getC, cb() = getC(),
//    }, 2000);
// };

// var getC = function (cb) {
//    setTimeout(() => {
//       console.log("🚀 ~ getC");
//       typeof cb === "function" && cb();
//    }, 1500);
// };

// var getD = function (cb) {
//    setTimeout(() => {
//       console.log("🚀 ~ getD");
//       typeof cb === "function" && cb();
//    }, 1600);
// };

// getA(function () {
//    getB(function () {
//       getC(getD);
//    });
// });
// // callback hell

// setTimeout(() => {
//    console.log("1");
// }, 0);

// console.log("2");

// console.log("3");

// setTimeout(() => {
//    console.log("4");
// }, 0);

// console.log("5");

/*
Buổi sau: 
- Định nghĩa hàm con
- Closure
- Kỹ thuật Thunk Function
- IIFE
- Giải thuật đệ quy

Tìm hiểu sau: 
- Async Function
- Generator Function
*/
// --------
// var a = 10;
// var b = () => {};
// console.log("🚀 ~ b:", b);

// console.log(window);
//Thuộc object là window
// window.console.log(a);
// Mọi thứ được tạo ra trong JS đều nằm trong window (Chỉ áp dụng với Client)

// Định nghĩa hàm con
// function funcParent(params) {
//    function funcChild(params) {
//       console.log(123);
//    }
//    funcChild();
// }

// Cú pháp truy cập: tenObject.tenHam hoặc tenObject.tenBien

// var a = 10;

// function display(c) {
//    var b = 20;

//    function showUser() {
//       console.log("hello");
//       console.log("🚀 ~ a:", a);
//       console.log("🚀 ~ b:", b);
//       console.log("🚀 ~ c:", c);
//    }

//    showUser();
// }

// display("16");

/*
Định nghĩa hàm bên trong 1 hàm khác, có thể: 
- Chỉ được gọi hàm đó bên trong hàm khác (Closure)
- Được phép sử dụng: 
+ Biến toàn cục
+ Tham số của hàm cha
+ Biến cục bộ của hàm cha
+ Tham số của chính nó
*/

// function display() {
//    function showUser() {
//       console.log("hello");
//    }

//    return showUser;
// }

// Chủ động gọi hàm con bên ngoài phạm vi
// var a = display(); // Trả về giá trị mà return trả về
/**
 * a =  function showUser() {
      console.log("hello");
   }
 * 
*/
// a(); // a() = showUser()

// function ganSo(num) {
//    return num;
// }

// var so = ganSo(5);
// console.log("🚀 ~ so:", so); // so = 5

// var addSum = function (a) {
//    return function (b) {
//       return a + b;
//    };
// };

// // Bước 1: Tạo hàm con
// var add = addSum(10); // add sẽ bằng giá trị return của hàm sum trả về , return thì nhận cái đấy
// chỉ chạy addSum() chứ không chạy thằng hàm con được return
// gán hàm con mà addSum nó return cho biến add
/**
 * // var sum = function (b) {
   //    return 10 + b;
   // };

   // var add = sum
 *
*/

// // Bước 2: Gọi hàm con
// var result1 = add(5);
/**
 * var add = function(b) {
      return 10 + b;
   };

   add(5) cũng giống như sum(5)
 * 
*/
// console.log("🚀 ~ result1:", result1);

// var result2 = add(2); // result2 = 12
// var result3 = add(3); // result3 = 13
// var result4 = add(4); // result4 = 14

// IIFE(Immediately invoked function expression)
// (function showNum(num) {
//    console.log("🚀 ~ showNum ~ num:", num);
// })(5);

// Giải thuật đệ quy
