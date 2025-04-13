# Express Typescript (with Bun)

## Shortcut Script

```bash
bun dev
```

```bash
bun build
```

```bash
bun start
```

```bash
bun lint
```

```bash
bun lint-fix
```

```bash
bun prettier
```

```bash
bun prettier-fix
```

```bash
bun check-format
```

```bash
bun fix-format
```

## Khởi tạo dự án

```bash
bun init -y
```

## Tạo files

src/type.d.ts

## Install dependencies

### ESLint

```bash
npm init @eslint/config@latest
```

```bash
? How would you like to use ESLint? …
  To check syntax only
❯ To check syntax and find problems

? What type of modules does your project use? …
❯ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? …
  React
  Vue.js
❯ None of these

? Does your project use TypeScript? …
  No
❯ Yes

? Where does your code run? …  (Press <space> to select, <a> to toggle all, <i> to invert selection)
  Browser
✔ Node

The config that you′ve selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint
? Would you like to install them now? › No / Yes

? Which package manager do you want to use? …
  npm
  yarn
  pnpm
❯ bun

```

Kết quả:

```bash
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · node
The config that you′ve selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · bun

```

### Prettier

```bash
bun add prettier eslint-config-prettier eslint-plugin-prettier tsx tsc-alias rimraf --save-dev

```

## Configuration

### Cấu hình tsconfig.json

```json
{
  "compilerOptions": {
    // Environment setup & latest features
    "lib": ["esnext"],
    "target": "ESNext",
    "module": "ESNext",
    "moduleDetection": "force",
    "allowJs": false,

    // Bundler mode
    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "noEmit": false,

    // Best practices
    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,
    "noUncheckedIndexedAccess": true,

    // Some stricter flags (disabled by default)
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noPropertyAccessFromIndexSignature": true,

    "outDir": "dist",
    "esModuleInterop": true,
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"]
    }
  },
  "files": ["src/type.d.ts"],
  "include": ["src/**/*"]
}
```

### Cấu hình file config cho ESLint

_eslint.config.js_

```JavaScript
import globals from 'globals'
import pluginJs from '@eslint/js'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'

/** @type {import('eslint').Linter.Config[]} */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    plugins: {
      prettier: eslintPluginPrettier
    },
    rules: {
      // Cảnh báo đang sử dụng debugger
      'no-debugger': 'warn',

      // Cảnh báo đang sử dụng console
      'no-console': 'warn',

      // Cảnh báo nếu xuống hàng nhiều hơn 1 dòng
      'no-multiple-empty-lines': ['warn', { max: 1 }],

      // Cảnh báo khi sử dụng loại 'any' trong TypeScript
      '@typescript-eslint/no-explicit-any': 'off',

      // Cảnh báo khi có biến không được sử dụng
      '@typescript-eslint/no-unused-vars': 'warn',

      // Cấu hình Prettier để định dạng mã nguồn
      'prettier/prettier': [
        'warn', // Cảnh báo cho các vấn đề của Prettier
        {
          semi: false,
          // Sử dụng dấu nháy đơn cho chuỗi
          singleQuote: true,
          // Sử dụng dấu nháy đơn trong JSX
          trailingComma: 'none',
          // Giới hạn độ dài dòng là 120 ký tự
          printWidth: 120,
          // Sử dụng 2 khoảng trắng để thụt đầu dòng
          tabWidth: 2,
          // Giữ nguyên các kết thúc dòng hiện có
          endOfLine: 'auto'
        }
      ]
    },
    ignores: ['**/node_modules/', '**/dist/']
  }
]
```

### Cấu hình file config cho Prettier

_.prettierrc_

```json
{
  "semi": false,
  "singleQuote": true,
  "trailingComma": "none",
  "endOfLine": "auto",
  "printWidth": 120,
  "tabWidth": 2
}
```

_.prettierignore_

```
node_modules/
dist/
```

### Cấu hình file gitignore

```
dist/
...
```

### Config editor để chuẩn hóa cấu hình editor

_.editorconfig_

```
[*]
indent_size = 2
indent_style = space
```

### Cấu hình file package.json

