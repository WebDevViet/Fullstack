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
bun lint:fix
```

```bash
bun prettier
```

```bash
bun prettier:fix
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
    // Enable latest features
    "lib": ["ESNext"],
    "target": "ES2023",
    "module": "NodeNext",
    "moduleDetection": "force",
    "allowJs": false, // Không cho phép sử dụng file JavaScript, chỉ sử dụng TypeScript

    // Bundler mode
    "moduleResolution": "nodenext", // Sử dụng chế độ giải quyết module của Node.js
    "allowImportingTsExtensions": true, // Cho phép nhập khẩu các file .ts
    "verbatimModuleSyntax": true, // Giữ nguyên cú pháp module khi biên dịch
    "noEmit": true, // Không tạo ra file đầu ra, chỉ kiểm tra lỗi

    // Best practices
    "strict": true, // Bật tất cả các kiểm tra nghiêm ngặt
    "skipLibCheck": true, // Bỏ qua kiểm tra các file định nghĩa thư viện
    "noFallthroughCasesInSwitch": true, // Ngăn chặn trường hợp rơi xuống trong switch

    // Some stricter flags (disabled by default)
    "noUnusedLocals": true, // Báo lỗi nếu có biến cục bộ không sử dụng
    "noUnusedParameters": true, // Báo lỗi nếu có tham số không sử dụng trong hàm
    "noPropertyAccessFromIndexSignature": true, // Ngăn chặn truy cập thuộc tính từ chỉ số không xác định

    "outDir": "dist", // Đường dẫn output cho thư mục build
    "esModuleInterop": true,
    "baseUrl": ".", // Đường dẫn base cho các import
    "paths": {
      "~/*": ["src/*"] // Đường dẫn tương đối cho các import (alias)
    }
  },
  "files": ["src/type.d.ts"], // Các file dùng để defined global type cho dự án
  "include": ["src/**/*"] // Đường dẫn include cho các file cần build
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
    "dev": "bun --watch run index.ts",
    "build": "rimraf ./dist && tsc && tsc-alias",
    "start": "bun dist/index.js",
    "lint": "eslint .",
    "lint:fix": "eslint . --fix",
    "prettier": "prettier --check .",
    "prettier:fix": "prettier --write .",
    "check-format": "bun lint && bun prettier",
    "fix-format": "bun lint:fix && bun prettier:fix"
  },
  "devDependencies": ...
}

```

### Giải thích cấu hình tsconfig.json:

1. **lib**: Xác định các thư viện mà TypeScript sẽ sử dụng. Ở đây, `ESNext` cho phép sử dụng các tính năng mới nhất của ECMAScript.

2. **target**: Xác định phiên bản ECMAScript mà bạn muốn biên dịch.

3. **module**: Xác định kiểu module. `NodeNext` cho phép sử dụng cú pháp import/export mới nhất.

4. **moduleDetection**: `force` cho phép TypeScript nhận diện module ngay cả khi không có file `package.json`.

5. **jsx**: Tùy chọn này chỉ cần thiết nếu bạn đang sử dụng React. Nếu không, bạn có thể bỏ qua nó.

6. **allowJs**: Nếu bạn không cần sử dụng file JavaScript, bạn có thể đặt giá trị này là `false`.

7. **moduleResolution**: `nodenext` cho phép TypeScript sử dụng cách giải quyết module giống như Node.js.

8. **allowImportingTsExtensions**: Cho phép nhập khẩu các file TypeScript với phần mở rộng `.ts`.

9. **verbatimModuleSyntax**: Giữ nguyên cú pháp module khi biên dịch, giúp duy trì cú pháp ES Module.

10. **noEmit**: Không tạo ra file đầu ra, chỉ kiểm tra lỗi trong mã nguồn.

11. **strict**: Bật tất cả các kiểm tra nghiêm ngặt, giúp phát hiện lỗi sớm hơn.

12. **skipLibCheck**: Bỏ qua kiểm tra các file định nghĩa thư viện, giúp tăng tốc độ biên dịch.

13. **noFallthroughCasesInSwitch**: Ngăn chặn trường hợp rơi xuống trong cấu trúc switch, giúp tránh lỗi logic.

14. **noUnusedLocals**: Báo lỗi nếu có biến cục bộ không sử dụng, giúp giữ mã nguồn sạch sẽ.

15. **noUnusedParameters**: Báo lỗi nếu có tham số không sử dụng trong hàm, giúp phát hiện mã thừa.

16. **noPropertyAccessFromIndexSignature**: Ngăn chặn truy cập thuộc tính từ chỉ số không xác định, giúp bảo vệ mã nguồn.

Cấu hình này sẽ giúp bạn phát triển ứng dụng Express với TypeScript một cách hiệu quả và an toàn hơn.
