# GIT COMMAND

Sẽ có các khu vực theo thứ tự dưới đây

1. **Khu vực làm việc**: Chính là nơi đang code, vẫn ở local
2. **Khu vực staging**: Sau khi dùng `git add` thì file sẽ được đưa lên khu vực này, vẫn ở trên local
3. **Khu vực committed**: Sau khi dùng `git commit` thì file từ staging sẽ được đưa lên đây, cũng vẫn ở trên local
4. **Khu vực remote (gọi origin cũng được)**: Sau khi dùng `git push` sẽ file ở committed lên đây, bây giờ file đã đưa lên trên server

## BASIC

### Hiển thị trạng thái với `git status`

```bash
git status
```

Câu lệnh git status này sẽ hiển thị

- Đang ở branch nào
- Trạng thái branch so với origin như thế nào (cái này nhiều lúc không chính xác vì dữ liệu đã được thay đổi trên origin, muốn chính xác thì phải `git fetch` để tải về dữ liệu mới nhất)
- Trạng thái các file trong dự án, file nào đang được git track (theo dõi)

### Thêm file vào khu vực Staging với `git add`

```bash
git add index.html app.js
```

### Commit code với `git commit`

```bash
git commit -m "Title" -m "Description"
```

### Khôi phục những file ở khu vực Staging về khu vực code với `git reset`

- Khôi phục 1 file từ staging về khu vực code

```bash
git reset index.html
```

- Khôi phục nhiều file

```bash
git reset index.html app.js
```

- git reset index.html app.js

```bash
git reset .
```

### Đẩy lên server `git push`

```bash
git push origin master
```

### Kéo code từ remote repo về với `git pull`

Câu lệnh dưới đây sẽ pull code từ nhánh master về nhánh hiện tại ở local

```bash
git pull origin master
```

> Mặc định đối với nhánh master thì chỉ cần `git pull` là được rồi vì git nó tự hiểu là đang pull từ origin master.

### Hiển thị log commit với `git log`

- Hiển thị những thông tin commit gần đây. Các nhân phím **"q"** để quit (thoát)

```bash
git log
```

- Một số phím chức năng có thể nhập đề điều hướng và tìm kiếm trong log như:
  - return - dòng tiếp theo
  - w - trang tiếp
  - phím space - trang trước
  - q - thoát
  - ?pattern - tìm kiếm, với pattern là mẫu tìm kiếm (keyword)
  - /pattern - giống ?pattern
  - n - đến vị trí tìm kiếm phía dưới
  - N - đến kết quả tìm kiếm phía trước

- Xem dạng rút gọn thì

```bash
git log --online
```

### Bỏ qua file với .gitignore

Có những file không muốn bị git giám sát thì chỉ cần tạo file `.gitignore` và thêm các file và folder vào file `.gitignore` này.

**`.gitignore`**

```bash
# Comment
.example.exe # Ignore File
!folder/file.exe # Phủ định Ignore
node_modules/ # Ignore folder
*.exe # Ignore tất cả các file có đuôi là `.exe`
log* # Ignore tất cả các file bắt đầu là log
folder/**.exe # Ignore mọi file có đuôi là `.exe` trong folder (sub folder thì ko bị)
folder/**/**.exe # Ignore mọi file có đuôi là `.exe` trong folder (kể cả sub folder)
folder/** # Ignore mọi thứ bên trong folder
```

### Xử lý Git cache

Trong một số trường hợp code một thời gian rồi, push pull các kiểu rồi, sau đó mới thêm các file vào `.gitignore`, lúc này những file đó có thể không bị ignore vì nó đã bị git cache từ trước và git nó vẫn quản lý những file này. Cách giải quyết là hãy xóa những file đó ra khỏi cache

```bash
git rm -r --cached /đường-dẫn-file-hoặc-folder
```

## Làm việc với Branch

### Tạo branch mới

```bash
git branch TenNhanhMoi
```

- Tạo rồi thì chuyển qua luôn

```bash
git checkout -b TenNhanhMoi
```

`git switch` mới ra ở phiên bản Git 2.23

```bash
git switch -c TenNhanhMoi
```

### List tất cả branch

- Xem local

```bash
git branch
```

- Xem remote branch

```bash
git branch -r
```

- Xem cả local và remote branch

```bash
git branch -a
```

### Đổi tên branch

- Đổi nhánh hiện tại