```json
{
  "scripts": {
    "dev": "bun --watch run ./src/app.ts",
    "build": "rimraf ./dist && tsc && tsc-alias",
    "start": "bun dist/app.js",
    "lint": "eslint .",
    "lint-fix": "eslint . --fix",
    "prettier": "prettier --check .",
    "prettier-fix": "prettier --write .",
    "check-format": "bun lint && bun prettier",
    "fix-format": "bun lint-fix && bun prettier-fix",
  },
  "devDependencies": ...
}

```

## Giải thích cấu hình `tsconfig.json`

File `tsconfig.json` này giống như một "bản hướng dẫn" mà bạn đưa cho TypeScript, bảo nó: "Này, hãy biên dịch code của tôi theo cách này nhé!". Nó giúp TypeScript hiểu dự án của bạn, từ cách viết code đến cách xuất file ra sao.

### 1. `"compilerOptions"` – Bộ điều khiển chính của TypeScript

Phần này giống như bảng điều khiển trung tâm, nơi bạn đặt ra các quy tắc để TypeScript xử lý code.

#### `"lib": ["ESNext"]`

- **Nó là gì?**: Đây là danh sách các "hộp công cụ" JavaScript mà TypeScript sẽ dùng. `"ESNext"` nghĩa là dùng tất cả các tính năng mới nhất của JavaScript.
- **Dễ hiểu hơn**: Giống như bạn nói với TypeScript: "Cho tôi dùng toàn bộ đồ chơi xịn nhất của JavaScript, như `async/await` hay `Promise`, mà không cần cài thêm gì cả".
- **Ví dụ**: Bạn có thể viết `await fetchData()` mà không lo TypeScript kêu ca.

#### `"target": "ESNext"`

- **Nó là gì?**: Quyết định phiên bản JavaScript mà code của bạn sẽ biến thành sau khi biên dịch. `"ESNext"` là phiên bản mới nhất.
- **Dễ hiểu hơn**: "Tôi muốn code của mình sau khi biên dịch vẫn là JavaScript hiện đại nhất, để tận dụng hết các tính năng mới."
- **Ví dụ**: Code của bạn sẽ chạy được trên Node.js phiên bản mới mà không bị lỗi cú pháp cũ.

#### `"module": "ESNext"`

- **Nó là gì?**: Quy định cách bạn tổ chức code thành các "module" (khối code có thể tái sử dụng). `"ESNext"` dùng chuẩn module mới nhất.
- **Dễ hiểu hơn**: "Tôi muốn dùng `import` và `export` kiểu hiện đại để chia sẻ code giữa các file."
- **Ví dụ**: Bạn có thể viết `import express from 'express'` thay vì cách cũ như `require`.

#### `"moduleDetection": "force"`

- **Nó là gì?**: Buộc TypeScript luôn nhìn các file của bạn như module.
- **Dễ hiểu hơn**: "Đừng đoán lung tung, cứ coi mọi file của tôi là module đi cho chắc."
- **Ví dụ**: Đảm bảo TypeScript không nhầm lẫn khi bạn quên khai báo module.

#### `"allowJs": false`

- **Nó là gì?**: Không cho phép TypeScript biên dịch file JavaScript, chỉ làm việc với file TypeScript.
- **Dễ hiểu hơn**: "Tôi chỉ muốn dùng TypeScript thôi, đừng đụng đến file `.js` cũ của tôi."
- **Ví dụ**: Nếu bạn có file `script.js`, nó sẽ bị bỏ qua.

#### `"moduleResolution": "bundler"`

- **Nó là gì?**: Quy định cách TypeScript tìm các module. `"bundler"` phù hợp với các công cụ như Webpack.
- **Dễ hiểu hơn**: "Hãy tìm module theo cách mà các công cụ đóng gói code hay dùng."
- **Ví dụ**: Giúp TypeScript hiểu cách Express được import đúng cách.

#### `"verbatimModuleSyntax": false`

- **Nó là gì?**: Cho phép TypeScript linh hoạt hơn với cú pháp module.
- **Dễ hiểu hơn**: "Đừng quá khắt khe với cách tôi viết `import`, cứ linh hoạt đi."
- **Ví dụ**: Bạn có thể dùng kiểu import hơi "lạ" mà vẫn không bị lỗi.

