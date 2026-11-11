---
title: "Hướng dẫn bàn giao dev — Template website THVC Fund v10 (nhiều trang)"
workspace_id: THIHUB_Org
document_type: handoff_note
task_id: T0020
version: v01
status: working
created_by: claude_code
created_at: 2026-11-11
base_version: "Core v09 — 03_Dau_ra/261110_Core_Template_THVC_PA1_v09/2026-09-24_020_CLD_Template_website_THVC_PA1_v09.html"
requirements: "02_Xu_ly/261111_022_CLD_Hang_doi_yeu_cau_v10_Sub_pages_v08.md"
---

# Template website THVC Fund v10: hướng dẫn bàn giao dev

## 1. Đây là gì
Bộ **template giao diện** (HTML, CSS, JavaScript thuần, không thư viện, không bước build) cho website Quỹ Đầu tư mạo hiểm tỉnh Thanh Hóa. Mỗi mục menu là một trang riêng. Dev dùng bộ này làm chuẩn giao diện rồi dựng vào CMS hoặc framework của mình.

**Không gồm:** CMS, gửi form thật, cơ sở dữ liệu, tên miền, hosting. Mọi dữ liệu có nhãn `Mẫu`, `Demo`, `Chờ xác nhận` hoặc ô viền đứt là **dữ liệu minh họa**, phải thay trước khi phát hành.

**Xem thử:** mở `index.html` bằng trình duyệt (bấm đúp). Không cần máy chủ. Font tải từ Google Fonts nên cần internet để đúng font.

## 2. Cấu trúc thư mục
```
index.html                Trang chủ (bản giao mặc định)
index-day-du.html         Trang chủ — bản xem thử ĐẦY ĐỦ, gồm cả các khối TẮT mặc định (chỉ để duyệt giao diện)
gioi-thieu.html           Về THVC › Giới thiệu
mo-hinh.html              Về THVC › Mô hình
he-sinh-thai.html         Về THVC › Hệ sinh thái
linh-vuc.html             Đầu tư › Lĩnh vực
quy-trinh.html            Đầu tư › Quy trình
lo-trinh.html             Đầu tư › Lộ trình
cong-bo-thong-tin.html    Công bố thông tin › Công bố của Quỹ
van-ban-phap-ly.html      Công bố thông tin › Văn bản pháp lý
tin-tuc.html              Hoạt động › Tin tức
tin-tuc-chi-tiet.html     (mẫu trang chi tiết tin)
su-kien.html              Hoạt động › Sự kiện
su-kien-chi-tiet.html     (mẫu trang chi tiết sự kiện)
lien-he.html              Liên hệ (kèm Hỏi đáp)
dang-ky.html              Nút "Đề xuất đầu tư" — form tiếp nhận hồ sơ
chinh-sach.html           Điều khoản & Chính sách bảo mật (khung)
style-guide.html          Hệ thống thiết kế — trang tham chiếu cho dev
404.html                  Trang lỗi
assets/css/tokens.css     Biến thiết kế (màu, font, cỡ chữ co giãn, bo góc, bóng)
assets/css/base.css       CSS của bản v09 đã duyệt — NGUYÊN VĂN
assets/css/components.css Thành phần mới của v10
assets/css/type-scale.css Thang cỡ chữ (máy tính + điện thoại)
assets/js/main.js         Menu, bộ lọc, form (demo), hiệu ứng
assets/img/               Logo (3) và ảnh Thanh Hóa (4) tách từ v09 — dùng làm ảnh đầu bài và ảnh mẫu
assets/files/             Biểu mẫu đề xuất đầu tư (Excel) để người dùng tải
partials/header.html      Khối dùng chung — BẢN GỐC (header + menu)
partials/footer.html      Khối dùng chung — BẢN GỐC (footer)
partials/to-top.html      Khối dùng chung — BẢN GỐC (nút lên đầu trang)
```

