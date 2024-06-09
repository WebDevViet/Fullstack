// 1. Toán tử số học

// +, -, *, /, % (chia lấy dư), **(lũy thừa)
// ++, --

// var a = 1;
// var b = 2;

// var c = a + b;

// console.log("🚀 ~ c :", c); // c = 3;

// c = 3 ** 2;
// console.log("🚀 ~ c :", c); // c = 9;

// console.log("🚀 ~ a++:", a++); // a++ nó sẽ trả về giá trị trước khi được thay đổi
// console.log("🚀 ~ ++a:", ++a); // ++a nó sẽ trả về giá trị sau khi được thay đổi

// var a = 0;
// var total = a++; // a = 0 và sẽ gán 0 cho total

// console.log("🚀 ~ a:", a); // a = ? 0. Tại sao a = 1, bởi vì nó đã tăng sau lệnh thực ở trên
// console.log("🚀 ~ total:", total); // total = ? 1. Tại sao total = 0, bởi vì total lấy giá của a trước khi được tăng (là do a nó trả về giá trị trước khi được thay đổi)

// BT 1:
// var count = 0;
// var total = count++ + ++count; // (++count đã bằng ++1 do count++ đã tăng lên trước đó);
// //B1:  total = 0 + ++1
// //B2:  total = 2
// console.log("🚀 ~ total:", total);

// ------------------------------------------

// 2. Toán tử Logic
// Dùng để so sánh, nó sẽ trả về (return) giá trị là boolean
// ==, ===, >, <, >=, <=, !=, !==

// var a = 1,
//    b = "1";

// console.log("🚀 ~ a = b?:", a == b); // chỉ so sánh giá trị => true
// console.log("🚀 ~ a = b?:", a === b); // so sánh giá trị và kiểu => false
// console.log("🚀 ~ a = b?:", a === +b); // muốn nó bằng nhau thì sao?, +b (ép kiểu string về number) => b = 1 => true

// 3. Toán tử gán
// toán tử =

// var a = 1;
// a += 2; // => a = a + 2 => 3
// a -= 2; // => a = a - 2 => -1
// a *= 2; // => a = a * 2 => 2 ...

// var b = "JS";
// b += " ko khó";

// console.log("🚀 ~ b:", b); // => JS ko khó

// b -= " ko khó";
// console.log("🚀 ~ b:", b); // => NaN: Not a Number

// 4. Toán tử kết hợp
/**
 * &&: và => Tất cả các biểu thức con đúng => cha sẽ đúng
 * ||: hoặc => chỉ cần 1 biểu thức đúng => thì biểu thức sẽ đúng
 * !: phủ định
 */

// var a = 10;
// var b = a >= 5 && a <= 10; // => tra về boolean => b = true
// console.log("🚀 ~ b:", b);

// b = !b;
// console.log("🚀 ~ b:", b); // b = false

// b = !!!b;
// console.log("🚀 ~ b:", b); // b = true

// 5. Toán tử 3 ngôi
// Mục đích là lấy giá trị trả về từ kết quả sau dấu ?
// Giống if else mà rút gọn đi
// điều kiện sẽ cần trả về true/false
// Nếu điều kiện đúng thì sẽ lấy giá trị đúng và ngược lại
// dieukien ? giatridung : giatrisai

// var a = 9;
// var b = a >= 10 ? "Đúng" : "Sai";
// console.log(b);

// var a = 10;
// var total = 1 + (a >= 10 ? 5 : 10);
// console.log("🚀 ~ total:", total);

// var a = 9;
// var b = 3;
// var total = 1 + (a >= 10 ? 5 : b > 2 ? 1 : 2);
// console.log("🚀 ~ total:", total);

/*
6. Toán tử nullish (??)
*/

// Nếu bị undefined và null thì sẽ lấy giá trị sau dấu ??
// (ko bị undefined và null) ?? giá trị undefined và null

// var a = 5; //
// var b = a ?? "F8"; //Check undefined và null
// console.log("🚀 ~ b:", b);

/*
Nếu a === null và a === undefined => Lấy sau ??
Nếu a !== null và a !== undefined => Lấy trước ??
*/
// console.log(b);

// var x = null;
// var y = 5;