#### `"noEmit": false`

- **Nó là gì?**: Cho phép TypeScript xuất file `.js` sau khi biên dịch.
- **Dễ hiểu hơn**: "Sau khi xong, hãy tạo file JavaScript cho tôi dùng nhé."
- **Ví dụ**: File `app.ts` sẽ thành `app.js` trong thư mục `dist`.

#### `"strict": true`

- **Nó là gì?**: Bật chế độ "nghiêm khắc" để TypeScript kiểm tra code kỹ hơn.
- **Dễ hiểu hơn**: "Hãy bắt lỗi tôi thật chặt chẽ để tôi không viết code bừa bãi."
- **Ví dụ**: Nếu bạn quên khai báo kiểu dữ liệu, TypeScript sẽ la lên ngay.

#### `"skipLibCheck": true`

- **Nó là gì?**: Bỏ qua việc kiểm tra file định nghĩa của thư viện bên thứ ba.
- **Dễ hiểu hơn**: "Đừng mất công kiểm tra mấy file của thư viện, cứ tin nó đi cho nhanh."
- **Ví dụ**: Làm biên dịch nhanh hơn khi dùng Express hoặc các thư viện lớn.

#### `"noFallthroughCasesInSwitch": true`

- **Nó là gì?**: Đảm bảo mỗi nhánh trong `switch` phải kết thúc rõ ràng (bằng `break` hoặc `return`).
- **Dễ hiểu hơn**: "Đừng để code tôi chạy lung tung trong `switch`, bắt lỗi nếu tôi quên `break`."
- **Ví dụ**: Ngăn lỗi khi bạn quên kết thúc một nhánh.

#### `"noUnusedLocals": true` và `"noUnusedParameters": true`

- **Nó là gì?**: Báo lỗi nếu có biến hoặc tham số không dùng tới.
- **Dễ hiểu hơn**: "Nếu tôi khai báo gì mà không xài, hãy nhắc tôi dọn dẹp."
- **Ví dụ**: `let x = 5` mà không dùng `x` sẽ bị báo lỗi.

#### `"noPropertyAccessFromIndexSignature": true` và `"noUncheckedIndexedAccess": true`

- **Nó là gì?**: Ngăn bạn truy cập thuộc tính không rõ ràng từ một object.
- **Dễ hiểu hơn**: "Đừng để tôi gọi nhầm thứ không tồn tại, bắt lỗi tôi đi."
- **Ví dụ**: Nếu bạn gọi `obj.randomProp` mà `randomProp` không được định nghĩa, TypeScript sẽ báo.

> [!TIP]
> Phía dưới cùng mình sẽ giải thích thêm sự khác nhau của giữa 2 config nhé

#### `"outDir": "dist"`

- **Nó là gì?**: Nơi lưu các file `.js` sau khi biên dịch.
- **Dễ hiểu hơn**: "Đưa hết file JavaScript sau khi xong vào thư mục `dist` cho gọn."
- **Ví dụ**: File `src/app.ts` sẽ thành `dist/app.js`.

#### `"esModuleInterop": true`

- **Nó là gì?**: Làm cho việc dùng module kiểu cũ (CommonJS) dễ hơn.
- **Dễ hiểu hơn**: "Giúp tôi import mấy thư viện cũ một cách mượt mà."
- **Ví dụ**: Bạn có thể dùng `import express from 'express'` dễ dàng.

#### `"baseUrl": "."` và `"paths": { "@/*": ["src/*"] }`

- **Nó là gì?**: Đặt đường dẫn gốc và tạo "biệt danh" cho module.
- **Dễ hiểu hơn**: "Từ giờ, thay vì viết đường dẫn dài, tôi chỉ cần dùng `@` để trỏ vào `src`."
- **Ví dụ**: `import { helper } from '@/utils'` thay vì `import { helper } from '../../utils'`.

---

**Cấu hình `tsconfig.json` của dự án Next.js**

