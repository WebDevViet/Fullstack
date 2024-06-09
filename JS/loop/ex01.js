/*
Vòng lặp: Cú pháp trong lập trình, cho phép 1 đoạn chương trình lặp đi lặp theo số lần lặp nhất định

1. Vòng lặp xác định trc số lần lặp: for

for (bienchay; dieukiendung; buocnhay) {
    Nội dung
}
*/

// var array = [0, 1, 2, 3];
// console.log("🚀 ~ array.length:", array.length);

// for (let index = 0; index < array.length; index++) {
//    const element = array[index];
//    console.log("🚀 ~ element:", element);
// }

// for (let i = 10; i > 0; i -= 2) {
//    console.log(i);
// }

// for (let i = 0; i < 5; i++) {
//    for (let j = 0; j < 5; j++) {
//       console.log("🚀 ~ i:", i, "🚀 ~ j:", j);
//    }
// }

// Bài 1: Tính giá trị biểu thức
// var total = 1 + 2 + 3 + ... + n ? = bao nhiêu

// var n = 4;
// var result = 0;
// for (let i = 0; i <= n; i++) {
//    result += i;
// }

// console.log("🚀 ~ result:", result);

// 2. Vòng lặp không xác định trước số lần lặp: while, do while
// - 1. condition = true thì chạy vòng lặp. áp dụng toán tử so sánh, boolean.
// - 2. condition = false để thoát bất kì vòng lặp nào
// var i = 1;
// var total = 0;

// while (i <= 10) {
//    console.log(`Lần lặp thứ: ${i}`);
//    total += i;
//    i++; // i  trả về 1 nhưng từ đoạn code này trở đi i đã tăng lên thành 2
// }

//Vòng lặp do while
//=> Giống while, chỉ khác thứ tự
/*
 * while: kiểm tra trước => chạy sau
 * do while: chạy trước => kiểm tra sau
 * do while sẽ chạy 1 lần trước rồi mới kiểm tra điều kiện
 */

// var i = 8;
// do {
//    console.log(i);
//    i++;
// } while (i > 10);

// Bài tập: Mô phỏng quá trình rút tiền ATM
// */

// var money = 5350000;

//Trả về về số lượng theo từng mệnh giá

//10 x 500000
//1 x 200000
//1 x 100000
//1 x 50000

// var $500 = 0,
//    $200 = 0,
//    $100 = 0,
//    $50 = 0;

// if (money % 50 === 0) {
//    while (money > 0) {
//       if (money >= 500000) {
//          $500 = money / 500000; // 10.
//          $500 = $500 - ($500 % 1); //10
//          money -= $500 * 500000;// 350000
//       }

//       if (200000 <= money < 500000) {
//          $200 = money / 200000;
//          $200 = $200 - ($200 % 1);
//          money -= $200 * 200000;
//       }

//       if (100000 <= money < 200000) {
//          $100 = money / 100000;
//          $100 = $100 - ($100 % 1);
//          money -= $100 * 100000;
//       }

//       if (money < 100000) {
//          $50 = money / 50000;
//          $50 = $50 - ($50 % 1);
//          money -= $50 * 50000;
//       }
//    }
// }

// console.log($500, $200, $100, $50);
// $500 = 10
// $200 = 1
// $100 = 1
// $50 = 1

// var i = 1;
// var total = 0;

// while (i <= 10) {
//    if (i === 5) {
//       continue;
//    }
//    console.log(`Lần lặp thứ: ${i}`);
//    total += i;

//    i++; // i  trả về 1 nhưng từ đoạn code này trở đi i đã tăng lên thành 2
// }
