/** Quy tắc (Rule)
 * Tên biến chỉ được phép: chữ hoa, chữ thường, dấu $, dấu _, số,
 * Tên biến không được phép bắt đầu bằng số
 * Đặt tên theo quy tắc camelCase
 */

/** Các kiểu khai báo biến
 * Khai báo trước gán sau
var a; // a = undefined (ko xác định)
a = 1;

 * Khai báo sau gán trước (Hoisting)
a = 1;
var a // Chỉ có var làm được hoisting, const và let không được

 * Khai báo gán luôn
var a = 1;
 */

// a = 3;
// var a;
// var a = "Học JS không khó";

// document.write("Học JS không khó");

// var p1 = "vl";
// var p2 = "<p>Học Js khó " + p1 + " :))";

// document.write(p2);

// // setTimeout(() => {
// //    window.document.location = "https://fullstack.edu.vn/";
// // }, 2000);

// var str = "ABC";

// console.log("ABC".toLowerCase());

// ----------------------------------

// ex01: Hoán vị

// var a = 1;
// var b = 2; // số 2 sẽ được js xóa đi
// var c = a; // c sẽ = 1 từ a;

// a = b; // a nó sẽ lấy giá trị của b; a đã = 2; a = b và b cũng a; sau khi đoạn này chạy thì số 1 đã mất khỏi bộ nhớ ram (nếu ko có c).

// b = c; // b sẽ lấy giá trị mới nhất của a; b sẽ = a = 1

// console.log("Biến A = ", a);
// console.log("Biến B = ", b);
// // console.log("Đây a:", a); // đáng lẽ là a = 3 bởi vì a = b, thực ra ko phải

// ----------------------------------

// var a = 1;
// var b = 2;

// a = b; // a nó sẽ lấy giá trị của b; a đã = 2; a = b và b cũng a; sau khi đoạn này chạy thì số 1 đã mất khỏi bộ nhớ ram (nếu ko có c).

// console.log("Biến A = ", a); //a = 2
// console.log("Biến B = ", b); //b = 2

// b = 3; // b sẽ lấy giá trị mới nhất của a; b sẽ = a = 1

// console.log("Biến A lần 2 = ", a); //a = 2 hay là sẽ a = 3 ? kết quả: a = 2, đây là tham trị

// // console.log("Đây a:", a); // đáng lẽ là a = 3 bởi vì a = b, thực ra ko phải

// ----------------------------------

// var a = {
//    age: 18,
// };

// var b = a; // b lúc này đang là tham chiếu

// a.age = 3;

// // a = 1; /// Giá trị mới của a

// console.log("Biến A = ", a); // a.age = 3;
// console.log("Biến B = ", b); // b.age = 18 or b.age = 3?