```json
{
  "compilerOptions": {
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "lib": ["dom", "dom.iterable", "esnext"],
    "plugins": [
      {
        "name": "next"
      }
    ]
  },
  "exclude": ["node_modules"]
}
```

#### `"resolveJsonModule": true`

- **Nó là gì?**: Cho phép TypeScript import và xử lý các file JSON như một module bình thường.
- **Dễ hiểu hơn**: "Tôi muốn lấy dữ liệu từ file JSON dễ dàng như khi import một file code vậy."
- **Ví dụ**: Bạn có thể viết `import data from './data.json';` và TypeScript sẽ hiểu `data` là một object chứa nội dung của file JSON đó.

#### `"isolatedModules": true`

- **Nó là gì?**: Yêu cầu TypeScript coi mỗi file là một module độc lập, không dựa vào các file khác khi biên dịch.
- **Dễ hiểu hơn**: "Hãy để mỗi file tự sống cuộc đời riêng của nó, đừng phức tạp hóa mọi thứ."
- **Ví dụ**: Điều này hữu ích khi Next.js dùng Babel để biên dịch code, giúp quá trình nhanh hơn và ít lỗi hơn.

#### `"jsx": "preserve"`

- **Nó là gì?**: Quy định TypeScript giữ nguyên mã JSX thay vì biến đổi nó.
- **Dễ hiểu hơn**: "Cứ để JSX của tôi nguyên vẹn, tôi sẽ để Next.js hoặc React xử lý sau."
- **Ví dụ**: Khi bạn viết `<div>Xin chào</div>`, TypeScript không can thiệp mà để nguyên cho công cụ khác xử lý cú pháp này.

#### `"incremental": true`

- **Nó là gì?**: Giúp TypeScript chỉ biên dịch lại những file đã thay đổi thay vì toàn bộ dự án.
- **Dễ hiểu hơn**: "Hãy nhớ lần trước tôi làm gì để lần này làm nhanh hơn nhé."
- **Ví dụ**: Nếu bạn chỉ chỉnh sửa một file, TypeScript sẽ không mất công biên dịch lại tất cả, tiết kiệm thời gian.

#### `"lib": ["dom", "dom.iterable", "esnext"]`

- **Nó là gì?**: Danh sách các thư viện mà TypeScript sử dụng để hiểu các API của JavaScript và trình duyệt.
- **Dễ hiểu hơn**: "Cho tôi dùng các tính năng của trình duyệt, các vòng lặp DOM, và cả JavaScript mới nhất."
- **Ví dụ**:
  - `document.querySelector` (từ `dom`).
  - Dùng `for...of` với các phần tử DOM (từ `dom.iterable`).
  - Viết `async/await` (từ `esnext`).

#### `"plugins": [{ "name": "next" }]`

- **Nó là gì?**: Kích hoạt plugin của Next.js để TypeScript hiểu và hỗ trợ tốt hơn các tính năng của framework này.
- **Dễ hiểu hơn**: "Hãy thêm công cụ đặc biệt của Next.js để TypeScript làm việc ngon hơn với nó."
- **Ví dụ**: Nhờ plugin này, TypeScript sẽ nhận diện được các hàm như `getServerSideProps` hay `getStaticProps` mà không báo lỗi.

---

### 2. Cấu hình ngoài `compilerOptions`

#### `"exclude": ["node_modules"]`

- **Nó là gì?**: Chỉ định TypeScript bỏ qua việc biên dịch các file hoặc thư mục được liệt kê.
- **Dễ hiểu hơn**: "Đừng đụng vào `node_modules`, ở đó không phải việc của tôi."
- **Ví dụ**: TypeScript sẽ không kiểm tra hay biên dịch hàng tá file trong `node_modules`, giúp quá trình biên dịch nhẹ nhàng hơn.

#### `"files": ["src/type.d.ts"]`

- **Nó là gì?**: Chỉ định file cụ thể mà TypeScript sẽ biên dịch.
- **Dễ hiểu hơn**: "Tôi muốn TypeScript nhìn vào file `src/type.d.ts`."
- **Ví dụ**: Dùng để khai báo kiểu dữ liệu đặc biệt, nhưng thường ta sẽ dùng `include` để bao quát hơn.

