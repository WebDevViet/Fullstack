# Package (Gói)

## Vấn đề

- Khi làm việc với bất kì dự án nào với một ngôn ngữ lập trình nào đó thì cũng phải làm sử dụng các thư viện. Và trước đây thì khi cần dùng phải lên trang chủ để tải về máy xong copy vào dự án, nhưng như vậy lại phát sinh các nhược điểm sau đó là:
  - Khó di chuyển dự án trong những trường hợp như là local lên server, local lên git, giữa các máy hoặc chia sẻ dự án cho các đồng nghiệp, ...
  - Gặp khó khăn khi gỡ bỏ hoặc cập nhật phần mềm, ứng dụng

## Giải pháp

- Công cụ quản lý thư viện (package, dependencies), thông qua store (kho lưu chữ ứng dụng), như IOS là Apple Store, window là Microsoft Store, ...
- Với js: npm, yarn, pnpm(khuyên dùng)...
- Khi làm việc với package chúng ta phải làm quan với giao diện dòng lệnh hay còn gọi là CLI (Command Line Interface), và trong dự án web khuyên dùng là gitBash vì nó có cú pháp giống với linux và tránh các lỗi không không mong muốn so với làm việc với CLI khác. Sau này khi học deploy cũng sẽ làm việc với linux nên rất tiện khi ta sử dụng gitBash.

## Khởi tạo dự án với npm

- Mở gitBash, cd vào dự án (thao tác nhanh có thể chuột phải vào folder dự án rồi chọn **Open in Integrated Terminal**)

```bash
npm init -y
```

> [!NOTE]
>
> - Hậu tố -y ở đây để chúng ta đồng ý nhanh các đề xuất liên quan đến config thông tin ban đầu của dự án với npm.

```json
{
  "name": "pakage", // tên dự án
  "version": "1.0.0", // version của dự án
  "description": "", // mô tả về dự án
  // "main": "index.js", dòng này sẽ làm việc nhiều hơn khi chúng ta làm việc với BE, tạm thời xoá nó nhé
  "scripts": {
    // cấu hình các dòng lệnh để làm việc với dự án nhu build hoặc debug dự án, vv...
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [], // tên từ khoá tìm kiếm nếu dự án build để làm thư viện lên npm chẳng hạn
  "author": "", // tên tác giả
  "license": "ISC" // sử dụng để mô tả thông tin về giấy phép của module.
}
```

## Các chế độ cài đặt thư viện

Simple Dependencies ==> Thư viện chạy dự án (Chạy ở production)

```bash
npm i tenthuvien
```

Develop Dependencies ==> Thư viện chạy ở môi trường phát triển (Dev)

```bash
npm i --save-dev tenthuvien
npm i -D tenthuvien
```

## Cài đặt các dependencies

- Sau khi clone dự án về máy ta cần cài đặt lại các thư viện đã add vào dự án trước đó bằng những dòng lệnh dưới đây

```bash
npm i
```

Chỉ cài đặt dependencies production

```bash
npm i --product
```

## Xóa thư viện đã cài đặt

```bash
npm uninstall tenthuvien
```

## Phiên bản

- Cài đặt thư viện theo phiên bản

```bash
npm i tenthuvien@tenphienban
```

- Cập nhật phiên bản của thư viện

```bash
npm update tenthuvien
```

- Cập nhật tất cả thư viện

```bash
npm update
```

## Nơi cài đặt package

- Local
- Global: -g