```bash
git branch -m TenMoi
```

- Đổi nhánh khác

```bash
git branch -m TenNhanhCu TenNhanhMoi
```

### Push một branch

```bash
git push -u origin localBranch
```

Không cần gõ chính xác tên local branch thì dùng

```bash
git push -u origin HEAD
```

> Head là tham chiếu đến đầu danh sách branch hiện tại

### Xóa branch

Xóa branch ở local

```bash
git branch -D localBranchName
```

Xóa branch ở remote

```bash
git push origin --delete remoteBranchName
```

Hoặc có thể dùng cú pháp rút gọn

```bash
git push origin :remoteBranchName
```

Nếu gặp lỗi dưới đây thì có thể ai đó đã xóa branch

```bash
error: unable to delete 'branchName': remote ref does not exist
error: failed to push some refs to 'git@repository_name'
```

Khi ai đó đã xóa một branch trên remote nhưng khi gõ `git branch -r` vẫn show ra origin branch đó thì cần thực hiện đồng bộ hóa bằng câu lệnh dưới đây.

```bash
git fetch -p
```

`-p` nghĩa là **"prune"**. Sau khi fetch, những branch không còn trên remote cũng sẽ xóa khỏi local repo .

### Push code mà không cần origin

- Kết nối local branch với remote branch sau này `git push` là xong

```bash
git push -u origin feature
```

- Xem local branch đã kết nối với remote branch nào

```bash
cat .git/config
```

### git merge

- Chuyển qua nhánh chính trước rồi merge nhánh phụ vào

```bash
git checkout main
git merge feature
```

- Nếu trong quá trình merge có bị conflict thì thao tác theo thứ tự
  1. Tìm file conflict trong tab source và fix nó.
  2. Sau khi fix hết các file bị conflict rồi thì dùng `git add .` hoặc add từng file
  3. Tiến hành thêm commit cho những file vừa fix conflict bằng câu lệnh `git merge --continue --no-edit`, nếu muốn edit commit thì `git merge --continue`, còn nếu muốn tự viết commit thì cứ `git commit -m 'thông điệp'` như thường
  4. push hết lên với câu lệnh `git push`

Nếu merge xong rồi mới nhận ra mình không cần merge nữa thì có thể dùng `git reset --hard <commit--trước-khi-merge>`. Cách này áp dụng cho cả đã push code hay chưa push đều được.

> Tips: `git pull` là sự kết hợp giữa `git fetch` và `git merge`
>
> pull request (merge request): để phục vụ việc team review và approve code trên github.

### git fetch

Phổ biến nhất là chỉ cần gõ `git fetch`, nó sẽ load về local tất cả những branch, commit hiện có.

### git remote

Lệnh `git remote` cho phép tạo, xem, xóa kết nối với các repo.

Để liệt kê các liên kết

```bash
git remote
```

> Khi lấy một remote repo bằng câu lệnh `git clone`, mặc định repo tải về có liên kết với tên `origin` chứa địa chỉ tham chiếu đến remote repo nó tải về

Hiển thị thông tin chi tiết hơn, có thêm đường dẫn đến remote Repo

```bash
git remote -v
```

Tạo một liên kết

```bash
git remote add TenRemote url
```

Xóa một địa chỉ remote

```bash
git remote rm TenRemote
```

Đổi tên địa chỉ remote

```bash
git remote rename TenCu TenMoi
```

Xem thông tin về Remote

```bash
git remote show origin
```

## Các kỹ thuật hoàn tác thay đổi với Git

### Thêm file còn thiếu vào commit vừa mới tạo

```bash
git add <file-can-them>
```

```bash
git commit --amend --no-edit
```

- --amend = sửa commit gần nhất
- --no-edit = giữ nguyên commit message

- Nếu commit đã push lên remote thì sao?

Sau khi amend rồi thì force push

```bash
git push --force-with-lease
```

### Hoàn tác file từ commit về change

```bash
git restore --source=3c13cc8 TenFile
```

Với UI VS code thì đơn giản hơn nhiều, vào "Source Control", có thể tìm file đó trong khu vực COMMITS hoặc tìm lịch sử chỉnh sửa file đó trong FILE HISTORY. Tại đây có thể xem được các file đó đã thay đổi như thế nào trong quá khứ. Sau đó click chuột phải vào file đó chọn "Restore (Checkout)" nó sẽ đưa file về trạng thái Staging

