## Barrel Export

> [!NOTE]
> **Barrel Export** hoặc **Barrel Pattern**. Đây là một phương pháp tổ chức mã nguồn trong lập trình, đặc biệt phổ biến trong các dự án JavaScript và TypeScript. Bằng cách tạo một file index (thường là **index.js** hoặc **index.ts**), bạn có thể tập trung tất cả các export từ các module khác vào một nơi duy nhất. Điều này giúp đơn giản hóa việc import trong các file khác, vì bạn chỉ cần import từ file index này.

Ví dụ: JavaScript

_// File: components/index.js_<br>
export { default as Button } from './Button';<br>
export { default as Input } from './Input';<br>
export { default as Modal } from './Modal';

_// File: App.js_<br>
import { Button, Input, Modal } from './components';

## Why not Mutate

> [!NOTE]
> Trong React, chúng ta không nên mutate (thay đổi trực tiếp) state vì một số lý do quan trọng:
>
> - Tính bất biến (Immutability): React dựa vào tính bất biến của state để xác định khi nào cần cập nhật giao diện người dùng. Nếu bạn mutate state trực tiếp, React có thể không nhận ra rằng state đã thay đổi và do đó không cập nhật giao diện người dùng một cách chính xác.
>
> - Hiệu suất (Performance): Khi bạn mutate state trực tiếp, React không thể tối ưu hóa việc cập nhật giao diện người dùng. Bằng cách giữ state bất biến, React có thể sử dụng các thuật toán tối ưu để cập nhật chỉ những phần của giao diện người dùng thực sự cần thay đổi.
>
> - Dễ dàng quản lý (Manageability): Việc giữ state bất biến giúp mã nguồn dễ hiểu và dễ bảo trì hơn. Bạn có thể dễ dàng theo dõi các thay đổi của state và debug ứng dụng một cách hiệu quả hơn.
>
> - Dự đoán được (Predictability): Khi state là bất biến, bạn có thể dự đoán được kết quả của các thay đổi state, giúp tránh các lỗi không mong muốn và làm cho ứng dụng của bạn ổn định hơn.

> [!TIP]
> Thay vì mutate state trực tiếp, bạn nên sử dụng các phương pháp như setState (trong class components) hoặc useState (trong functional components) để cập nhật state một cách an toàn và hiệu quả.
