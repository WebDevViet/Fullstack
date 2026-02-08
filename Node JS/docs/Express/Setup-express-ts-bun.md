# Express Typescript (with Bun)

## Shortcut Script

```bash
bun dev
```

```bash
bun build
```

```bash
bun build-rollup
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

## Tạo files khai báo kiểu dữ liệu global

src/type.d.ts

## Tạo file config editor

_.editorconfig_

```
[*]
indent_size = 2
indent_style = space
```

## Cấu hình file gitignore

```
# Other files to ignore
uploads/
ssl/
...
```

## Prettier - ESLint

```bash
bun add prettier eslint eslint-config-prettier rimraf -d
```

- prettier: Code formatter chính
- eslint-config-prettier: Cấu hình ESLint để không bị xung đột với Prettier
- rimraf: Dùng để xóa folder dist khi trước khi build

### Prettier

- Tạo 2 file ở root: **.prettierrc** và **.prettierignore**

_.prettierrc_

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "printWidth": 120,
  "tabWidth": 2,
  "endOfLine": "auto"
}
```

_.prettierignore_

```
.husky

dist/
node_modules/

bun.lockb
commitlint.config.js
```

- Cài extensions-vscode: **ESlint, Prettier, Prettier ESlint**

### ESLint

```bash
npm init @eslint/config@latest
```

```bash
? What do you want to lint? ...
(*) JavaScript
( ) JSON
( ) JSON with comments
( ) JSON5
( ) Markdown
( ) CSS

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

? Which language do you want your configuration file be written in? ...
❯ JavaScript
  TypeScript

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
✔ What do you want to lint? · JavaScript
✔ How would you like to use ESLint? · problems
✔ What type of modules does your project use? · esm
✔ Which framework does your project use? · none
✔ Does your project use TypeScript? · typescript
✔ Where does your code run? · node
✔ Which language do you want your configuration file be written in? · JavaScript
The config that you′ve selected requires the following dependencies:

eslint, globals, @eslint/js, typescript-eslint
✔ Would you like to install them now? · Yes
✔ Which package manager do you want to use? · bun

```

_eslint.config.mjs_

```JavaScript
import js from '@eslint/js'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'
import globals from 'globals'
import tseslint from 'typescript-eslint'

export default defineConfig([
  // Cấu hình globalIgnores cho ESLint bỏ qua các thư mục chỉ định
  globalIgnores(['**/node_modules/', 'dist/']),
  tseslint.configs.recommended,
  {
    // Xác định các file mục tiêu
    files: ['**/*.{js,mjs,cjs,ts,mts,cts}'],
    plugins: { js },
    extends: ['js/recommended'],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.node,
      parserOptions: { project: ['./tsconfig.json'] }
    },
    rules: {
      // Cảnh báo đang sử dụng debugger
      'no-debugger': 'warn',
      // Cảnh báo đang sử dụng console
      'no-console': 'warn',
      // Cảnh báo biến không được sử dụng
      'no-unused-vars': 'off',
      // Cảnh báo nếu xuống hàng nhiều hơn 1 dòng
      'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 0 }],
      // Cảnh báo khi sử dụng loại 'any' trong TypeScript
      '@typescript-eslint/no-explicit-any': 'off',
      // Cảnh báo khi khai báo type là 1 obj rỗng
      '@typescript-eslint/no-empty-object-type': 'warn',
      // Cảnh báo khi có case trong switch không có break (trừ khi có comment chỉ định)
      'no-fallthrough': 'warn',
      // Cảnh báo khi có biến không được sử dụng
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Cảnh báo khi sử dụng Promise không đúng cách vd: trong các biểu thức điều kiện không dùng await
      '@typescript-eslint/no-misused-promises': ['error', { checksVoidReturn: false }]
    }
  },
  prettier
])
```

#### Lệnh check 1 rule nào đó khi không khai báo trong file config đang mang giá trị gì?

```bash
bunx eslint --print-config src/app.ts | grep -A 5 -B 5 "@typescript-eslint/no-explicit-any"
```