### Hoàn tác commit bằng reset (đã push hay chưa đều được)

Nếu có những local commit mà không thích, chúng chưa được push thì có thể reset để commit lại tốt hơn.

Dùng terminal

1. Tìm hash:
   - Trong commit history của Github
   - Trong terminal bằng cách gõ câu lệnh `git log --online`
   - Trong VS code
2. Copy hash

- Quay về trước commit và không staged (giống như “trước khi add”)

  ```bash
  git reset 2f5451f
  ```

  Quay về trước commit vừa tạo ko cần mã hash

  ```bash
  git reset HEAD~1
  ```

  > (git reset mặc định là --mixed)

  Kết quả:
  - Bỏ commit
  - Unstage hết (index về trước commit)
  - Code vẫn nằm trong working tree

- Quay về trước commit ở trạng thái **Staging** (giống như “đã add”)

  ```bash
  git reset --soft 2f5451f
  ```

  Quay về trước commit vừa tạo ko cần mã hash

  ```bash
  git reset --soft HEAD~1
  ```

  Kết quả:
  - Commit bị bỏ (quay về trước commit)
  - File vẫn đang staged (đã add sẵn)

- Quay về trước commit ở trạng như chưa có gì thay đổi (**Lưu ý: mất code**).

```bash
git reset --hard 2f5451f
```

- Giống `--hard` nhưng vẫn giữ code đang làm dở.

```bash
git reset --merge 2f5451f
```

3. Dùng `git push -f` để push những thay đổi

### Hoàn tác commit bằng revert

1. Chạy `git status` và chắc rằng working tree clean
2. Mỗi commit có một mã hash, tìm mã hash đó
3. Khi tìm thấy mã hash rồi thì chạy câu lệnh dưới (thay thế `2f5451f` bằng mã hash )

   ```bash
   git revert 2f5451f --no-edit
   ```

> [!NOTE] > `--no-edit` option ngăn git hỏi edit một commit message. Nếu không thêm option đó, nó sẽ mở 1 file bằng Code Editor để cho edit lại cái message mặc định khi revert, edit lại message rồi close file đi là được.

4. Tạo một commit mới nhưng là code cũ
5. Nếu làm việc với một remote repo, cần push những thay đổi đó bằng `git push`

Lưu ý dùng `git revert -m 1 <merge-commit>` để revert commit merge.

Mỗi commit đều có commit cha (commit trước nó). Những commit thường thì sẽ có 1 cha, nhưng merge commit thì có nhiều hơn 1 cha. `-m 1` là chọn commit cha đầu tiên (commit cha đầu tiên lúc nào cũng là commit trên branch của hiện tại , hay còn gọi là branch được merge). Có thể xem những commit cha bằng cách gõ `git log` và những commit cha sẽ được liệt kê trong mục `Merge` (hoặc xem trong **Git Graph**)

## Git stash

Dùng khi muốn lưu lại các thay đổi chưa commit, rất hữu dụng khi đang làm dỡ branch hiện tại mà lại muốn chuyển sang branch khác.

Để lưu toàn bộ thay đổi thì dùng

```bash
git stash
```

Để show toàn bộ thay đổi

```bash
git stash list
```

Kết quả sẽ như thế này

```bash
stash@{0}: WIP on Register: 8373b84 Hoàn thành register page
stash@{1}: WIP on Register: 812sd81 Tạo file a.md
```

Để show chi tiết toàn bộ thay đổi

```bash
git stash list -p
```

Để xem chi tiết stash vị trí thứ 0

```bash
git stash show stash@{0} -p
```

Để apply lại thay đổi stash 0

```bash
git stash apply stash@{0}
```

Để xóa một stash

```bash
git stash drop stash@{1}
```

Để xóa toàn bộ stash

```bash
git stash clear
```

## Khi nào Git sẽ bắt pull code về trước khi push lên

Khi origin branch có những commit mà local branch không có. Điều này sảy ra khi

- Mã hash commit bị thay đổi
- Đã xóa những commit trên local branch

Nếu tin rằng local branch là đúng, origin branch hãy cập nhật đúng theo local branch thì cứ dùng `git push -f` (nhưng phải để ý branch, không nên force trên branch tổng)

Có một option an toàn hơn `--force` là `--force-with-lease`. `--force-with-lease` chỉ cho phép override những commit thôi, nếu có những commit của người khác thì nó sẽ không cho push.
