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
    "lib": ["ESNext"],
    "target": "ES2023",
    "module": "ES2022",
    "moduleDetection": "force",
    "allowJs": false,

    "moduleResolution": "bundler",
    "verbatimModuleSyntax": true,
    "noEmit": false,

    "strict": true,
    "skipLibCheck": true,
    "noFallthroughCasesInSwitch": true,

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

File `tsconfig.json` này giống như một "bản hướng dẫn" mà bạn đưa cho TypeScript, bảo nó: "Này, hãy biên dịch code của tôi theo cách này nhé!". Nó giúp TypeScript hiểu dự án của bạn, từ cách viết code đến cách xuất file ra sao. Với một dự án Express Node.js, đây là cách mình giải thích từng phần trong config của bạn:

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

#### `"noPropertyAccessFromIndexSignature": true`

- **Nó là gì?**: Ngăn bạn truy cập thuộc tính không rõ ràng từ một object.
- **Dễ hiểu hơn**: "Đừng để tôi gọi nhầm thứ không tồn tại, bắt lỗi tôi đi."
- **Ví dụ**: Nếu bạn gọi `obj.randomProp` mà `randomProp` không được định nghĩa, TypeScript sẽ báo.

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

### 2. `"files": ["src/type.d.ts"]`

- **Nó là gì?**: Chỉ định file cụ thể mà TypeScript sẽ biên dịch.
- **Dễ hiểu hơn**: "Tôi muốn TypeScript chỉ nhìn vào file `src/type.d.ts` này thôi."
- **Ví dụ**: Dùng để khai báo kiểu dữ liệu đặc biệt, nhưng thường ta sẽ dùng `include` để bao quát hơn.

---

### 3. `"include": ["src/**/*"]`

- **Nó là gì?**: Quy định những file nào sẽ được TypeScript xử lý.
- **Dễ hiểu hơn**: "Hãy biên dịch hết mọi thứ trong thư mục `src` và các thư mục con của nó."
- **Ví dụ**: Tất cả file `.ts` trong `src` sẽ được xử lý.

---

## Tóm lại

File `tsconfig.json` này giống như một người bạn nghiêm khắc nhưng tốt bụng: nó giúp bạn viết code TypeScript hiện đại, an toàn, và dễ bảo trì cho dự án Express Node.js. Nó:

- Dùng JavaScript mới nhất (`ESNext`).
- Kiểm tra code chặt chẽ (`strict`).
- Tạo file `.js` trong `dist` để bạn chạy bằng Node.js.
- Làm việc với module kiểu mới (`import/export`).
- Giúp bạn import dễ hơn với alias `~`.

Hy vọng giải thích này giúp bạn hiểu rõ hơn và tự tin bắt đầu với TypeScript nhé! Nếu cần hỏi thêm, cứ thoải mái nha!
