/*
TODO: Ký tự của biểu thức chính quy: /, ., [, ], +, ?, =,... ==> Muốn kiểm tra --> Thêm ký tự \ (escape)

TODO: Hoặc (|), phủ định (^)

TODO: Các ký hiệu viết tắt khác
\d ==> Đại diện cho số
\D ==> Không phải là số
\w ==> Chữ thường, hoa, số, _
\W ==> Ngược lại của \w
\s ==> Khoảng trắng
\S ==> Không phải là khoảng trắng
*/

// const phone = "0388875179";
// const pattern = /^(0|\+84)[0-9]{9}$/;
// console.log(pattern.test(phone));

// const str = `@!@#$`;
// const pattern = /^[^a-zA-Z0-9 ]+$/;
// console.log(pattern.test(str));

/*
Kiểm tra username hợp lệ: 
- Chỉ chấp nhận chữ thường, số, -, _
- Độ dài từ 5 ký tự trở lên
- Bắt đầu bằng chữ thường hoặc gạch dưới
*/
// const username = `hoanganit19`;
// const pattern = /^[a-z_][a-z0-9_-]{4,}$/;
// console.log(pattern.test(username));

/*
Kiểm tra email hợp lệ
username@domain.ext
1. username
- Bắt đầu bằng chữ cái (cả hoa cả thường)
- Chấp nhận chữ HOA, thường, gạch dưới, gạch ngang, . và số
- Kí tự cuối của username chỉ được các kí tự là chữ cái và số
- Tối thiểu 3 ký tự trở lên

2. domain
- Bắt đầu bằng chữ cái
- Chấp nhận chữ HOA, thường, gạch dưới, gạch ngang, . và số
- Kí tự trước dấu "." trong domain chỉ được các kí tự là chữ cái và số
- Tối thiểu 1 ký tự

3. ext
- Chữ cái thường, HOA
- Tối thiểu 2 ký tự

Test: 
khai.com-@gmail.com ==> failed
khai.com@fullstack-.edu.vn ==> failed
khai.com@fullstack.edu-.vn ==> failed
*/

// ^[a-zA-Z][\w.-]+[a-zA-Z0-9]@([a-zA-Z]|[a-zA-Z][\w-]*[a-zA-Z0-9])\.([\w-]*[a-zA-Z0-9]\.)*[a-zA-Z]{2,}$

// const content = `Xin chao anh em, toi la 0388875179 abc xtz 0123456789`;

// const pattern = /(0|\+84)\d{9}/giu;

// TODO:
/**
 * Multiline: m - khớp trên nhiều dòng
 * Global flag: g - khớp tất cả nếu đủ điều kiện
 * Ignore case: i - Không phân biệt chữ hoa và chữ thường
 * Unicode: u - Chấp nhận kí tự đặc biệt hay nói cách khác là khớp cả tiếng việt có dấu
 */

// const phones = content.match(pattern);
// console.log(phones); // result:[ '0388875179', '0123456789' ]

// TODO: Capturing Group: Kỹ thuật chụp lại 1 phần của biểu thức để trả về kết quả. Thêm cặp ngoặc ()
// TODO: Non-Capturing Group: Ko chụp lại. (?:abcxyz). Thường áp dụng cho các cặp ngoặc xử lý chuỗi chứ ko nhằm mục đích capturing
// ! ==> Lưu ý: Không hỗ trợ với global

// const email = `abc.xyz@nodejs.fullstack.edu.vn`;
// const pattern =
//   /^([a-zA-Z][a-zA-Z0-9-_.]+[a-zA-Z0-9])@(?:[a-zA-Z]|[a-zA-Z0-9-_]*[a-zA-Z0-9])\.(?:[a-zA-Z0-9-_]*[a-zA-Z0-9]\.)*[a-zA-Z]{2,}$/;
// const result = email.match(pattern);
// console.log(result);

/** Lazy, Greedy
 * Greedy: là khi dùng dấu . nó bị tham lam vượt quá biểu thức mong muốn, ví dụ pattern là /<img .*src="(.+)".*\/>/
 * dùng cho <img><img src="./" alt=""></img>
 * => result: "./" alt=""
 * Nhưng mong muốn là lấy "./" thôi cuối cùng nó lấy cả ./" alt=", làm nó hiểu lầm " của alt là kí tự cuối cùng để kểt thúc để capturing
 * Nên chúng ta phải dùng lazy để fix lại theo mong muốn của ta, bằng cách thêm dấu "?" sau dấu "+"
 * /<img .*src="(.+?)".*\/>/
 */

//Thay thế
// const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the abc.xyz@gmail.com industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but hoangan@fullstack.edu.vn also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.`;

// const pattern =
//   /(([a-zA-Z][a-zA-Z0-9-_.]+[a-zA-Z0-9])@([a-zA-Z]|[a-zA-Z0-9-_]*[a-zA-Z0-9])\.([a-zA-Z0-9-_]*[a-zA-Z0-9]\.)*[a-zA-Z]{2,})/g;

// const result = content.replace(
//   pattern,
//   `<a href="mailto:$1" title="Username: $2">$1</a>`
// );
// document.body.innerHTML = result;

// TODO: Đối sánh chuỗi: Lấy các giá trị đã capturing để đưa ngược vào lại chuỗi thay thế
/*
group 1 ==> $1
group 2 ==> $2
group 3 ==> $3
group n ==> $n
*/

// let url = `https://fullstack.edu.vn///`
// const pattern = /\/+$/g
// url = url.replace(pattern, '')
// console.log(url)

//Package (npm)
//Module Bundler

const content = `Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the abc@gmail.com industry's standard dummy text ever since the 1500s, when an  xyz@hotmail.vn`

const pattern =
  /(([a-zA-Z][a-zA-Z0-9-_.]+[a-zA-Z0-9])@([a-zA-Z]|[a-zA-Z0-9-_]*[a-zA-Z0-9])\.([a-zA-Z0-9-_]*[a-zA-Z0-9]\.)*[a-zA-Z]{2,})/g

const result = content.replace(pattern, `<a href="mailto:$1" title="Username: $2">$1</a>`)
document.body.innerHTML = result
console.log('🚀 ~ result:', result)
