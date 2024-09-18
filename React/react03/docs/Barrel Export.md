# Barrel Export

> [!NOTE] > **Barrel Export** hoặc **Barrel Pattern**. Đây là một phương pháp tổ chức mã nguồn trong lập trình, đặc biệt phổ biến trong các dự án JavaScript và TypeScript. Bằng cách tạo một file index (thường là **index.js** hoặc **index.ts**), bạn có thể tập trung tất cả các export từ các module khác vào một nơi duy nhất. Điều này giúp đơn giản hóa việc import trong các file khác, vì bạn chỉ cần import từ file index này.

Ví dụ: JavaScript

_// File: components/index.js_<br>
export { default as Button } from './Button';<br>
export { default as Input } from './Input';<br>
export { default as Modal } from './Modal';

_// File: App.js_<br>
import { Button, Input, Modal } from './components';