#### `"include": ["src/**/*"]`

- **Nó là gì?**: Quy định những file nào sẽ được TypeScript xử lý.
- **Dễ hiểu hơn**: "Hãy biên dịch hết mọi thứ trong thư mục `src` và các thư mục con của nó."
- **Ví dụ**: Tất cả file `.ts` trong `src` sẽ được xử lý.

---

### 3. `"noUncheckedIndexedAccess": true` và `"noPropertyAccessFromIndexSignature": true` khác gì nhau

Để trả lời câu hỏi về sự khác biệt giữa `"noUncheckedIndexedAccess": true` và `"noPropertyAccessFromIndexSignature": true` trong TypeScript, chúng ta sẽ xem xét từng cấu hình và cách chúng ảnh hưởng đến việc truy cập thuộc tính trong các đối tượng có index signature.

#### `"noUncheckedIndexedAccess": true` là gì?

- **Ý nghĩa**: Khi bật tùy chọn này trong TypeScript, việc truy cập một thuộc tính thông qua index signature sẽ luôn được coi là có thể trả về `undefined`. Điều này áp dụng ngay cả khi bạn không chắc chắn liệu thuộc tính đó có thực sự tồn tại trong đối tượng hay không.

- **Ảnh hưởng**: TypeScript sẽ yêu cầu bạn kiểm tra giá trị của thuộc tính trước khi sử dụng, để đảm bảo rằng nó không phải là `undefined`. Tuy nhiên, bạn vẫn có thể dùng cú pháp `obj.prop` để truy cập.

- **Ví dụ**:

  ```typescript
  interface User {
    [key: string]: string
  }
  const user: User = { name: 'Alice' }
  const age = user.age // Lỗi: TypeScript coi age có thể là undefined
  ```

  Để tránh lỗi, bạn cần kiểm tra như sau:

  ```typescript
  if (user.age !== undefined) {
    console.log(user.age) // An toàn
  }
  ```

#### `"noPropertyAccessFromIndexSignature": true` là gì?

- **Ý nghĩa**: Tùy chọn này nghiêm ngặt hơn về mặt cú pháp. Nó cấm bạn sử dụng cú pháp obj.prop để truy cập các thuộc tính không được khai báo rõ ràng trong kiểu dữ liệu (tức là các thuộc tính chỉ tồn tại qua index signature). Thay vào đó, bạn phải dùng cú pháp obj["prop"].

- **Ảnh hưởng**: Điều này giúp bạn nhận ra rằng bạn đang truy cập một thuộc tính động (dynamic property) và cần cẩn thận hơn. Tuy nhiên, nó không tự động yêu cầu kiểm tra undefined trừ khi kết hợp với các tùy chọn khác.

- **Ví dụ**:

  ```typescript
  interface User {
    [key: string]: string
  }
  const user: User = { name: 'Alice' }
  const age = user.age // Lỗi: Không được phép dùng cú pháp này
  ```

  Cách đúng là:

  ```typescript
  const age = user['age'] // chỉ được phép truy cập kiểu này
  if (age !== undefined) {
    console.log(age) // Vẫn cần kiểm tra nếu muốn an toàn
  }
  ```

---

#### Sự khác biệt chính

Dưới đây là bảng so sánh để làm rõ sự khác biệt giữa hai cấu hình này trong TypeScript:

| **Tùy chọn**                                 | **Tập trung vào**     | **Cú pháp cho phép**          | **Yêu cầu kiểm tra `undefined`**      |
| -------------------------------------------- | --------------------- | ----------------------------- | ------------------------------------- |
| `"noUncheckedIndexedAccess": true`           | Giá trị (`undefined`) | `obj.prop` hoặc `obj["prop"]` | Có                                    |
| `"noPropertyAccessFromIndexSignature": true` | Cú pháp truy cập      | Chỉ `obj["prop"]`             | Không (trừ khi kết hợp tùy chọn khác) |