// console.log((x ??= y)); // => 5
// console.log((x = x ?? y)); // => 5

//Bài tập: Viết lại toán tử nullish bằng toán tử 3 ngôi
// Tạo ra toán tử nullish 2
// var a = null;
// var b = 2;

// var result1 =
//    a !== undefined && a !== null ? "Ko bị undef và null" : "Bị undef hoặc null";
// var result2 =
//    b !== undefined && b !== null
//       ? `${b} Ko bị undef và null`
//       : "Bị undef hoặc null";

// console.log("🚀 ~ result:", result1);
// console.log("🚀 ~ result:", result2);

/*
Truthy và Falsy
=> Trong ngữ cảnh cần phải sử dụng kiểu boolean (so sánh), tự động chuyển các kiểu dữ liệu khác về true, false

1. Việc tự động chuyển về false => Gọi là falsy
0, "", false, undefined, null, NaN

2. Việc tự động chuyển về true => Gọi là truthy
Các trường hợp còn lại
*/

// var a = 0;

// if (!a) {
//    console.log("🚀 ~ a :", a);
// }

// var data = fetch();

/*
7. Toán tử &&

Nếu falsy => Lấy giá trị trước &&
Nếu truthy => Lấy giá trị sau &&
*/

// var a = 1; // falsy

// var b = a && "F8";
// console.log("🚀 ~ b:", b);

// var data = true;

/*
8. Toán tử ||
Truthy => Lấy trước ||
falsy => Lấy sau ||
*/

// var a = 10;
// var b = a || "F8";
// console.log(b);

// var n = (a) => {
//    var b = a && " là số";
//    return b;
// };

// console.log(n(2));

///-----------------------------

// Phải sử lý lỗi trước

// #Bài 1: Hoán vị 2 số
// Input: Cho trước 2 số a, b
var $500 = 1,
   $200 = 2;

// Output: Thực hiện hoán vị 2 số không dùng biến trung gian

// #Bài 2: Thực hiện phép toán
// Viết chương trình tính toán biểu thức sau

// S = 10 + 20 + 5^10 / 2

// #Bài 3: Tìm số lớn nhất
// Học viên tìm hiểu về câu lệnh rẽ nhánh (if else) và giải bài tập sau

// Input:

// Cho trước 3 số a, b, c

// function largestNumber(a, b, c) {
//    var largestNum = a; // Kỹ thuật hạ khoan

//    if (b > largestNum) {
//       largestNum = b;
//    }

//    if (c > largestNum) {
//       largestNum = c;
//    }

//    return largestNum;
// }

// Output:

// Tìm số lớn nhất trong 3 số và hiển thị kết quả

// #Bài 4: Kiểm tra số cùng dấu
// Input:

// Cho trước 2 số a, b

// Output:

// Kiểm tra 2 số cùng dấu hay không và hiển thị kết quả ra màn hình

// #Bài 5: Sắp xếp 3 số
// Input:

// Cho trước 3 số a, b, c

// Output:

// Thực hiện đổi chỗ 3 số a, b, c sao cho 3 số có thứ tự tăng dần

// var a = 3;
// var b = 2;
// var c = 1;

// if (areNaN(a, b, c)) {
//    result = "Không thể thực hiện, các giá trị phải cùng kiểu là số";
// } else {
//    console.log(`Trước khi sắp xếp: a = ${a} | b = ${b} | b = ${c}`);

//    var num1, num2, num3, temp;

//    // a = 3;
//    // b = 2;
//    // c = 1;

//    if (a > b) {
//       // 3 > 2
//       temp = a;
//       a = b;
//       b = temp;
//    }

//    // a = 2;
//    // b = 3;
//    // c = 1;

//    if (b > c) {
//       // 3 > 1
//       temp = b;
//       b = c;
//       c = temp;
//    }

//    // a = 2;
//    // b = 1;
//    // c = 3;

//    if (a > b) {
//       // 2 > 1
//       temp = a;
//       a = b;
//       b = temp;
//    }

//    // a = 1;
//    // b = 2;
//    // c = 3;

//    result = `Sau khi sắp xếp: a = ${a} | b = ${b} | b = ${c}`;
// }
// console.log(result);