## 3. Menu (Human chốt 11/11/2026)
| Top menu | Sub menu |
|---|---|
| Về THVC | Giới thiệu · Mô hình · Hệ sinh thái |
| Đầu tư | Lĩnh vực · Quy trình · Lộ trình |
| Công bố thông tin | Công bố của Quỹ · Văn bản pháp lý |
| Hoạt động | Tin tức · Sự kiện |
| Liên hệ | — |
| Nút vàng | Đề xuất đầu tư |

- Logo dẫn về Trang chủ.
- Bấm mục cha **chỉ mở sub menu**, không dẫn tới trang.
- Trên máy tính, rê chuột cũng mở sub menu. Dưới 1100px dùng menu hamburger (mốc dời từ 980px khi tăng cỡ chữ menu và logo, Human 11/11/2026). Menu 16px; logo header cao 60px (40px trên điện thoại).
- Trang đang xem được đánh dấu bằng `aria-current="page"` và mục cha `.is-active`.

## 4. Kiến trúc CSS: một hệ thống thống nhất
Thứ tự nạp: `tokens.css` → `base.css` → `components.css` → `type-scale.css`.
- **Đổi màu, font, bo góc:** sửa `tokens.css`, toàn site đổi theo.
- **`base.css`:** giao diện v09 đã được duyệt, giữ nguyên văn. Đừng sửa file này khi cập nhật nội dung. Lưu ý: v09 có một số mã màu viết trực tiếp (ví dụ `#fff`, `#DDEBE6`), không qua biến. Chúng được giữ nguyên để không lệch giao diện đã duyệt.
- **`components.css`:** chỉ dùng biến trong `tokens.css`.
- **`type-scale.css`:** chữ thường (không đậm, không in hoa) = cỡ v09 + 4px trên máy tính (đoạn văn 16 → 20px); trên điện thoại thấp hơn 2px theo chuẩn iOS (Body 17pt) / Android (Body Large 16sp), đoạn văn 18px (Human chốt 11/11/2026); vùng bấm trên điện thoại/màn cảm ứng tối thiểu 44px; chữ đậm hoặc in hoa giữ cỡ v09 (Human chốt 11/11/2026). Riêng điện thoại (< 720px): chữ đậm, in hoa cũng tăng khoảng 1px; chữ nhỏ nhất 13px; ô nhập 16px (tránh iOS tự phóng to). Tiêu đề lớn giữ nguyên.
- **Tránh trùng tên class v09.** Ví dụ v09 đã dùng `.open`, `.dd`, `.in`, `.show`, nên trạng thái mở menu dùng `.is-open`.

## 5. Thành phần và chỗ admin cập nhật
Trong HTML, mỗi thành phần nằm giữa hai chú thích:
```html
<!-- ▼ THÀNH PHẦN: TÊN · ADMIN cập nhật: các trường cần sửa -->
...
<!-- ▲ HẾT: TÊN -->
```
- **Khối dùng chung có bản gốc riêng trong `partials/`** (Human chốt 11/11/2026): `header.html`, `footer.html`, `to-top.html`. Dev tạo layout/partial tương ứng trong CMS hoặc framework và **include** vào các trang; không chép tay vào từng trang.
  - Trong các trang xem thử, mỗi khối nằm giữa chú thích `<!-- ▼ DÙNG CHUNG: FOOTER · bản gốc: partials/footer.html … -->` và `<!-- ▲ HẾT DÙNG CHUNG: FOOTER -->`. Nội dung giữa hai chú thích là **bản chép** để mở file xem được ngay (không cần máy chủ), không phải nội dung riêng của trang.
  - Header, footer, nút lên đầu trang có ở **mọi trang**. Khối Kêu gọi (dải vàng) **đã gỡ** (Human chốt 11/11/2026): lối vào form là nút "Đề xuất đầu tư" trên header (điện thoại hiện chữ ngắn "Gửi hồ sơ") và trang Liên hệ.
  - Trang đang xem trên menu: dev gán `aria-current="page"` cho liên kết và class `is-active` cho mục cha theo URL.
  - Bên thiết kế cập nhật khối dùng chung bằng cách sửa file trong `partials/` rồi chạy `02_Xu_ly/261111_024_CLD_Dong_bo_partials_v01.py <thư_mục_v10> sync` để chép vào cả 18 trang.
