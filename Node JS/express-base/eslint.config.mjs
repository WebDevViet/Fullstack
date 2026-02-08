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
