# Khởi tạo dự án Next JS - Typescript

1. bun

```bash
bun create next-app@latest my-app --yes
```

2. pnpm

```bash
pnpm create next-app@latest my-app --yes
```

3. npm

```bash
npx create-next-app@latest my-app --yes
```

_package.json_

- Next 15

```json
{
  "scripts": {
    "dev": "rm -rf .next && bun --bun next dev --experimental-https --turbopack",
    "build": "bun --bun next build --turbopack",
    "start": "bun --bun next start"
  }
}
```

> [!NOTE]
> --experimental-https: Chạy ở chế độ https

- Next 16

```json
{
  "scripts": {
    "dev": "bun --bun next dev",
    "build": "bun --bun next build",
    "start": "bun --bun next start"
  }
}
```

## ESLint - Prettier

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
node_modules/
bun.lockb
package-lock.json
next.config.ts
postcss.config.mjs
tailwind.config.ts
commitlint.config.js
dist/
public/
.next/
.vercel
.husky
```

- Cài extensions-vscode: **ESlint, Prettier, Prettier ESlint**

### ESLint

```bash
bun add -d prettier eslint-config-prettier
```

```js
import { defineConfig, globalIgnores } from 'eslint/config'
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'
import prettier from 'eslint-config-prettier'

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts'
  ]),
  {
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
      // Cảnh báo khi có biến không được sử dụng
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }]
    }
  },
  prettier
])

export default eslintConfig
```

_package.json_

```json
{
  "scripts": {
    //...
    "lint": "eslint src --cache",
    "lint-fix": "eslint src --fix",
    "prettier": "prettier --check \"src/**/*.{ts,tsx,css,scss}\"",
    "prettier-fix": "prettier --write \"src/**/*.{ts,tsx,css,scss}\"",
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

## UI

### Shadcn

1. [Install pkg](https://ui.shadcn.com/docs/installation/next)

- [Base Color](https://ui.shadcn.com/colors)

2. [Add dark mode](https://ui.shadcn.com/docs/dark-mode/next)

3. [Cài các component mong muốn](https://ui.shadcn.com/docs/components)

4. Bonus

- Sonner(toast, ver "^2.0.7"): Muốn toast có màu(success/error/warn) thì thêm tham số `richColors: true` như sau:

```ts
toast.success(message, { ...configToast, richColors: true, id: message })
```

> [!WARNING]
> Khi dùng toast trong sự kiện thì component phải dùng 'use client'