- **Footer không cố định ở đáy màn hình** (Human chốt 11/11/2026); chỉ header cố định.
- **Footer mỏng** (Human chốt 11/11/2026): cột trái logo + "© 2026 THVC Fund"; cột phải tên công ty (tiếng Việt in đậm, tiếng Anh nhỏ) + 3 mục có nhãn: Trụ sở chính · Mã số doanh nghiệp · Website (3 cột từ 1280px; 520–1279px Trụ sở một hàng, hai mục kia chia đôi; dưới 520px một cột); cảnh báo mạo danh một dòng nhạt, không khung. Không có dòng cuối, không có liên kết Điều khoản/Chính sách ở footer (trang chính sách vẫn liên kết từ ô đồng ý trong form). Cỡ chữ: tên công ty 17px, nội dung 16px, ©/cảnh báo 14px, nhãn và tên tiếng Anh 12–13px.
- **Kênh liên hệ** (hotline, email, mạng xã hội) xuất hiện ở trang Liên hệ, khối kêu gọi và trang sự kiện; thông tin doanh nghiệp (địa chỉ, mã số, website) ở footer, Giới thiệu và Liên hệ. Dev nên đưa vào **một nguồn cấu hình** để đổi một chỗ.
- Danh mục đầy đủ các thành phần xem ở `style-guide.html`.

**Nội dung admin tự cập nhật** (cần nối CMS):
| Trang | Dữ liệu |
|---|---|
| Trang chủ | Khối "Hoạt động mới nhất": tick "nổi bật" cho 2 mục (ảnh 16:9, nhãn, tiêu đề, ngày, tóm tắt); 4 mục mới nhất tự lấy theo ngày; câu tóm tắt thẻ |
| Giới thiệu, Mô hình, Lĩnh vực, Quy trình, Lộ trình, Chính sách | Toàn bộ nội dung bài (khuôn K1, trình soạn thảo) |
| Công bố của Quỹ | Văn bản: nhóm, năm, số hiệu, tên, ngày công bố, tệp PDF |
| Văn bản pháp lý | Loại, tên, số hiệu, cơ quan ban hành, ngày, hiệu lực, tóm tắt điểm chính, tệp |
| Tin tức | Chuyên mục, ảnh, ngày, tiêu đề, tóm tắt, nội dung bài |
| Sự kiện | Ngày, tên, giờ, địa điểm, trạng thái (sắp / đã diễn ra), chương trình, đăng ký |
| Hệ sinh thái | Cổ đông, cơ quan, đối tác, logo |

Bộ lọc và tìm kiếm trong template chạy bằng JS trên dữ liệu đã có trong trang (thuộc tính `data-cat`, `data-year`). Khi dữ liệu nhiều, dev chuyển sang lọc và phân trang phía máy chủ; giữ nguyên giao diện.

## 4C. Tiêu đề chữ thường (Human chốt 11/11/2026)
- Mọi **tiêu đề** (H1 đầu trang, tiêu đề khối, tiêu đề trong bài, tên thẻ) trên Trang chủ và sub page hiển thị **chữ thường** đúng như văn bản gốc (ví dụ "Giới thiệu THVC Fund", "Cơ cấu vốn"); không còn ép in hoa. **Font tiêu đề: Be Vietnam Pro 600**, chữ hơi khít (−0,01em) (Human chốt 11/11/2026, tham khảo hcmc.vc), biến `--heading` trong `tokens.css`; tải từ Google Fonts cùng Montserrat (nội dung). **Con số lớn** (dải số liệu, số thứ tự bước, khối ngày sự kiện) vẫn dùng Barlow Condensed (`--display`).
- Cỡ tiêu đề đặt lại cho font mới (mục "FONT TIÊU ĐỀ" cuối `components.css`): Hero tối đa 64px, tiêu đề trang 50px, tiêu đề khối 36px, tiêu đề trong bài 28px, tên thẻ 19–22px.
- **Nhãn nhỏ** (eyebrow như "Về THVC", nhãn loại tin, nhãn cột phụ, tiêu đề cột bảng, nhãn ô thông tin) vẫn in hoa — đây là nhãn, không phải tiêu đề.
- Admin nhập tiêu đề theo kiểu viết câu thông thường (viết hoa chữ đầu và tên riêng).
- Footer: nhãn Trụ sở chính · Mã số doanh nghiệp · Website cũng chữ thường (14px, đậm, vàng). Tên pháp nhân tiếng Việt và tiếng Anh giữ IN HOA vì là tên đăng ký chính thức.

