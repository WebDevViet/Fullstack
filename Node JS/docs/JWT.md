# JWT

## JWT là gì?

JSON Web Token (JWT), là một chuẩn mở ([RFC 7519](https://tools.ietf.org/html/rfc7519 'RFC 7519')) giúp truyền tải thông tin dưới dạng JSON.

**Ở đây có một lưu ý là**: Tất cả các JWT đều là token, nhưng không phải tất cả các token đều là JWT.

Sẵn tiện nếu bạn thắc mắc **"Token là gì?"** thì mình giải thích ngắn gọn như sau: **Token** là một chuỗi ký tự được tạo ra để đại diện cho một đối tượng hoặc một quyền truy cập nào đó, ví dụ như access token, refresh token, jwt... Token thường được sử dụng trong các hệ thống xác thực và ủy quyền để kiểm soát quyền truy cập của người dùng đối với tài nguyên hoặc dịch vụ.

Bởi vì kích thước tương đối nhỏ, JWT có thể được gửi qua URL, qua tham số POST, hoặc bên trong HTTP Header mà không ảnh hưởng nhiều đến tốc độ request.

Dưới đây là một JWT sau khi được encode và sign:

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MTE4NDdhZmJkYjUxMmE1MmMwNTQ4IiwidHlwZSI6MCwiaWF0IjoxNjgyMDgyNTA0LCJleHAiOjE2OTA3MjI1MDR9.QjSI3gJZgDSEHz6eYkGKIQ6gYiiizg5C0NDbGbGxtWU
```

Cái chuỗi JWT trên có cấu trúc gồm ba phần, mỗi phần được phân tách bởi dấu chấm (.): **Header**, **Payload** và **Signature**.

1.  **Header**: Phần này chứa thông tin về loại token (thường là "JWT") và thuật toán mã hóa được sử dụng để tạo chữ ký (ví dụ: HMAC SHA256 hoặc RSA). Header sau đó được mã hóa dưới dạng chuỗi Base64Url. (Thử decode Base64 cái chuỗi `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9` này ra thì nó sẽ có dạng `'{"alg":"HS256","typ":"JWT"}'`)
2.  **Payload**: Phần này chứa các thông tin mà người dùng định nghĩa. Payload cũng được mã hóa dưới dạng chuỗi Base64Url.
3.  **Signature**: Phần này được tạo bằng cách dùng thuật toán HMACSHA256 (cái này có thể thay đổi) với nội dung là Base64 encoded Header + Base64 encoded Payload kết hợp một "secret key" (khóa bí mật). Signature (Chữ ký) giúp đảm bảo tính toàn vẹn và bảo mật của thông tin trong JWT (Công thức chi tiết nhìn xuống phía dưới nhé)

Bạn copy cái chuỗi trên và paste vào [jwt.io](https://jwt.io/?_gl=1*kz5l66*rollup_ga*MTk3NDIxOTQ3OC4xNjc4Nzg2NDAx*rollup_ga_F1G3E656YZ*MTY4MzU0MTY2My4yMC4xLjE2ODM1NDIxNzguNjAuMC4w&_ga=2.178841069.832851294.1683541664-1974219478.1678786401 'jwt.io') thì sẽ thấy kết quả như sau

HEADER:ALGORITHM & TOKEN TYPE

```
{
  "alg": "HS256",
  "typ": "JWT"
}
```

PAYLOAD:DATA

```
{
  "user_id": "64411847afbdb512a52c0548",
  "type": 0,
  "iat": 1682082504,
  "exp": 1690722504
}
```

VERIFY SIGNATURE

```
HMACSHA256(base64UrlEncode(header) + '.' + base64UrlEncode(payload), secret_key)
```

Lúc này bạn sẽ thắc mắc "Vậy tất cả mọi người đều biết được thông tin **Header** và **Payload** của cái JWT?"

**Đúng rồi**

Nhưng có một điều quan trọng là chỉ có server mới biết được **secret_key** để tạo ra **Signature**. Vì vậy chỉ có server mới có thể verify được cái JWT này là do chính server tạo ra.

Bạn không tin ư? Tôi đố bạn tạo ra được JWT như trên đó, dù bạn biết **Header** và **Payload** nhưng để tạo ra cái **Signature** thì bạn cần phải biết được **secret_key** của mình (nhìn c).

Mặc định thì JWT dùng thuật toán HMACSHA256 nên chúng ta yên tâm rằng JWT có độ an toàn cực cao và rất khó bị làm giả.

Hiểu được JWT rồi thì chúng ta cùng tìm hiểu về cách sử dụng JWT trong việc xác thực người dùng nhé.

## Xác thực người dùng với Access Token

Ở bài **Session Authentication** thì chúng ta được học rằng mỗi request lên server thì đều phải kèm theo session id để server có thể xác thực người dùng này là ai, có quyền truy cập tài nguyên hay không. Cái session id này được lưu ở cơ sở dữ liệu trên server, mỗi lần request phải mò vào đó kiểm tra xem session id này có trong đó không, rất mất thời gian.

### Access Token là gì

Với JWT thì người ta phát hiện ra rằng chỉ cần tạo 1 cái token JWT, lưu thông tin người dùng vào như `user_id` hay `role`... rồi gửi cho người dùng, server không cần phải lưu trữ cái token JWT này làm gì. Mỗi lần người dùng request lên server thì gửi cái token JWT này lên, Server chỉ cần verify cái token JWT này là biết được người dùng này là ai, có quyền truy cập tài nguyên hay không.

> [!TIP]
> Phương pháp dùng token để xác thực như thế này người ta gọi là **Token Based Authentication**.

Bạn sợ ai đó có thể làm giả cái token JWT của bạn hả?

**Không!** Không có ai có thể tạo ra được cái token JWT của bạn trừ khi họ biết cái **secret_key** của bạn, mà cái **secret_key** này bạn lưu trữ trên server mà, sao mà biết được (trừ bạn bị hack hay lỡ tay làm lộ thì chịu 🥲).

Vậy là chúng ta không cần lưu trữ cái JWT này trên server nữa, chỉ cần client lưu trữ là đủ rồi.

Tiết kiệm biết bao nhiêu là bộ nhớ cho server, mà còn nhanh nữa chứ (vì bỏ qua bước kiểm tra trong cơ sở dữ liệu, cái bước verify jwt thì nó nhanh lắm)

Và cái token ở trên để xác thực người dùng có quyền truy cập vào tài nguyên hay không người ta gọi là **Access Token**.

Access Token là một chuỗi với **bất kỳ định dạng nào**, nhưng định dạng phổ biến nhất của access token là JWT. Thường thì cấu trúc data trong access token sẽ theo [chuẩn này](https://datatracker.ietf.org/doc/html/rfc9068 'chuẩn này'). Tuy nhiên bạn có thể thay đổi theo ý thích, miễn sao phù hợp với dự án là được.

Đây là một chuỗi access token mẫu

```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQ0MTE4NDdhZmJkYjUxMmE1MmMwNTQ4IiwiaWF0IjoxNjgyMDgyNTA0LCJleHAiOjE2OTA3MjI1MDR9.tWlX7E7NPNftg37fXrdsXvkgEWB_8zaHIQmryAXzElY
```

Đây là payload của access token trên

```
{
  "user_id": "64411847afbdb512a52c0548",
  "iat": 1682082504,
  "exp": 1690722504
}
```

Trong này có 3 trường quan trọng mà server dùng để kiểm tra token liệu có đúng người, hay còn hiệu lực không

- `user_id`: Chính là id định danh của người dùng, để biết token này là của người nào
- `iat`: Thời gian bắt đầu token này có hiệu lực
- `exp`: Thời gian kết thúc token này

Tùy từng trường hợp mà server có thể thêm các trường vào payload khi tạo access token, không cần cứng nhắc quá.

### Flow xác thực người dùng với Access Token

1.  Client gửi request vào tài nguyên được bảo vệ trên server. Nếu client chưa được xác thực, server trả về lỗi 401 Authorization. Client gửi username và password của họ cho server.
2.  Server xác minh thông tin xác thực được cung cấp so với cơ sở dữ liệu user. Nếu thông tin xác thực khớp, server tạo ra một JWT chứa payload là `user_id` (hoặc trường nào đó định danh người dùng). JWT này được gọi là Access Token.
3.  Server gửi access token cho client.
4.  Client lưu trữ access token ở bộ nhớ thiết bị (cookie, local storage,...).
5.  Đối với các yêu cầu tiếp theo, client gửi kèm access token trong header của request.
6.  Server verify access token bằng secret key để kiểm tra access token có hợp lệ không.
7.  Nếu hợp lệ, server cấp quyền truy cập vào tài nguyên được yêu cầu. Khi người dùng muốn đăng xuất thì chỉ cần xóa access token ở bộ nhớ thiết bị là được.
8.  Khi access token hết hạn thì server sẽ từ chối yêu cầu của client, client lúc này sẽ xóa access token ở bộ nhớ thiết bị và chuyển sang trạng thái bị logout.

### Vấn đề của Access Token

Như flow trên thì chúng ta không lưu access token ở trên server, mà lưu ở trên client. Điều này gọi là stateless, tức là server không lưu trữ trạng thái nào của người dùng nào cả.

Khuyết điểm của nó là chúng ta không thể thu hồi access token được. Các bạn có thể xem một số ví dụ dưới đây.

**Ví dụ 1:** Ở server, chúng ta muốn chủ động đăng xuất một người dùng thì không được, vì không có cách nào xóa access token ở thiết bị client được.

**Ví dụ 2:** Client bị hack dẫn đến làm lộ access token, hacker lấy được access token và có thể truy cập vào tài nguyên được bảo vệ. Dù cho server biết điều đấy nhưng không thể từ chối access token bị hack đó được, vì chúng ta chỉ verify access token có đúng hay không chứ không có cơ chế kiểm tra access token có nằm trong danh sách blacklist hay không.

Với ví dụ thứ 2, chúng ta có thể thiết lập thời gian hiệu lực của access token ngắn, ví dụ là 5 phút, thì nếu access token bị lộ thì hacker cũng có ít thời gian để xâm nhập vào tài nguyên của chúng ta hơn => giảm thiểu rủi ro.

Nhưng mà cách này không hay lắm, vì nó sẽ làm cho người dùng bị logout và phải login sau mỗi 5 phút, rất khó chịu về trải nghiệm người dùng.

Lúc này người ta mới nghĩ ra ra một cách để giảm thiểu những vấn đề trên, đó là sử dụng thêm Refresh Token.

## Refresh Token là gì?

Refresh Token là một chuỗi token khác, được tạo ra cùng lúc với Access Token. Refresh Token có thời gian hiệu lực lâu hơn Access Token, ví dụ như 1 tuần, 1 tháng, 1 năm...

Flow xác thực với access token và refresh token sẽ được cập nhật như sau:

1.  Client gửi request vào tài nguyên được bảo vệ trên server. Nếu client chưa được xác thực, server trả về lỗi 401 Authorization. Client gửi username và password của họ cho server.
2.  Server xác minh thông tin xác thực được cung cấp so với cơ sở dữ liệu user. Nếu thông tin xác thực khớp, server tạo ra **2 JWT khác nhau** là Access Token và Refresh Token chứa payload là `user_id` (hoặc trường nào đó định danh người dùng). Access Token có thời gian ngắn (cỡ 5 phút). Refresh Token có thời gian dài hơn (cỡ 1 năm). Refresh Token sẽ được lưu vào cơ sở dữ liệu, còn Access Token thì không.
3.  Server trả về access token và refresh token cho client.
4.  Client lưu trữ access token và refresh token ở bộ nhớ thiết bị (cookie, local storage,...).
5.  Đối với các yêu cầu tiếp theo, client gửi kèm access token trong header của request.
6.  Server verify access token bằng secret key để kiểm tra access token có hợp lệ không.
7.  Nếu hợp lệ, server cấp quyền truy cập vào tài nguyên được yêu cầu.
8.  Khi access token hết hạn, client gửi refresh token lên server để lấy access token mới.
9.  Server kiểm tra refresh token có hợp lệ không, có tồn tại trong cơ sở dữ liệu hay không. Nếu ok, server sẽ **xóa refresh token cũ** và **tạo ra refresh token mới với expire date như cũ** (ví dụ cái cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023) lưu vào cơ sở dữ liệu, tạo thêm access token mới.
10. Server trả về access token mới và refresh token mới cho client.

11. Client lưu trữ access token và refresh token mới ở bộ nhớ thiết bị (cookie, local storage,...).

12. Client có thể thực hiện các yêu cầu tiếp theo với access token mới (quá trình refresh token diễn ra ngầm nên client sẽ không bị logout).

13. Khi người dùng muốn đăng xuất thì gọi API logout, server sẽ xóa refresh token trong cơ sở dữ liệu, đồng thời client phải thực hiện xóa access token và refresh token ở bộ nhớ thiết bị.

14. Khi refresh token hết hạn (hoặc không hợp lệ) thì server sẽ từ chối yêu cầu của client, client lúc này sẽ xóa access token và refresh token ở bộ nhớ thiết bị và chuyển sang trạng thái bị logout.

### Vấn đề bất cập giữa lý thuyết và thực tế

Mong muốn của việc xác thực bằng JWT là stateless, nhưng ở trên các bạn để ý mình lưu refresh token vào cơ sở dữ liệu, điều này làm cho server phải lưu trữ trạng thái của người dùng, tức là không còn stateless nữa.

Chúng ta muốn bảo mật hơn thì chúng ta không thể cứng nhắc cứ stateless được, vậy nên kết hợp stateless và stateful lại với nhau có vẻ hợp lý hơn. Access Token thì stateless, còn Refresh Token thì stateful.

Đây là lý do mình nói có sự mâu thuẫn giữa lý thuyết và thực tế áp dụng, khó mà áp dụng hoàn toàn stateless cho JWT trong thực tế được.

Và có một lý do nữa tại sao mình lưu refresh token trong database đó là refresh token thì có thời gian tồn tại rất là lâu, nếu biết ai bị lô refresh token thì mình có thể xóa những cái refresh token của user đó trong database, điều này sẽ làm cho hệ thống an toàn hơn.

Tương tự nếu mình muốn logout một người dùng nào đó thì mình cũng có thể xóa refresh token của người đó trong database. Sau khoản thời gian access token họ hết hạn thì họ thực hiện refresh token sẽ không thành công và họ sẽ bị logout. Có điều là nó không tức thời, mà phải đợi đến khi access token hết hạn thì mới logout được.

Chúng ta cũng có thể cải thiện thêm bằng cách cho thời gian hết hạn access token ngắn lại và dùng websocket để thông báo cho client logout ngay lập tức.

## Trả lời một vạn câu hỏi vì sao về JWT

### Tại sao lại tạo một refresh token mới khi chúng ta thực hiện refresh token?

Vì nếu refresh token bị lộ, hacker có thể sử dụng nó để lấy access token mới, điều này khá nguy hiểm. Vậy nên dù refresh token có thời gian tồn tại rất lâu, nhưng cứ sau vài phút khi access token hết hạn và thực hiện refresh token thì mình lại tạo một refresh token mới và xóa refresh token cũ.

Lưu ý là cái Refresh Token mới vẫn **giữ nguyên ngày giờ hết hạn của Refresh Token cũ**. Cái cũ hết hạn vào 5/10/2023 thì cái mới cũng hết hạn vào 5/10/2023.

Cái này gọi là **refresh token rotation**.

### Làm thế nào để revoke (thu hồi) một access token?

Các bạn có thể hiểu revoke ở đây nghĩa là thu hồi hoặc vô hiệu hóa

Như mình đã nói ở trên thì access token chúng ta thiết kế nó là stateless, nên không có cách nào revoke ngay lập tức **đúng nghĩa** được mà chúng ta phải chữa cháy thông qua websocket và revoke refresh token

Còn nếu bạn muốn revoke ngay thì bạn phải lưu access token vào trong database, khi muốn revoke thì xóa nó trong database là được, nhưng điều này sẽ làm access token không còn stateless nữa.

### Có khi nào có 2 JWT trùng nhau hay không?

Có! Nếu payload và secret key giống nhau thì 2 JWT sẽ giống nhau.

Các bạn để ý thì trong payload JWT sẽ có trường `iat` (issued at) là thời gian tạo ra JWT (đây là trường mặc định, trừ khi bạn disable nó). Và trường `iat` nó được tính bằng giây.

Vậy nên nếu chúng ta tạo ra 2 JWT trong **cùng 1 giây** thì lúc thì trường `iat` của 2 JWT này sẽ giống nhau, cộng với việc payload các bạn truyền vào giống nhau nữa thì sẽ cho ra 2 JWT giống nhau.

### Ở client thì nên lưu access token và refresh token ở đâu?

Nếu trình duyệt thì các bạn lưu ở cookie hay local storage đều được, mỗi cái đều có ưu nhược điểm riêng. Nhưng cookie sẽ có phần chiếm ưu thế hơn "1 tí xíu" về độ bảo mật.

Chi tiết so sánh giữa local storage và cookie thì mình sẽ có một bài viết sau nhé.

Còn nếu là mobile app thì các bạn lưu ở bộ nhớ của thiết bị.

### Gửi access token lên server như thế nào?

Sẽ có 2 trường hợp

- **Lưu cookie**: Nó sẽ tự động gửi mỗi khi request đến server, không cần quan tâm nó.
- **Lưu local storage**: Các bạn thêm vào header với key là `Authorization` và giá trị là `Bearer <access_token>`.

### Tại sao phải thêm Bearer vào trước access token?

Thực ra bạn thêm hay không thêm thì phụ thuộc vào cách server backend họ code như thế nào.

Để mà code api authentication chuẩn, thì server nên yêu cầu client phải thêm `Bearer` vào trước access token. Mục đích để nói xác thực là "Bearer Authentication" (xác thực dựa trên token).

Bearer Authentication được đặt tên dựa trên từ "bearer" có nghĩa là "người mang" - tức là bất kỳ ai có token này sẽ được coi là người có quyền truy cập vào tài nguyên được yêu cầu. Điều này khác với các phương pháp xác thực khác như "Basic Authentication" (xác thực cơ bản) hay "Digest Authentication" (xác thực băm), cần sử dụng thông tin đăng nhập người dùng.

Việc thêm "Bearer" vào trước access token có một số mục đích chính:

1.  **Xác định loại xác thực**: Cung cấp thông tin cho máy chủ về phương thức xác thực mà ứng dụng khách muốn sử dụng. Điều này giúp máy chủ xử lý yêu cầu một cách chính xác hơn.
2.  **Tính chuẩn mực**: Sử dụng tiền tố "Bearer" giúp đảm bảo rằng các ứng dụng và máy chủ tuân theo các quy tắc chuẩn trong cách sử dụng và xử lý token.
3.  **Dễ phân biệt**: Thêm "Bearer" giúp phân biệt giữa các loại token và xác thực khác nhau. Ví dụ, nếu máy chủ hỗ trợ nhiều phương thức xác thực, từ "Bearer" sẽ giúp máy chủ xác định loại xác thực đang được sử dụng dựa trên token.

Khi sử dụng Bearer Authentication, tiêu đề `Authorization` trong yêu cầu HTTP sẽ trông như sau:

```
Authorization: Bearer your_access_token
```

### Khi tôi logout, tôi chỉ cần xóa access token và refresh token ở bộ nhớ của client là được chứ?

Nếu bạn không gọi api logout mà đơn thuần chỉ xóa access token và refresh token ở bộ nhớ của client thì bạn vẫn sẽ logout được, nhưng sẽ không tốt cho hệ thống về mặt bảo mật. Vì refresh token vẫn còn tồn tại ở database, nếu hacker có thể lấy được refresh token của bạn thì họ vẫn có thể lấy được access token mới.

### Tôi có nghe về OAuth 2.0, vậy nó là gì?

OAuth 2.0 là một giao thức xác thực và ủy quyền tiêu chuẩn dành cho ứng dụng web, di động và máy tính để bàn. Nó cho phép ứng dụng của bên thứ ba (còn gọi là ứng dụng khách) truy cập dữ liệu và tài nguyên của người dùng từ một dịch vụ nhà cung cấp (như Google, Facebook, Twitter, ...) mà không cần biết thông tin đăng nhập của người dùng.

Nói đơn giản, nó chỉ là một giao thức thôi, ứng dụng là làm mấy chức năng như đăng nhập bằng google, facebook trên chính website chúng ta á 😂.

Về cái này mình sẽ có một bài viết riêng luôn, vẫn trong series này nhé.

## Lưu JWT token ở local storage hay cookie?

Có rất nhiều tranh cãi xung quanh việc lưu token ở đâu? Có người lưu ở Local Storage, có người lưu ở Cookie, có người lưu ở Session Storage, có người lưu ở RAM, có người lưu ở IndexedDB, có người lưu ở WebSQL, có người lưu ở đâu đó khác nữa...

Vậy thực sự thì lưu ở đâu mới tốt?

Bài viết này không áp dụng cho mọi dự án, nên không cần cứng nhắc đâu nhé

Oke bắt đầu luôn nhé 🤜

## Lưu Access Token ở đâu?

Với đa số các dự án thì mình sẽ không chọn lưu ở Session Storage và Ram (lưu trong 1 biến của JavaScript) bởi vì

- Nếu lưu ở Session Storage thì khi bạn đóng trình duyệt đi mở lại thì session storage sẽ bị xóa => Bạn sẽ phải đăng nhập lại.
- Nếu lưu ở RAM thì bạn sẽ không thể chia sẻ access token giữa các tab trình duyệt được, cũng như đóng tab thì access token sẽ mất => Bạn sẽ phải đăng nhập lại

Rõ ràng UX trong 2 trường hợp này không tốt, trừ khi yêu cầu dự án của các bạn là như vậy.

### Lưu ở Local Storage

**Ưu điểm**

- Nhanh, tiện lợi, không cần phụ thuộc vào backend để lưu trữ.
- Bộ nhớ khá lớn, thường là trên **5MB**
- Có thể tự quyết định request nào cần access token để gửi lên server, request nào không cần
- Không tự động gửi access token lên server, nên nếu bị tấn công CSRF thì attacker không thể lấy được access token của bạn.

**Nhược điểm**

- Nếu bị tấn công XSS thì attacker có thể lấy được access token

Một website có thể bị tấn công XSS từ khá là nhiều nguồn, ví dụ như: Do chính code chúng ta viết ra có lỗ hổng, do các thư viện bên thứ 3 như React, Vue, Lodash,...

Đây là cái lý do duy nhất mà một số người anti localstorage một cách cực đoan.

### Lưu ở Cookie

**Ưu điểm**

- Không thể truy cập được từ Javascript nếu bạn set thuộc tính `httpOnly`, nên nếu có bị tấn công XSS thì cũng không lấy được token của bạn.

**Nhược điểm**

Có một cái nhược điểm đó là có thể bị tấn công CSRF, nhưng bạn có thể giải quyết bằng cách thêm một số thuộc tính cho cookie như `sameSite`, `secure`, `domain`, `path` để giảm thiểu khả năng bị tấn công CSRF.

Ngoài ra nếu dùng các framework SPA ngày nay nữa thì khả năng bị tấn công CSRF cũng không còn cao nữa. Vậy nên mình không cho đây là nhược điểm.

Vậy theo mình nhược điểm khi dùng Cookie là

- Bạn không thể lấy được các payload của JWT token, vì JavaScript không truy cập được vào cookie nếu chúng ta set thuộc tính `httpOnly` cho cookie.
- Bộ nhớ Cookie trên trình duyệt rất bé, loanh quanh **4KB** thôi.
- Dùng cookie thì phía backend sẽ phải xử lý thêm một số thứ như: parse cookie, set cookie, kiểm tra request đến server. Nếu đến từ browser thì parse cookie, nếu đến từ mobile app thì dùng header Authorization để lấy token...

**Bạn thấy đấy, lưu ở đâu cũng có ưu nhược riêng.**

### Tại sao chúng ta không kết hợp cả 2 nhỉ?

Cookie đem lại ưu thế hơn 1 xíu về độ bảo mật khi so với local storage, nhưng cũng làm mất đi cái hay của JWT là có thể đọc được payload của JWT token ở client.

Có những trường hợp chúng ta cần đọc payload để biết thời gian hết hạn của token chẳng hạn, nhưng không lấy được access token ở trong cookie cũng khá là khó chịu.

Giải quyết vấn đề này thì chúng ta có thể chia access token làm 2 phần:

- **Header.Payload** thì lưu ở local storage
- **Signature** thì lưu ở cookie

Khi gửi lên server thì server sẽ ghép 2 phần này lại thành 1 và kiểm tra tính hợp lệ của token.

Như vậy thì client có thể đọc được payload JWT và cũng giữ lại ưu điểm của việc lưu ở Cookie.

### Vậy thì không nên lưu token ở Local Storage à?

Đâu đó bạn sẽ gặp những bài như [Please Stop Using Local Storage](https://dev.to/rdegges/please-stop-using-local-storage-1i04 'Please Stop Using Local Storage') hoặc [LocalStorage vs Cookies: All You Need To Know About Storing JWT Tokens Securely in The Front-End](https://dev.to/cotter/localstorage-vs-cookies-all-you-need-to-know-about-storing-jwt-tokens-securely-in-the-front-end-15id 'LocalStorage vs Cookies: All You Need To Know About Storing JWT Tokens Securely in The Front-End') làm bạn hoang mang và có cái nhìn không tốt về Local Storage.

Nếu các bạn lướt xuống đọc comment các bài viết trên thì vẫn có rất nhiều ý kiến không đồng tình với tác giả.

Chúng ta cần làm rõ thế này, lưu trữ access token ở Cookie không giúp chúng ta tránh được tấn công XSS mà khi bị tấn công XSS thì hacker khó lấy được access token của bạn hơn thôi.

Nhiều người không hình dung ra được mức độ thiệt hại khi bị tấn công XSS nó lớn như thế nào.

Một website mà bị tấn công XSS nghĩa là web đấy toang, hacker có thể làm được nhiều việc nghiêm trọng hơn là lấy được access token của bạn. Ví dụ:

- Điều khiển website của bạn để lừa người dùng gửi tiền vào tài khoản của hacker
- Hiển thị popup yêu cầu người dùng nhập username/password để lấy thông tin người dùng

Vậy nên lưu token ở Local Storage mình thấy rất là bình thường, nó đem lại sự tiện lợi cho cả phía Front-End lẫn Back-End, không có vấn đề gì phải anti nó cả.

Muốn cân bằng giữa Cookie và Local Storage thì có thể kết hợp cả 2 như mình đã nói ở trên, rồi mã hóa thêm bằng một thuật toán nữa ở phía client cho tăng độ khó,...

Nói chung muốn bảo mật hơn thì có nhiều cách lắm, nhưng hãy nghĩ xem nó có thực sự cần thiết hay không, liệu nó có đáng để bỏ thời gian ra làm hay không.

À xíu nữa quên, nếu API chỉ nhận access token thông quan HTTP Header `Authorization` thì lại thêm 1 lý do nữa để chúng ta lưu token ở Local Storage rồi 😃

## Tóm lại

- XSS là **game over**, bất kể bạn lưu token ở đâu
- Lưu token ở Local Storage hay Cookie đều ổn, không có gì phải anti cả.
- Muốn cân bằng giữa ưu điểm của cả 2 thì có thể kết hợp cả 2.
- Mã hóa thêm 1 vài bước ở client nếu muốn tăng độ bảo mật.
