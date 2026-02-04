# Khởi tạo dự án React Router, Typescript

1. bun

```bash
bunx create-react-router@latest my-react-router-app
```

> [!TIP]
> --bun: ép buộc bunx sử dụng Bun runtime để chạy package thay vì Node.js.
> Tuy nhiên, hãy lưu ý rằng không phải package nào cũng tương thích hoàn toàn với Bun, nên nếu gặp lỗi, có thể thử lại mà không dùng --bun.

2. pnpm

```bash
pnpm dlx create-react-router@latest my-react-router-app
```

3. npm

```bash
npx create-react-router@latest my-react-router-app
```

## Cấu hình React Router

- Thêm --open đằng sau lệnh react-router dev để nó mở browser và live dự án

_package.json_

```json
{
  "scripts": {
    "dev": "react-router dev --open"
    //...
  }
}
```

## Cấu hình Typescript

_tsconfig.app.json_

```json
{
  "compilerOptions": {
    "target": "ES2015"
    //...other config
  }
}
```

> [!NOTE]
> Vì web app cần được chạy ổn định ở nhiều phiên bản trình duyệt và các browser khác nhau nên ta cần target về ES6

## Cấu hình vite

> [!IMPORTANT]
> Nếu bạn mở devtool console trên chrome mà thấy terminal của bạn xuất hiện lỗi này: `Error: No route matches URL "/.well-known/appspecific/com.chrome.devtools.json"`, thì hãy làm các bước dưới đây

- Cài extension: **DevTools JSON**

```bash
bun add -D vite-plugin-devtools-json
```

- Cấu hình vite

  _vite.config.ts_

```typescript
import { reactRouter } from '@react-router/dev/vite'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import devtoolsJson from 'vite-plugin-devtools-json'

export default defineConfig({
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths(), devtoolsJson()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  }
})
```

> [!TIP]
> `css: { devSourcemap: true }`: Khi sử dụng CSS preprocessors như SASS, SCSS, Less, hoặc CSS Modules, code được trình duyệt đọc đã bị biên dịch (compile) thành CSS thuần. Nếu không có source map, trình duyệt chỉ trỏ đến file .css kết quả, gây khó khăn khi tìm file .scss gốc.

## Thêm EditorConfig

1. Cài extension EditorConfig for VS Code trên VS Code để đọc được file .editorconfig

2. Tạo file .editorconfig với nội dung như sau ở thư mục root (ngang cấp với package.json)

_.editorconfig_

```
[*]
indent_style = space
indent_size = 2
```

## ESLint - Prettier

```bash
bun add globals prettier eslint-config-prettier eslint @eslint/js eslint-plugin-react-hooks eslint-plugin-react-refresh typescript-eslint -D
```

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
bun.lockb
package-lock.json
postcss.config.mjs
tailwind.config.ts
commitlint.config.js
node_modules/
dist/
public/
.husky/
.react-router/
```

- Cài extensions-vscode: **ESlint, Prettier, Prettier ESlint**

### ESLint

_eslint.config.js_

```javascript
import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import prettier from 'eslint-config-prettier'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist', 'build', '.react-router']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      reactHooks.configs.flat['recommended-latest'],
      reactRefresh.configs.vite,
      prettier
    ],
    languageOptions: {
      ecmaVersion: 'latest',
      globals: globals.browser
    },
    rules: {
      // Cảnh báo đang sử dụng debugger
      'no-debugger': 'warn',
      // Cảnh báo đang sử dụng console
      'no-console': 'warn',
      // Cảnh báo nếu xuống hàng nhiều hơn 1 dòng
      'no-multiple-empty-lines': ['warn', { max: 1, maxBOF: 0, maxEOF: 0 }],
      // Cảnh báo khi sử dụng loại 'any' trong TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      // Cảnh báo khi sử dụng object rỗng
      '@typescript-eslint/no-empty-object-type': 'warn',
      // Cảnh báo biến không sử dụng
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      // Tắt rule chỉ cho phép export component
      'react-refresh/only-export-components': 'off'
    }
  }
])
```

_package.json_

```json
{
  "scripts": {
    //...
    "lint": "eslint app --cache",
    "lint-fix": "eslint app --fix",
    "prettier": "prettier --check \"app/**/*.{ts,tsx,css,scss}\"",
    "prettier-fix": "prettier --write \"app/**/*.{ts,tsx,css,scss}\"",
    "check-format": "bun lint && bun prettier",
    "fix-format": "bun lint-fix && bun prettier-fix"
  }
}
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

> [!TIP]
> Nếu ESLint không hoạt động ta thử tắt VSCode và mở lại + bun dev

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
{
  "scripts": {
    //...
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --cache --fix --max-warnings=0"],
    "*.{ts,tsx,js,jsx,css,scss}": ["prettier --write"]
  }
  //...
}
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

- Lệnh tạo file _commitlint.config.js_ với nội dung `export default { extends: ['@commitlint/config-conventional'] };`

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

- Thêm script commitlint vào file package.js

```bash
npm pkg set scripts.commitlint="commitlint --edit"
```

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

## Bonus

Nếu chỉ muốn client side rendering (CSR) thì cho ssr:false ở file react-router.config.ts. Muốn preview production khi CSR thì thêm dòng này vào "script" ở package.json

```
"start:csr": "vite preview"
```