- src/app.ts: file app.ts phải là file tồn tại trong dự án,
- grep -A 5 -B 5: in thêm 5 dòng phía sau và 5 dòng phía trước
- Nó mang giá trị số và ý nghĩa của nó là:
  - 0 "off" Tắt rule
  - 1 "warn" Cảnh báo (không fail build)
  - 2 "error" Lỗi (fail build / CI)

## Cấu hình tsconfig.json

```json
{
  "compilerOptions": {
    // Environment setup & latest features
    "types": ["node"], // auto load type của Node.js khi dùng built-in, vd: process, Buffer, etc.
    "lib": ["ESNext"], // quy định bộ API JavaScript mà TypeScript cho phép dùng để code (ES2020, ES2022…)
    "target": "es2022", // phiên bản JS đầu ra sau khi TypeScript biên dịch
    "module": "ESNext", //  quy định kiểu module output khi TypeScript biên dịch (ESM, CJS, UMD…)
    "moduleDetection": "force", // buộc TS nhận diện file là module nếu có import/export

    // Bundler mode
    "noEmit": true, // không xuất file .js (dùng bundler để build)
    "verbatimModuleSyntax": true, // tuân thủ chuẩn import/export, nếu là type thì phải là import type {...} from '...'
    "allowImportingTsExtensions": true, // cho phép import file với đuôi mở rộng vd: import x from "./file.ts"
    "moduleResolution": "Bundler", // cách resolve module tối ưu cho bundler (esbuild/rollup)

    // Best practices
    "strict": true, // bật toàn bộ chế độ kiểm tra nghiêm ngặt của TS
    "strictNullChecks": true, // bắt buộc xử lý null/undefined rõ ràng
    "noUncheckedIndexedAccess": true, // khi truy cập mảng/obj bằng index signature, kết quả có thể undefined
    "noImplicitOverride": true, // bắt buộc dùng từ khóa override khi ghi đè method của class cha
    "noImplicitAny": true, // không cho phép biến/method tự động có kiểu any
    "noImplicitThis": true, // không cho phép this có kiểu any
    "skipLibCheck": true, // bỏ qua kiểm tra type trong file .d.ts (nhanh hơn, ít lỗi vặt)
    "exactOptionalPropertyTypes": true, // optional property nếu tồn tại thì phải đúng type đã khai báo
    "useUnknownInCatchVariables": true, // biến trong catch mặc định là unknown, buộc phải check trước khi dùng

    "esModuleInterop": true, // cho phép import default từ CommonJS (ví dụ: import express from "express")
    "resolveJsonModule": true, // cho phép import file .json trực tiếp

    // Some stricter flags (disabled by default)
    "noUnusedLocals": false, // cảnh báo nếu có biến khai báo nhưng không dùng
    "noUnusedParameters": false, // cảnh báo nếu hàm có tham số không dùng
    "noPropertyAccessFromIndexSignature": false, // bắt buộc truy cập property qua index signature phải an toàn

    "baseUrl": ".", // gốc để tính alias
    "paths": {
      "@/*": ["src/*"] // alias @ → src
    }
  },
  "include": ["src/**/*"], // chỉ kiểm tra type trong src
  "exclude": ["dist", "node_modules"] // bỏ qua dist và node_modules
}
```

## Esbuild

```bash
bun add esbuild -d
```

```bash
bun add nanocolors
```

_esbuild.config.mjs_

```javascript
import esbuild from 'esbuild'
import { green, yellow } from 'nanocolors'

try {
  console.log(yellow('Building for production...'))

  await esbuild.build({
    entryPoints: ['src/app.ts'],
    outfile: 'dist/app.js',

    platform: 'node', // build cho Node runtime.
    format: 'esm', // phù hợp "type": "module" và import/export.
    target: 'node20', // đổi node18 nếu môi trường bạn là Node 18
    bundle: true,

    sourcemap: true, // true giúp debug stacktrace dễ hơn
    minify: true,
    logLevel: 'info', // in ra thông tin tổng quan về quá trình build
    packages: 'external', // Không bundle thư viện trong node_modules,
    tsconfig: 'tsconfig.json'
  })

  console.log(green('Build completed successfully.'))
} catch (e) {
  console.error('An error occurred', e)
  process.exit(1)
}
```

