# Khởi tạo dự án React Router, Typescript, Bun

```bash
bunx create-react-router@latest my-react-router-app
```

## Cấu hình React Router

_package.json_

```json
{
  "scripts": {
    "build": "react-router build",
    "dev": "react-router dev --open",
    "start": "react-router-serve ./build/server/index.js",
    "typecheck": "react-router typegen && tsc"
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
bun add prettier -D
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
node_modules/
dist/
build/
src/index.css
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
import { globalIgnores } from 'eslint/config'

export default tseslint.config([
  globalIgnores(['dist', 'build', '.react-router']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser
    },
    rules: {
      // Tắt rule chỉ cho phép export component
      'react-refresh/only-export-components': 'off',
      // Tắt rule không sử dụng biến
      // 'no-empty-pattern': 'off',
      // Cảnh báo đang sử dụng debugger
      'no-debugger': 'warn',
      // Cảnh báo đang sử dụng console
      'no-console': 'warn',
      // Cảnh báo nếu xuống hàng nhiều hơn 1 dòng
      'no-multiple-empty-lines': ['warn', { max: 1 }]
    }
  }
])
```

_package.json_

```json
{
  "scripts": {
    //...
    "lint": "eslint .",
    "lint-fix": "eslint . --fix",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier-fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "check-format": "npm run lint && npm run prettier",
    "fix-format": "npm run lint-fix && npm run prettier-fix"
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
# .husky/pre-commit

bunx lint-staged
bun run check-format
eslint --cache --max-warnings=0 .
```

_package.json_

```json
{
  "scripts": {
    //...
    "prepare": "husky"
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["npm run fix-format", "git add ."]
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

> [!NOTE]
> CommitLint ta sẽ đảm bảo được tất cả các commit đều phải có nội dung theo chuẩn (thường sử dụng chuẩn commit của Angular)

> [!WARNING]
> Những câu lệnh dưới đây dùng cho bash ko phải cho terminal cmd

```bash
bun add -D @commitlint/cli @commitlint/config-conventional
```

```bash
echo "export default { extends: ['@commitlint/config-conventional'] };" > commitlint.config.js
```

```bash
npm pkg set scripts.commitlint="commitlint --edit"
```

```bash
echo "bun run commitlint \${1}" > .husky/commit-msg
```

Theo chuẩn Angular, 1 commit message sẽ theo cấu trúc như sau: **`type(scope?): subject`**

- `type` ở trên có thể là:

  - `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
  - `ci`: Changes to our CI configuration files and scripts (example scopes: Gitlab CI, Circle, BrowserStack, SauceLabs)
  - `chore`: add something without touching production code (Eg: update npm dependencies)
  - `docs`: Documentation only changes
  - `feat`: A new feature
  - `fix`: A bug fix
  - `perf`: A code change that improves performance
  - `refactor`: A code change that neither fixes a bug nor adds a feature
  - `revert`: Reverts a previous commit
  - `style`: Changes that do not affect the meaning of the code (Eg: adding white-space, formatting, missing semi-colons, etc)
  - `test`: Adding missing tests or correcting existing tests

- `scope` thì là optional, và nếu có thì nó nên là tên của package mà commit hiện tại làm ảnh hưởng. Mình thấy scope thường dùng ở các repository mà chứa nhiều packages dạng monorepo, ví dụ repo của Vue 3, scope sẽ là tên của 1 package nào đó ở folder packages

- `subject` là nội dung của commit
