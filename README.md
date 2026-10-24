# Lab06 — Navigation

Ứng dụng Expo SDK 58, React Native, TypeScript. Hoàn thành Bài 1–5 trong `T:\Lab06_Navigation_HuongDan.docx`.

Theo `AGENTS.md`, toàn bộ điều hướng dùng **Expo Router**, các route nằm trong `src/app/`. Stack, Bottom Tab và Drawer được khai báo trong `_layout.tsx`; không tạo thêm `NavigationContainer`. Các mục tiêu và luồng thao tác trong tài liệu vẫn được giữ nguyên.

## 1. Chạy dự án

Mở PowerShell:

```powershell
cd T:\lab6
npm.cmd install
npm.cmd run web
```

Các thư viện đã được cài trong thư mục hiện tại, vì vậy có thể chạy ngay `npm.cmd run web`. Dùng hậu tố `.cmd` để tránh lỗi PowerShell chặn `npm.ps1`.

Chạy Metro cho thiết bị:

```powershell
npm.cmd start
```

Thiết bị cần ứng dụng Expo tương thích SDK 58 và các native module của dự án. Nếu bản Expo Go đang dùng không tương thích, tạo development build theo [hướng dẫn Expo](https://docs.expo.dev/develop/development-builds/introduction/). Chưa kiểm thử trực tiếp trên điện thoại hoặc giả lập Android/iOS.

## 2. Cấu hình MockAPI

`.env` đã có sẵn:

```dotenv
EXPO_PUBLIC_API_URL=https://6aca21d63115bcc958206ff2.mockapi.io
```

Ứng dụng gọi `GET /phones/1`. Hàm API chấp nhận cả URL gốc lẫn URL có đuôi `/phones`, tránh lặp `/phones/phones`.

Sau khi thay `.env`, chạy lại với cache sạch:

```powershell
npx.cmd expo start --clear
```

Để thử chế độ offline, đặt `EXPO_PUBLIC_API_URL=` rồi khởi động lại. Bài 2 sẽ dùng dữ liệu mẫu sau 600 ms. Khi đã cấu hình API thật nhưng gặp lỗi, ứng dụng hiện lỗi và nút **THỬ LẠI**, không tự che lỗi bằng dữ liệu mẫu. Mỗi yêu cầu có thời gian chờ tối đa 15 giây và được hủy khi rời bài.

Theo xác nhận của người dùng, đã cập nhật và xác minh các ID `1`–`6` thành Joy 3, Live 4, Star 5, Active 3, Aris Pro, Bee 3. Tổng số bản ghi vẫn là 20; ID `7`–`20` giữ nguyên. Bản sao dữ liệu trước khi cập nhật nằm trong `artifacts/mockapi-before-*.json`, kết quả đọc lại nằm trong `artifacts/mockapi-verified.json`.

File [mockapi_phones.json](./mockapi_phones.json) chứa 6 sản phẩm. Xem trước hoặc cập nhật lại có chủ đích:

```powershell
node --env-file=.env scripts/seed-mockapi.mjs
node --env-file=.env scripts/seed-mockapi.mjs --apply
```

Lệnh có `--apply` ghi dữ liệu lên API. Lệnh này sao lưu trước khi ghi, chỉ PUT ID 1–6, đọc lại từng bản ghi và kiểm tra các ID khác không đổi. Không cần chạy lại để sử dụng ứng dụng.

## 3. Bài 1 — Select Phone

Mở **Bài 1** trong menu:

1. **Screen 01:** ảnh xanh, tên Joy 3, 5 sao, 828 đánh giá, giá 1.790.000 đ, giá cũ gạch ngang, huy hiệu, nút `4 MÀU-CHỌN MÀU`, nút `CHỌN MUA` sát đáy.
2. Bấm chọn màu để mở **Screen 02**. Đầu màn chỉ có ảnh nhỏ xanh và tên sản phẩm. Bốn ô màu xếp dọc theo thứ tự bạc → đỏ → đen → xanh.
3. Bấm ô đỏ để thành **Screen 03**. Ô đỏ có viền, ảnh nhỏ đổi đỏ, hiện tên màu, nhà cung cấp và giá. Tên màu và nhà cung cấp in đậm.
4. Bấm `XONG` để quay về **Screen 04**. Ảnh lớn đỏ và nút đổi thành `4 MÀU-CHỌN LOẠI`.
5. Mở lại màn chọn màu: màu đỏ vẫn được chọn. Chọn màu khác rồi `XONG` để đổi lại. Bấm quay lại mà không nhấn `XONG` sẽ bỏ thay đổi tạm thời.

`router.push()` truyền màu hiện tại; `useLocalSearchParams()` đọc params; `router.dismissTo()` trả màu về màn sản phẩm đã có trong stack. Hai màn Product/ChooseColor tạo ra bốn trạng thái, không tạo bốn màn độc lập. Header ẩn đúng mẫu.

`CHỌN MUA` mở hộp thoại tóm tắt sản phẩm và màu đã chọn. Đây là tương tác minh họa, không có thanh toán. Quay lại menu bằng nút Back hệ thống, cử chỉ quay lại hoặc nút Back của trình duyệt.

Mã nguồn: `src/ex1/ProductScreen.tsx`, `ChooseColorScreen.tsx`, `PhoneContext.tsx`; route `src/app/ex1/`.

## 4. Bài 2 — Gắn API

1. Mở **Bài 2**: hiện `Đang tải...`, sau đó hiện sản phẩm lấy từ API.
2. Dùng lại chính giao diện và luồng chọn màu của Bài 1.
3. Thay tên hoặc giá của ID 1 trên MockAPI, về menu rồi mở Bài 2 để tải dữ liệu mới.
4. Đặt URL sai hoặc ngắt mạng, mở lại Bài 2: hiện thông báo lỗi và `THỬ LẠI`.
5. Khôi phục mạng và bấm `THỬ LẠI`: lỗi được xóa, hiện loading rồi tải lại.

Mã nguồn: `src/api/phoneApi.ts`, `src/ex1/PhoneContext.tsx`; route `src/app/ex2/`. Kiểm tra dữ liệu số, giới hạn rating 0–5 và kiểm tra khóa màu để dữ liệu sai không làm ứng dụng vỡ.

## 5. Bài 3 — Bottom Tab

1. **Trang chủ:** FlatList hiển thị đủ 6 sản phẩm mẫu.
2. **Tìm kiếm:** nhập `aris` hoặc `ARIS` chỉ còn Aris Pro; nhập `zzz` hiện thông báo không có kết quả.
3. **Cá nhân:** avatar tròn 96×96, chữ NA, Nguyễn Văn An và email.
4. Các tab dùng Ionicons, biểu tượng đặc/viền theo trạng thái, tab đang chọn có màu đỏ.

Mã nguồn: `src/app/ex3/`. Bài 3–4 dùng 6 sản phẩm mẫu như yêu cầu tài liệu; Bài 2 là bài chứng minh kết nối API.

## 6. Bài 4 — Stack + Tab + params + Context

1. Mở **Bài 4**, tab **Sản phẩm**.
2. Bấm Vsmart Live 4 → route `/ex4/product/2`, giá **3.990.000 đ**.
3. Bấm `♡ Lưu vào yêu thích`, quay lại, chuyển tab **Yêu thích**: có Live 4.
4. Mở sản phẩm từ danh sách yêu thích, bấm `♥ Đã lưu` để bỏ, quay lại: danh sách rỗng.
5. ID không tồn tại có thông báo `Không tìm thấy sản phẩm #id`.

Stack ngoài chứa Tab Navigator và màn chi tiết. Chi tiết nhận `id` qua route động `[id]`, tìm đúng sản phẩm; FavoritesContext dùng chung giữa hai tab và chi tiết. Yêu thích lưu trong bộ nhớ của bài, không lưu qua lần khởi động lại.

Mã nguồn: `src/app/ex4/`, `src/ex4/FavoritesContext.tsx`.

## 7. Bài 5 — Drawer

1. Mở **Bài 5**, bấm ☰ hoặc kéo từ mép trái trên thiết bị.
2. Drawer có **Trang chủ / Cá nhân / Cài đặt**, mỗi mục có Ionicons; mục chọn màu đỏ.
3. Cài đặt mặc định: thông báo BẬT, giao diện sáng.
4. Gạt hai Switch: dòng trạng thái cập nhật ngay.
5. Chế độ tối dùng SettingsContext, đổi cả nền/chữ Home, Profile, Settings, header và Drawer. Trạng thái tồn tại khi chuyển màn trong Bài 5.

Mã nguồn: `src/app/ex5/`, `src/ex5/SettingsContext.tsx`.

## 8. Kiểm tra và ảnh minh chứng

```powershell
npm.cmd run typecheck
npm.cmd run lint
npx.cmd expo-doctor
npm.cmd run export:web
node scripts/smoke-web.mjs
```

Script smoke kiểm thử trên Chromium không giao diện: bốn trạng thái chọn màu, API thật, loading, HTTP 503/thử lại, tìm kiếm, params ID, lưu/bỏ yêu thích, Drawer và chế độ tối. Trên Windows script dùng Chrome tại đường dẫn mặc định; có thể đặt `CHROME_PATH` để dùng Chromium khác. Máy không có Chrome cần cài trình duyệt Playwright bằng `npx.cmd playwright install chromium`.

Ảnh lưu trong `artifacts/screenshots/`, kết quả trong `artifacts/web-smoke-result.json`. Smoke kiểm thử web không thay thế kiểm thử thao tác vuốt trên thiết bị Android/iOS.

Kết quả đã thực hiện: TypeScript đạt; lint đạt; Expo Doctor 20/20; xuất bundle web và Android thành công; cả 5 nhóm kiểm thử trình duyệt đạt, không có lỗi JavaScript trong trình duyệt. Bundle Android dùng để xác minh đóng gói JavaScript và tài nguyên, chưa phải file APK cài đặt.

Xem bản web đã build:

```powershell
node scripts/serve-web.mjs
```

Mở `http://127.0.0.1:4173`. Web giới hạn chiều rộng 480 px để giữ bố cục điện thoại.

## 9. Tài nguyên và tài liệu

Ảnh Vsmart cùng mẫu ảnh đề bài: [bộ ảnh gốc](https://github.com/nguyentrongtiencntt/react_native_vsmart/tree/main/image), được đóng gói local trong `assets/phones/`, không phụ thuộc URL ảnh khi chạy. Các sản phẩm khác dùng lại ảnh bốn màu này để minh họa dữ liệu mẫu theo tài liệu, không phải ảnh catalog riêng của từng dòng máy.

Tài liệu đã đối chiếu: [Expo SDK 58](https://docs.expo.dev/versions/v58.0.0/), [Router layouts](https://docs.expo.dev/router/basics/navigation-layouts/), [Tabs](https://docs.expo.dev/router/advanced/tabs/), [Drawer](https://docs.expo.dev/router/advanced/drawer/), [Navigation và params](https://docs.expo.dev/router/basics/navigation/).