- `"noUncheckedIndexedAccess": true:`

  - Quan tâm đến giá trị: Đảm bảo bạn không giả định một thuộc tính luôn tồn tại và có giá trị.

  - Cho phép cả hai cú pháp (`obj.prop` và `obj["prop"]`), nhưng bắt buộc kiểm tra `undefined`.

- `"noPropertyAccessFromIndexSignature": true:`

  - Quan tâm đến cú pháp: Ngăn bạn dùng `obj.prop` cho các thuộc tính động, buộc dùng `obj["prop"]`.

  - Không tự động yêu cầu kiểm tra `undefined`, nhưng điều này vẫn là tốt để thực hiện.

---

#### Khi nào nên dùng cái nào?

- `Dùng "noUncheckedIndexedAccess": true`: Nếu bạn muốn code an toàn hơn bằng cách luôn kiểm tra các giá trị có thể là `undefined` khi truy cập thuộc tính qua index signature.

- Dùng `"noPropertyAccessFromIndexSignature": true`: Nếu bạn muốn code rõ ràng hơn, phân biệt giữa thuộc tính tĩnh (được khai báo rõ ràng) và thuộc tính động (qua index signature).

Bạn cũng có thể bật cả hai tùy chọn cùng lúc để tăng cường độ an toàn và rõ ràng, nhưng điều này có thể khiến việc viết code phức tạp hơn một chút.

### Tóm lại

File `tsconfig.json` này giống như một người bạn nghiêm khắc nhưng tốt bụng: nó giúp bạn viết code TypeScript hiện đại, an toàn, và dễ bảo trì cho dự án Express Node.js. Nó:

- Dùng JavaScript mới nhất (`ESNext`).
- Kiểm tra code chặt chẽ (`strict`).
- Tạo file `.js` trong `dist` để bạn chạy bằng Node.js.
- Làm việc với module kiểu mới (`import/export`).
- Giúp bạn import dễ hơn với alias `~`.

Với config của nextjs thì:

- Import file JSON một cách dễ dàng.
- Biên dịch nhanh hơn nhờ `incremental` và `isolatedModules`.
- Giữ nguyên mã JSX để Next.js xử lý.
- Sử dụng các tính năng hiện đại của JavaScript và trình duyệt qua `lib`.
- Tích hợp mượt mà với Next.js nhờ plugin `"next"`.
- Loại bỏ việc biên dịch không cần thiết trong `node_modules`.

---

## Tạo cấu hình `tsc-alias`

Để cấu hình `tsc-alias`, bạn cần thực hiện các bước sau:

### 1. Cài đặt `tsc-alias` bằng cách chạy lệnh sau trong terminal:

```
npm install --save-dev tsc-alias
```

### 2. Tạo một file `paths.json` trong thư mục dự án của bạn, trong đó chứa các alias và đường dẫn đến các module tương ứng. Ví dụ:

```json
{
  "@utils": ["src/utils"],
  "@components": ["src/components"],
  "@services": ["src/services"]
}
```

### 3. Thêm một đoạn mã sau vào file `tsconfig.json` của bạn:

```json
{
  "compilerOptions": {
    // ...
    "paths": {
      "@utils/*": ["src/utils/*"],
      "@components/*": ["src/components/*"],
      "@services/*": ["src/services/*"]
    }
  }
}
```

### 4. Chạy lệnh sau để tạo ra các alias:

```
npx tsc-alias
```

### 5. Sau khi chạy lệnh trên, bạn có thể sử dụng các alias trong mã nguồn TypeScript của mình.

Lưu ý:

- Bạn cần phải chạy lệnh `npx tsc-alias` mỗi khi bạn thay đổi file `paths.json` hoặc `tsconfig.json`.
- Bạn có thể cấu hình `tsc-alias` để tự động chạy khi bạn chạy lệnh `tsc` bằng cách thêm đoạn mã sau vào file `tsconfig.json` của bạn:

```json
{
  "compilerOptions": {
    // ...
    "plugins": [
      {
        "transform": "tsc-alias"
      }
    ]
  }
}
```

Sau đó, bạn có thể chạy lệnh `tsc` như bình thường, và `tsc-alias` sẽ tự động chạy để tạo ra các alias.
