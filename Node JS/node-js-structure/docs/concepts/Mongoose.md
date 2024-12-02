# Mongoose

**ServerSelectionTimeoutMS**

Hãy tưởng tượng bạn đang gọi điện cho một người bạn, nhưng bạn không biết họ đang ở đâu. Bạn phải chờ đợi một lúc để họ trả lời điện thoại. Nếu họ không trả lời trong một khoảng thời gian nhất định, bạn sẽ phải treo máy và gọi lại sau.

`serverSelectionTimeoutMS` là khoảng thời gian mà Mongoose sẽ chờ đợi để kết nối với máy chủ MongoDB. Nếu máy chủ không trả lời trong khoảng thời gian này, Mongoose sẽ tự động ngắt kết nối và thử lại sau.

Ví dụ, nếu bạn thiết lập `serverSelectionTimeoutMS` là 3000 (3 giây), Mongoose sẽ chờ đợi 3 giây để kết nối với máy chủ MongoDB. Nếu máy chủ không trả lời trong 3 giây, Mongoose sẽ ngắt kết nối và thử lại sau.

**SocketTimeoutMS**

Hãy tưởng tượng bạn đang trò chuyện với một người bạn qua điện thoại. Bạn nói một câu, và sau đó chờ đợi họ trả lời. Nếu họ không trả lời trong một khoảng thời gian nhất định, bạn sẽ nghĩ rằng cuộc trò chuyện đã bị ngắt quãng.

`socketTimeoutMS` là khoảng thời gian mà Mongoose sẽ chờ đợi để nhận được phản hồi từ máy chủ MongoDB sau khi gửi một yêu cầu. Nếu máy chủ không trả lời trong khoảng thời gian này, Mongoose sẽ tự động ngắt kết nối và báo lỗi.

Ví dụ, nếu bạn thiết lập `socketTimeoutMS` là 5000 (5 giây), Mongoose sẽ chờ đợi 5 giây để nhận được phản hồi từ máy chủ MongoDB sau khi gửi một yêu cầu. Nếu máy chủ không trả lời trong 5 giây, Mongoose sẽ ngắt kết nối và báo lỗi.

Tóm lại, `serverSelectionTimeoutMS` là khoảng thời gian chờ đợi để kết nối với máy chủ, trong khi `socketTimeoutMS` là khoảng thời gian chờ đợi để nhận được phản hồi từ máy chủ sau khi gửi một yêu cầu.