## 4A. Nền sub page: thân trang trắng đồng bộ (Human chốt 11/11/2026, phương án B)
- 17 sub page có `<body class="subpage">`. Header và Footer giữ nền navy; **toàn bộ thân trang nền trắng**, kể cả đầu trang con (đường dẫn, nhãn, tiêu đề, lời dẫn chuyển chữ tối). Dải sóng dưới đầu trang con đã bỏ; hai khối trắng liền nhau ngăn bằng đường kẻ mảnh.
- Không còn khối ảnh nền trong sub page: 4 ảnh Thanh Hóa nay là **ảnh đầu bài** của Giới thiệu, Mô hình, Quy trình, Lộ trình (khuôn K1).
- Trang chủ (`index.html`, `index-day-du.html`) **không** có class `subpage`, giữ nền xen kẽ.
- CSS: mục "SUB PAGE: thân trang nền trắng" trong `components.css`. Trang con mới tạo về sau chỉ cần thêm `class="subpage"` vào `<body>`.

## 4B. Mỗi sub page một khối, theo 5 khuôn chung (Human chốt 11/11/2026)
Mỗi sub page = Header + Đầu trang con + **một khối nội dung** + (dải Tiếp theo) + Footer. Dev chỉ cần dựng 5 khuôn:

| Khuôn | Trang | Admin cập nhật |
|---|---|---|
| **K1. Trang nội dung**: bài viết + cột phụ ("Trong mục này" / "Trong trang này", ô "Bạn có dự án?") | Giới thiệu, Mô hình, Lĩnh vực, Quy trình, Lộ trình, Chính sách | Soạn bài bằng trình soạn thảo: ảnh đầu bài, đoạn mở đầu (`p.lede`), tiêu đề phụ (h2/h3), đoạn văn, danh sách (`ul`), danh sách đánh số (`ol` — tự hiện thành các bước), bảng, trích dẫn (`blockquote`), liên kết. Không có khối thiết kế riêng |
| **K2. Danh sách văn bản** (lọc + danh sách) | Công bố của Quỹ, Văn bản pháp lý | Từng văn bản (dữ liệu) |
| **K3. Hoạt động** (2 nổi bật + cột mới nhất + danh sách đầy đủ, một khối) | Tin tức, Sự kiện | Từng tin / sự kiện (dữ liệu); tick "nổi bật" |
| **K4. Bài chi tiết** (bài viết + cột phụ, cùng bố cục K1) | Tin chi tiết, Sự kiện chi tiết | Nội dung bài / sự kiện |
| **K5. Danh bạ, biểu mẫu, liên hệ** (một khối) | Hệ sinh thái (3 nhóm), Liên hệ (kênh + hỏi đáp), Đề xuất đầu tư (form) | Danh sách đơn vị + logo; kênh liên hệ, hỏi đáp; câu hỏi form |

- CSS khuôn K1: mục "KHUÔN K1" trong `components.css` (`.prose`, `.page-side`, `.side-nav`). Bảng nhiều cột tự cuộn ngang trên điện thoại.
- Trang chủ là ngoại lệ (khối bật/tắt, mục 5A). Các khối thiết kế của v09 (thẻ vốn, nguyên tắc, phương thức, đồng hành, thoái vốn, mốc lộ trình, ảnh nền) **không còn dùng ở sub page**; CSS của chúng vẫn nằm trong `base.css` (giữ nguyên v09), dev có thể bỏ qua.

