# Cách hoạt động của debug

- Thư viện debug cho phép bạn tạo ra một hàm log với tên (namespace) tùy ý.

- Ví dụ:

```typescript
import debug from 'debug'

const log = debug('my-app:db')
log('Connected to database')
```

→ Khi chạy, nếu bạn bật biến môi trường DEBUG=my-app:db, thì log này sẽ hiện ra.

- Nếu bạn không bật DEBUG, thì log sẽ bị ẩn (không in ra console).

## Vậy 'node-js-mongoose:server' trong `debug('node-js-mongoose:server')` là gì?

- Chỉ là một chuỗi bạn đặt để phân biệt logger này với logger khác.

- Thông thường người ta đặt theo cấu trúc project:module hoặc app:feature để dễ lọc.

- Ví dụ:
  - node-js-mongoose:server → log liên quan đến server
  - node-js-mongoose:db → log liên quan đến database
  - node-js-mongoose:auth → log liên quan đến authentication

## Cách bật log

Trong terminal, bạn chạy:

```bash
DEBUG=node-js-mongoose:server node app.js
```

→ Khi đó, các dòng debuggerMongoose('Listening on ...') sẽ hiện ra.

Bạn cũng có thể bật nhiều namespace cùng lúc:

```bash
DEBUG=node-js-mongoose:\* node app.js
```

→ Tất cả log có prefix node-js-mongoose: sẽ hiện.

---

👉 Tóm lại: node-js-mongoose:server chỉ là một label string bạn tự đặt, không có "nguồn" nào khác. Nó giúp bạn bật/tắt log theo namespace bằng biến môi trường DEBUG.

## Cài đặt

```bash
bun add debug
```

```bash
bun add @types/debug -d
```

- Khi dùng

```bash
DEBUG=node-js-mongoose:server bun app.js
```
