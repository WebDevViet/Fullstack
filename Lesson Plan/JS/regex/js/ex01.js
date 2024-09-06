//Biểu thức chính quy
// - Biểu thức để xử lý chuỗi nâng cao
// - Viết bằng ngôn ngữ Perl
// - 3 chức năng chính: so khớp, cắt chuỗi, thay thế
// ==> Học cách viết các biểu thức

//Cú pháp:
// Ví dụ: const pattern = /hoangan/g

// const pattern = /hoangan/g;
// console.log(pattern);
// const pattern = new RegExp("hoangan", "g");
// console.log(pattern);

//Các hàm xử lý regex trong JS
//1. test() ==> So khớp
//2. match() ==> Cắt chuỗi
//3. replace() ==> Thay thế

//Các kí hiệu cơ bản
/*
string ==> Khớp string có nằm trong chuỗi hay không?
^ ==> Khớp biểu thức ở đầu chuỗi
$ ==> Khớp biểu thức ở cuối chuỗi
. Khớp mọi kí tự
[min-max] ==> Khớp các ký tự từ min đến max
Lưu ý: min, max có thể là: ký tự hoa, ký tự thường, số
[char_list] ==> Danh sách các ký tự muốn kiểm tra
Lưu ý: Trong 1 cặp ngoặc [], có thể đưa nhiều điều kiện, tuy nhiên sẽ được kết hợp với nhau theo điều kiện HOẶC
{min,max} ==> Thiết lập độ dài cho biểu thức từ min đến max ký tự
{min,} ==> Độ dài >=min ký tự
{value} ==> Độ dài cố định
Ký hiệu viết tắt độ dài
{0,} ==> *
{1,} ==> +
{0,1} ==> ?
*/
const str = `hoangan@123`
const pattern = /[a-d]/
console.log(pattern.test(str))

const pattern2 = /abc/
const str1 = 'abc'
const str2 = 'ABC'
const str3 = 'cba'
const str4 = 'abcd'
const str5 = 'zabcd'

pattern2.test(str1) // true
pattern2.test(str2) // false
pattern2.test(str3) // false
pattern2.test(str4) // true
pattern2.test(str5) // true
