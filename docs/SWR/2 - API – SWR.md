# API – SWR

## Parameters

SWR cung cấp hook `useSWR` để bạn có thể dễ dàng truy xuất và quản lý dữ liệu trong ứng dụng React của mình. Cú pháp cơ bản như sau:

```js
const { data, error, isLoading, isValidating, mutate } = useSWR(key, fetcher, options)
```

Ở đây:

- **key**: Là một chuỗi khóa duy nhất mà bạn dùng cho mỗi yêu cầu (hoặc có thể là hàm, mảng, hoặc null). Khóa này xác định dữ liệu nào sẽ được fetch và lưu trong cache.
- **fetcher**: (Tùy chọn) Là hàm trả về một Promise dùng để lấy dữ liệu. Đây thường là một hàm đơn giản wrap cho hàm `fetch` hoặc các thư viện khác như Axios.
- **options**: (Tùy chọn) Là một đối tượng chứa các cài đặt để tùy chỉnh hành vi của hook `useSWR`.

---

## Giá Trị Trả Về

Khi sử dụng `useSWR`, bạn nhận được một đối tượng gồm các thuộc tính sau:

- **data**: Dữ liệu được trả về từ fetcher, dựa trên key đã cung cấp (nếu dữ liệu chưa được load, giá trị này sẽ là `undefined`).
- **error**: Nếu fetcher có lỗi thì lỗi đó sẽ được lưu tại đây (nếu không có lỗi, giá trị này là `undefined`).
- **isLoading**: Một boolean chỉ ra trạng thái "đang tải" nếu có request đang được thực hiện mà chưa có dữ liệu được trả về. (Lưu ý: fallback data hoặc dữ liệu cũ không được tính là “loaded data”).
- **isValidating**: Một boolean cho biết có request hoặc quá trình tự động làm mới (revalidation) của dữ liệu đang diễn ra hay không.
- **mutate(data?, options?)**: Một hàm dùng để cập nhật trực tiếp dữ liệu đã cache. Bạn có thể sử dụng hàm này để đưa vào dữ liệu mới hoặc duy trì dữ liệu cũ cho đến khi dữ liệu mới được load lại theo nhu cầu.

---

## Các Tùy Chọn Cấu Hình (Options)

SWR cho phép bạn tùy chỉnh nhiều hành vi khác nhau qua đối tượng `options`:

- **suspense = false**: Cho phép bật chế độ React Suspense nếu ứng dụng của bạn hỗ trợ.
- **revalidateIfStale = true**: Tự động làm mới (revalidate) dữ liệu ngay cả khi dữ liệu trong cache đã “lạc” (stale).
- **revalidateOnMount**: Bật hoặc tắt tự động làm mới khi component được mount.
- **revalidateOnFocus = true**: Tự động làm mới dữ liệu khi cửa sổ trình duyệt được focus.
- **revalidateOnReconnect = true**: Tự động làm mới khi trình duyệt kết nối lại (dựa vào `navigator.onLine`).
- **refreshInterval = 0**: Mặc định là tắt. Nếu bạn đặt là một số (milliseconds), SWR sẽ tự động polling dữ liệu theo khoảng thời gian đó. Nếu thiết lập là hàm, hàm đó sẽ nhận dữ liệu mới nhất và trả về khoảng thời gian polling.
- **refreshWhenHidden = false**: Chỉ áp dụng khi `refreshInterval` được bật, cho phép polling ngay cả khi cửa sổ không hiển thị.
- **refreshWhenOffline = false**: Cho phép polling khi trình duyệt đang offline (theo chỉ số `navigator.onLine`).
- **shouldRetryOnError = true**: Tự động thử lại request khi fetcher gặp lỗi.
- **dedupingInterval = 2000**: Khoảng thời gian (ms) để loại bỏ các request trùng lặp với cùng một key, nhằm tránh gửi nhiều yêu cầu giống nhau.
- **focusThrottleInterval = 5000**: Chỉ cho phép revalidate một lần trong khoảng thời gian này (ms) khi chuyển đổi trạng thái focus.
- **loadingTimeout = 3000**: Thời gian (ms) tối đa trước khi kích hoạt callback `onLoadingSlow` nếu request mất quá nhiều thời gian.
- **errorRetryInterval = 5000**: Khoảng thời gian (ms) giữa các lần thử lại khi gặp lỗi.
- **errorRetryCount**: Số lần thử lại tối đa khi gặp lỗi (nếu quá số lần này, request sẽ không được thử lại).
- **fallback**: Một đối tượng key-value chứa nhiều dữ liệu dự phòng, có thể áp dụng cho nhiều key khác nhau.
- **fallbackData**: Dữ liệu khởi tạo trả về cho từng hook riêng lẻ, hữu ích khi bạn muốn có sẵn dữ liệu ngay từ đầu.
- **keepPreviousData = false**: Nếu bật, dữ liệu cũ của key trước đó sẽ được giữ lại cho đến khi dữ liệu mới được load xong.
- **onLoadingSlow(key, config)**: Hàm callback được gọi khi một request mất quá nhiều thời gian (dựa vào `loadingTimeout`).
- **onSuccess(data, key, config)**: Hàm callback được gọi khi request hoàn thành thành công.
- **onError(err, key, config)**: Hàm callback được gọi khi request gặp lỗi.
- **onErrorRetry(err, key, config, revalidate, revalidateOpts)**: Hàm xử lý logic khi cần thử lại sau khi gặp lỗi.
- **onDiscarded(key)**: Hàm callback khi một request bị bỏ qua do có sự trùng lặp (race conditions).
- **compare(a, b)**: Hàm so sánh được sử dụng để phát hiện khi dữ liệu đã thay đổi, giúp tránh việc render lại không cần thiết. Mặc định sử dụng hàm `stable-hash`.
- **isPaused()**: Hàm kiểm tra xem có nên tạm dừng quá trình làm mới dữ liệu hay không; nếu hàm trả về `true`, SWR sẽ bỏ qua dữ liệu lấy được và lỗi trong request đó. (Mặc định trả về `false`).
- **use**: Một mảng chứa các middleware function để mở rộng hoặc thay đổi hành vi mặc định của SWR.

---

## Lưu Ý Khi Mạng Chậm

Trong trường hợp kết nối mạng yếu (ví dụ như 2G, với tốc độ <= 70Kbps):

- Giá trị **errorRetryInterval** có thể được mặc định là 10 giây.
- Giá trị **loadingTimeout** sẽ được điều chỉnh thành 5 giây theo mặc định.

Ngoài ra, bạn hoàn toàn có thể thiết lập các cấu hình mặc định trên toàn cục thông qua việc sử dụng **global configuration** của SWR, giúp tự động áp dụng những tùy chọn này cho tất cả các hook trong ứng dụng của bạn.

---

**Cập nhật lần cuối: November 30, 2023**