## Cấu hình file package.json

```json
{
  "scripts": {
    "dev": "bun --watch run ./src/app.ts",
    "build": "rimraf ./dist && bun esbuild.config.mjs",
    "build-rollup": "rimraf ./dist && rollup -c",
    "start": "bun dist/app.js",
    "lint": "eslint src --cache",
    "lint-fix": "eslint src --fix",
    "prettier": "prettier --check \"src/**/*.ts\"",
    "prettier-fix": "prettier --write \"src/**/*.ts\"",
    "check-format": "bun lint && bun prettier",
    "fix-format": "bun lint-fix && bun prettier-fix",
  },
  "devDependencies": ...
}
```

## Husky

> [!NOTE]
> Dùng để kiểm tra đã pass các rule của eslint và prettier hay chưa trước khi commit git

```bash
bun add husky lint-staged -D
```

```bash
git init
```

```bash
npx husky init
```

_.husky/pre-commit_

```
bunx lint-staged
```

_package.json_

```json
"lint-staged": {
  "*.{js,jsx,ts,tsx}": ["eslint --cache --fix --max-warnings=0"],
  "*.{ts,tsx,js,jsx,css,scss}": ["prettier --write"]
},
```

- Thêm .eslintcache vào file .gitignore

_.gitignore_

```
.eslintcache
```

## CommentLint

CommitLint ta sẽ đảm bảo được tất cả các commit đều phải có nội dung theo chuẩn (thường sử dụng chuẩn commit của Angular)

> [!WARNING]
> Những câu lệnh dưới đây dùng cho bash ko phải cho terminal cmd

```bash
bun add -D @commitlint/cli @commitlint/config-conventional
```

- Tạo file _commitlint.config.js_ kèm nội dung trong dấu "..."

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

- Thêm script commitlint vào file package.js

```bash
npm pkg set scripts.commitlint="commitlint --edit"
```

- Tạo file _commit-msg_

```bash
echo "bun run commitlint \${1}" > .husky/commit-msg
```

Theo chuẩn Angular, 1 commit message sẽ theo cấu trúc như sau: **`type(scope?): subject`**

- `type` ở trên có thể là:
  - `build`: Thay đổi liên quan đến hệ thống build hoặc phụ thuộc phục vụ build (ví dụ: cấu hình bundler như Vite/Webpack/Rollup, Babel, thay đổi cách build, chỉnh script build).
  - `ci`: Thay đổi cấu hình CI/CD và các script chạy trong pipeline (ví dụ: GitHub Actions/GitLab CI/CircleCI, cấu hình chạy test, build, deploy).
  - `chore`: Việc “lặt vặt/bảo trì”, chủ yếu là cấu hình hoặc tooling, không thay đổi logic chạy production (ví dụ: cập nhật dependencies, thêm script npm, setup husky, eslint/prettier).
  - `docs`: Chỉ thay đổi tài liệu (ví dụ: README, hướng dẫn cài đặt/sử dụng, comment tài liệu).
  - `feat`: Thêm tính năng mới cho người dùng/hệ thống (ví dụ: thêm màn hình, thêm API endpoint, thêm chức năng).
  - `fix`: Sửa lỗi/bug (ví dụ: sửa crash, sửa sai logic, sửa lỗi UI/validation).
  - `perf`: Thay đổi giúp cải thiện hiệu năng mà không đổi hành vi chính (ví dụ: giảm thời gian load, giảm query, tối ưu render).
  - `refactor`: Tái cấu trúc code nhưng không thêm tính năng và không sửa bug (hành vi vẫn giữ nguyên; ví dụ: tách hàm, đổi cấu trúc file, dọn code).
  - `revert`: Hoàn tác (quay ngược) một commit trước đó (thường tạo bởi `git revert`, để “hủy” thay đổi của commit cũ).
  - `style`: Chỉ thay đổi format/kiểu code, không đổi ý nghĩa (ví dụ: prettier format, sửa indentation, thêm/xóa khoảng trắng, dấu `;`).
  - `test`: Thêm test mới hoặc sửa test hiện có (ví dụ: thêm unit/integration/e2e test, sửa test bị fail/flaky).