## 5A. Khối Trang chủ: bật/tắt (Human chốt 11/11/2026)
Mỗi khối giữa Hero và Footer là một đơn vị độc lập; chú thích đầu khối ghi `BẬT mặc định` hoặc `TẮT mặc định` và dữ liệu admin/dev cần cung cấp. Tắt một khối không làm lệch khối khác (nền trắng/kem xen kẽ, nên khi tắt khối giữa chỉ cần đổi nền khối kế tiếp nếu hai khối cùng màu).

| Thứ tự | Khối | Mặc định | Dữ liệu admin | Nơi xem |
|---|---|---|---|---|
| 1 | Hero + dải số liệu | Bật (khối chính, không tắt) | Đoạn giới thiệu, số liệu vốn | `index.html` |
| 2 | **Hoạt động mới nhất** (2 thẻ nổi bật + cột "Tin mới nhất") | **Bật** | 2 mục tick "nổi bật" (tin hoặc sự kiện sắp diễn ra); khoảng 8–10 mục mới nhất tự theo ngày (cột có thanh cuộn); sự kiện hết hạn tự rời khỏi khối | `index.html` |
| 3 | Thẻ tóm tắt (4 thẻ; thẻ 3 có hai lối vào Quy trình và Lộ trình) | Bật | Câu tóm tắt mỗi thẻ | `index.html` |
| 4 | Công bố mới nhất (3–5 văn bản) | **Tắt** — bật khi có văn bản thật | Cùng dữ liệu với trang Công bố của Quỹ | `index-day-du.html` |
| 5 | Cổ đông và cơ quan quản lý (lưới logo) | **Tắt** — bật khi có logo thật | Cùng dữ liệu với trang Hệ sinh thái | `index-day-du.html` |

## 5B. Tin tức và Sự kiện: giống khung, khác thông tin (Human chốt 11/11/2026)
- **Cấu trúc chung** (theo mẫu Human gửi), dùng ở Trang chủ, Tin tức, Sự kiện: nhãn + tiêu đề; bên trái 2 thẻ lớn "nổi bật" (ảnh 16:9, nhãn · ngày, tiêu đề, tóm tắt); bên phải cột "mới nhất" (khoảng 8–10 mục: ảnh nhỏ, tiêu đề, loại · ngày; liên kết "Xem tất cả →"). **Cột có thanh cuộn riêng** (Human yêu cầu 11/11/2026): trên máy tính cột cao đúng bằng hai thẻ nổi bật, danh sách cuộn bên trong; trên điện thoại hiện khoảng 4,5 mục rồi cuộn; vùng cuộn dùng được bằng bàn phím. Thanh cuộn mảnh màu vàng; trên macOS và Ubuntu hệ điều hành có thể tự ẩn thanh cuộn khi không rê chuột — mục cuối lộ một nửa để gợi ý còn tin. Giao diện theo bảng màu và font THVC.
- **Tin tức** (`tin-tuc.html`): đầu trang theo cấu trúc trên; bên dưới là danh sách đầy đủ có lọc chuyên mục, tìm kiếm, phân trang. Sắp xếp mới nhất trước.
- **Sự kiện** (`su-kien.html`): hướng về phía trước. Hai thẻ lớn = hai sự kiện sắp tới gần nhất (khối ngày, giờ, địa điểm, nhãn trạng thái, "Đăng ký tham dự"); cột phải = các sự kiện sắp tới tiếp theo. Danh sách mặc định chỉ hiện **sắp diễn ra** (ngày gần nhất lên đầu); thẻ lọc **Đã diễn ra** là lưu trữ, làm mờ nhẹ, nút "Xem lại" và "Tin tường thuật" (liên kết sang bài tin). Khi không có sự kiện sắp tới hiện thông báo "Chưa có sự kiện sắp tới".
- **Gợi ý dev:** hai loại nội dung riêng (Tin tức, Sự kiện), cùng một cơ chế "hoạt động" để lấy dòng chảy chung cho Trang chủ; sự kiện tự chuyển trạng thái theo ngày diễn ra.

