var a = 9;
//Hiển thị đoạn code dưới theo điều kiện a >= 10

// if (a >= 10) {
//   console.log("F8");
//   console.log("F8");
//   console.log("F8");
// } else {
//   console.log("Không đúng");
// }

/*
1. Câu lệnh rẽ nhánh if else
2.1. Câu lệnh rẽ nhánh if thiếu

if (dieukien) {
    Nội dung
}

2.2. Câu lệnh rẽ nhánh if đủ

if (dieukien) {
    Nội dung đúng
} else {
    Nội dung sai
}

2.3. Câu lệnh if nhiều nhánh

if (dieukien1) {
    Nội dung nhánh 1
} else if (dieukien2) {
    Nội dung nhánh 2
} else if (dieukien3) {
    Nội dung nhánh 3
} else {
    Nội dung nhánh 4
}

2.4. Câu lệnh if lồng nhau

if (dieukien) {
    if (dieukien2) {

    } else {

    }
} else {

}


*/

/*
Bài tập: Tính lương thực nhận sau khi đã trừ thuế

Bảng thuế: 
- Lương < 5tr => Thuế = 3%
- Lương từ 5tr đến 15tr => Thuế = 5%
- Lương trên 15tr => Thuế = 10%
*/
// var salary = 15000000;

// var tax;

// if (salary < 5000000) {
//    tax = 3; // Kỹ thuật chia để trị kiểm soát các thao tác lặp phức tạp thành đơn giản
// } else if (salary > 15000000) {
//    // Kỹ thuật tư duy ngược dùng để giản lược
//    tax = 10;
// } else {
//    tax = 5;
// }

// var salaryReal = salary - (salary * tax) / 100;
// var salaryReal = ((100 - tax) * salary) / 100;

// console.log(salaryReal);

// BT2: Kiểm tra 1 số có phải là số nguyên hay không?
// var num = 2.5;
// console.log("🚀 ~ num:", num % 1);

// if (num % 1 === 0) {
//    console.log("Là số nguyên");
// } else {
//    console.log("Đây không phải là số nguyên");
// }

// Tìm hiểu thêm + tự giác = Good job
// var a = 5;
// var b = 2;
// var c = a / b; //Lấy phần nguyên. c = 2.5
// console.log(c); // parseInt = 2.

// 2. Câu lệnh rẽ nhánh switch case

var key = -1,
   flag;

// if (a = 1) {

// } else if (a = 2) {

// } else if (a = 3) {

// } else if (a = 4) {

// }
//
// switch (key) {
//    case 1:
//       flag = "1";
//    case 2:
//       flag = "2";

//    case 3:
//       flag = "3";

//    default:
//       flag = "0";
//       break;
// }

// console.log("🚀 ~ flag:", flag);