- `scope` thì là optional, và nếu có thì nó nên là tên của package mà commit hiện tại làm ảnh hưởng. Mình thấy scope thường dùng ở các repository mà chứa nhiều packages dạng monorepo, ví dụ repo của Vue 3, scope sẽ là tên của 1 package nào đó ở folder packages

- `subject` là nội dung của commit

- VD:

```bash
git commit -m "feat: add new feature"
```

```bash
git commit -m "fix(scope): fix bug"
```

## Cài express và các dependency hay dùng

```bash
bun add express cookie-parser cors morgan bcrypt
```

```bash
bun add @types/cors @types/express @types/bcrypt @types/cookie-parser @types/morgan -d
```

_src/app.js_

```javascript
// 📦 External library
import cookieParser from 'cookie-parser'
import cors from 'cors'
import express from 'express'
import http from 'http'
import logger from 'morgan'
import { yellow } from 'nanocolors'
import os from 'os'
import path from 'path'

// * HTTPS
import fs from 'fs'
import https from 'https'

// ⚙️ Config
// import { applyMiddlewaresCustom } from '@/core/middlewares'

const app = express()

const originsCORS: string[] = JSON.parse(process.env.URL_CLIENTS || '["http://localhost:3000"]')

app.use(
  cors({
    origin: originsCORS,
    credentials: true
  })
)
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use('/static/photos', express.static(path.resolve('uploads/photos')))

// applyMiddlewaresCustom(app) // hàm app các router vd như app.use('/api', apiRoutes)

async function startServer() {
  const port = process.env.PORT || '4000'

  // place connect to database
  // ...

  const server = http.createServer(app)

  const isDevelopment = process.env.NODE_ENV === 'development'

  server.listen(port, () => {
    if (isDevelopment) {
      // eslint-disable-next-line no-console
      console.log(yellow(`Server is running at http://localhost:${port}`))
    }
  })

  server.on('error', (error: any) => onError(error, port))

  if (isDevelopment) {
    // * HTTPS
    const dirPath = './ssl'
    const files = fs.readdirSync('./ssl')

    const keyFile = files.find((file) => file.endsWith('-key.pem'))
    const certFile = files.find((file) => file.endsWith('.pem') && !file.endsWith('-key.pem'))

    if (!keyFile || !certFile) {
      // eslint-disable-next-line no-console
      console.error('Key or certificate file not found in the ssl directory.')
      return
    }

    const key = fs.readFileSync(path.join(dirPath, keyFile))
    const cert = fs.readFileSync(path.join(dirPath, certFile))

    const server = https.createServer({ key, cert }, app)

    const portHttps = process.env.PORT_HTTPS || '4001'

    server.listen(portHttps, () => {
      // eslint-disable-next-line no-console
      console.log(yellow(`Server is running at https://${getLocalIP()}:${portHttps}`))
    })
    server.on('error', (error: any) => onError(error, portHttps))
    return
  }
  // eslint-disable-next-line no-console
  console.log(yellow(`Server is running`))
}

startServer()

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error: any, port: string) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `Pipe ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(bind + ' requires elevated privileges')
      process.exit(1)
      break
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(bind + ' is already in use')
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function getLocalIP() {
  const networkInterfaces = os.networkInterfaces()
  for (const name in networkInterfaces) {
    if (!networkInterfaces[name]) continue
    for (const net of networkInterfaces[name]) {
      if (net.family === 'IPv4' && !net.internal) {
        return net.address
      }
    }
  }
  return 'localhost'
}
```