## 6. Form "Đề xuất đầu tư" (`dang-ky.html`)
- Câu hỏi lấy từ **Phiếu đề xuất đầu tư – sàng lọc** của Quỹ (bản Excel, có sẵn để tải trong `assets/files/`), chia 6 phần: thông tin cơ bản; mô hình kinh doanh & thị trường; tài chính; đội ngũ; nhu cầu gọi vốn; tài liệu đính kèm.
- **11 ô bắt buộc** (do CLD đề xuất, Quỹ có thể đổi): tên, loại hình, lĩnh vực, người liên hệ, email, điện thoại, vấn đề giải quyết, giải pháp cốt lõi, giai đoạn, link pitch deck, ô đồng ý chính sách.
- **Trong template:** form chỉ kiểm tra dữ liệu và hiện thông báo lỗi hoặc thành công. Nó **không gửi đi** (`form[data-demo]`).
- **Theo biên bản họp 22/10/2026:**
  - **Giai đoạn 1:** dev nối form để chuyển hồ sơ về email của Quỹ. Email gợi ý là `quydautu@thanhhoa.gov.vn`, chờ Quỹ xác nhận. Người gửi nhận email xác nhận.
  - **Giai đoạn 2:** nâng cấp form khi Quỹ có quy trình tiếp nhận, phân công, xử lý hoàn chỉnh.
- **Dev cấu hình:** số tệp và dung lượng tệp đính kèm, chống spam, lưu trữ dữ liệu theo chính sách bảo mật.

## 7. Góp ý của THVC (đợt 20/10/2026) đã đưa vào v10
Theo bản thống kê `02_Xu_ly/261021_021_CLD_Thong_ke_gop_y_khach_hang_v01.md`. Các mục ⚠️ là **cách hiểu của CLD** và cần Quỹ xác nhận.

| # | Nội dung | Trạng thái |
|---|---|---|
| 1 | Khẩu hiệu Hero → "Đầu tư cho đổi mới sáng tạo và tăng trưởng mới" (bỏ khẩu hiệu ba vế) | ⚠️ N1 |
| 2 | Đoạn giới thiệu Hero theo văn bản Quỹ đưa; "Hỗ trợ hệ sinh thái khởi nghiệp sáng tạo." in đậm làm câu mở đầu; bỏ câu "Vận hành theo cơ chế thị trường…" ở Hero (vẫn có ở trang Giới thiệu) | ⚠️ N2 |
| 3 | Nguyên tắc số 4: "Tách bạch giữa hoạt động quản trị, điều hành doanh nghiệp với hoạt động tư vấn, phản biện, thẩm định chuyên môn." | Đã sửa |
| 4 | Đoạn mô tả Lĩnh vực theo văn bản Quỹ; giữ nhãn và tiêu đề | ⚠️ N3 |
| 5 | Quy trình còn 6 bước: gộp "Tìm kiếm dự án" + "Tiếp nhận hồ sơ" → "Tiếp nhận, đăng ký hồ sơ" | ⚠️ N4 |
| 6 | Nút "Gửi thông tin dự án" → "Đề xuất đầu tư" (nút header; Hero nay không còn nút; khối kêu gọi đã gỡ) | Đã sửa |
| 7 | "Cổ đông sáng lập" → "Cổ đông góp vốn" | ⚠️ N5 (a) |
| 8 | Chữ trên điện thoại to hơn | Đã sửa (type-scale.css); máy tính cũng tăng chữ thường |
| 9 | Dải số liệu dưới Hero: giữ, chữ to hơn | ⚠️ N6 (phương án giữ) |
| 10–11 | Không tách từ ghép ("hiệu quả", "phân tán", "kết nối") | Đã sửa |
| 12 | 3 cơ quan một hàng, THiHUB hàng dưới (nhóm "Đối tác") | ⚠️ N7 |
| 13 | Khu vực dự án đầu tư/thoái vốn | Khối "Hoạt động mới nhất" Trang chủ + chuyên mục Tin tức |
| 14, 17 | Menu "Công bố thông tin" và trang công bố (nhóm theo góp ý Pháp chế) | Đã làm (dữ liệu mẫu) |
| 15 | Tin dự án, đối tác | Trang Tin tức (dữ liệu mẫu) |
| 16 | Văn bản pháp lý (Nghị định 264, Luật 93/2025) | Đã làm; số hiệu, tên đầy đủ, ngày cần Quỹ xác nhận (N9) |
| 18–19 | Form riêng, có đính kèm, gửi về email Quỹ | Đã làm giao diện; phần gửi do dev (mục 6) |
| 20 | Đủ kênh liên lạc | Khung đủ kênh, dữ liệu DEMO (N11) |

## 8. Dữ liệu cần Quỹ cung cấp trước khi phát hành
1. **Kênh liên hệ chính thức:** hotline, email nhận hồ sơ, giờ làm việc, Facebook, Zalo OA, YouTube, LinkedIn (kênh nào không có thì bỏ).
2. **Website chính thức:** xác nhận `quydautu.thanhhoa.gov.vn`, hiện đang dùng `http://`.
3. **Logo:** logo thật của 8 doanh nghiệp cổ đông và các cơ quan (hiện minh họa bằng chữ).
4. **Văn bản pháp lý:** số hiệu, tên đầy đủ, ngày ban hành, hiệu lực, tệp; tóm tắt điểm chính vận dụng (Pháp chế).
5. **Công bố thông tin:** danh mục bắt buộc công bố theo quy định (Pháp chế), văn bản thật.
6. **Giới thiệu:** thành viên Hội đồng quản trị, Ban điều hành; mô tả Đại hội đồng cổ đông.
7. **Nội dung Điều khoản & Chính sách bảo mật** (Pháp chế), **thời gian phản hồi hồ sơ** (Hỏi đáp).
8. **Tin tức, sự kiện** thật (kể cả tick "nổi bật" cho 2 mục ở Trang chủ, Tin tức, Sự kiện).
9. **Dải phân cách:** chọn 1 trong 3 phương án (Sóng lúa, Răng bo tròn, Nhịp trống đồng). Hiện dùng cả ba như v09.

## 9. Việc dev cần làm thêm khi dựng thật
- Tách header, footer, khối kêu gọi thành layout dùng chung; nối CMS cho các nội dung ở mục 5.
- Nối form (mục 6); thêm form đăng ký sự kiện.
- **SEO:** `sitemap.xml`, `robots.txt`, `canonical`, ảnh chia sẻ mạng xã hội theo URL tuyệt đối (cần tên miền chính thức).
- **Hiệu năng:** tối ưu ảnh (WebP, nhiều kích thước). Ảnh hiện là bản gốc tách từ v09, mỗi ảnh nền khoảng 150–310 KB. Cân nhắc tự lưu font thay cho Google Fonts.
- Cấu hình máy chủ trả `404.html` cho trang không tồn tại.

## 10. Kiểm tra đã làm (11/11/2026, Firefox headless)
- **Liên kết, ảnh, thẻ HTML:** 19 trang không có liên kết hỏng, ảnh thiếu, thẻ đóng sai hay id trùng. Header và footer giống nhau từng ký tự ở mọi trang.
- **Tràn ngang:** 19 trang × 10 độ rộng (360, 390, 412, 520, 768, 1024, 1100, 1280, 1440, 1536 px) đều không tràn.
- **Chữ trên điện thoại:** không còn chữ nội dung nhỏ hơn 13px. Ngoại lệ: chữ vẽ trong biểu tượng Zalo, chữ của logo minh họa, và trang style guide.
- **Chức năng:** 21/21 phép thử đạt (lọc theo nhóm, năm, loại văn bản; tìm kiếm; trạng thái rỗng; mở/đóng sub menu; phím Esc; đánh dấu trang hiện tại; form báo lỗi, email sai, form hợp lệ; hamburger; Sự kiện mặc định chỉ hiện sắp diễn ra, thẻ Đã diễn ra, nút tin tường thuật; khối Hoạt động mới nhất ở Trang chủ và Sự kiện; Hero không còn nút; không còn khối Kêu gọi; thẻ Quy trình/Lộ trình; nút header điện thoại hiện "Gửi hồ sơ").
- **Chưa kiểm:** Safari/iOS và Chrome/Android trên thiết bị thật; trình đọc màn hình.
