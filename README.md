# PokéDex Hub - Pokémon Explorer & Collections Manager

Ứng dụng web Single Page Application (SPA) xây dựng trên nền tảng **React 18**, **Vite 5**, **TypeScript**, **Tailwind CSS**, và **Zustand**, kết nối trực tiếp với **PokéAPI** (REST API đa thực thể).

Dự án cung cấp trải nghiệm mượt mà, giao diện hiện đại responsive hoàn hảo từ laptop đến desktop, hỗ trợ Dark / Light mode và lưu trữ dữ liệu bền vững qua `localStorage`.

---

## 🌟 Tính năng chính (Key Features)

### 1. Trang Khám phá & Tìm kiếm (Explore PokeDex - `/`)

- **Tìm kiếm Real-time có debounce**: Tra cứu nhanh Pokémon theo tên (VD: `pikachu`, `charizard`) hoặc ID số (VD: `25`).
- **Bộ lọc Hệ Nguyên Tố (Elemental Types)**: Lọc động 18 hệ (Fire, Water, Grass, Electric, Psychic, Dragon...).
- **Thẻ Pokémon (Interactive Cards)**:
  - Hiển thị Artwork HD chính thức kèm mã định danh chuẩn (`#025`).
  - Màu nền và viền thẻ tự động thích ứng theo hệ nguyên tố chính.
  - Tóm tắt chỉ số cơ bản (HP, ATK, DEF, SPD).
  - **❤️ Icon Yêu thích (Favorite)**: Đánh dấu/bỏ yêu thích tức thì.
  - **📁 Icon Gán nhóm (Group Assign)**: Dropdown menu phân loại nhanh Pokémon vào các nhóm bộ sưu tập.
  - **👁️ Icon Xem chi tiết (Detail Modal)**: Mở dialog xem thông số chỉ số sức mạnh (Base Stats progress bars), chiều cao, cân nặng, và kỹ năng (Abilities).
- **Phân trang (Load More)**: Tải thêm Pokémon linh hoạt.

### 2. Trang Bộ Sưu Tập & Quản lý Nhóm (Favorites & Custom Collections - `/favorites`)

- **Quản lý Nhóm gom tuỳ chỉnh (Custom Groups)**:
  - Tạo nhóm mới với Tên, Mô tả, và Bảng màu đại diện (Color Badge).
  - Xóa nhóm bộ sưu tập (tự động giải phóng liên kết các Pokémon trong nhóm).
- **Lọc theo Tab Nhóm**:
  - Tab _Tất cả yêu thích_
  - Tab _Chưa phân nhóm_
  - Các Tab nhóm tùy biến (VD: _Đội hình Chiến Đấu_, _Bộ Sưu Tập Yêu Thích_, _Săn Gym_...)
- **Thống kê Nhóm (Group Insights)**: Tổng số lượng Pokémon và phân bố các hệ chủ đạo trong nhóm.
- **Xóa mục yêu thích**: Thao tác xóa trực tiếp hoặc điều chỉnh nhóm ngay tại trang.
- **Empty States**: Giao diện hướng dẫn trực quan khi chưa có Pokémon hoặc nhóm đang trống.

### 3. Lưu trữ Bền vững (Storage Persistence)

- Sử dụng **Zustand `persist` middleware** lưu trữ toàn bộ trạng thái Yêu thích và Danh sách Nhóm vào `localStorage`.
- Dữ liệu được bảo toàn nguyên vẹn khi người dùng tải lại trang (F5) hoặc mở lại trình duyệt.

## 📌 Trạng thái hiện tại (Current Status)

- Đã hoàn thiện luồng Explore (`/`), Favorites (`/favorites`), tìm kiếm, lọc hệ, phân trang, modal chi tiết, yêu thích và nhóm bộ sưu tập.
- Đã có unit tests cho service PokéAPI và favorites store.
- Playwright coverage cho các luồng Pokémon chính vẫn là hạng mục follow-up.
- Ứng dụng phụ thuộc kết nối mạng để gọi PokéAPI; khi API không khả dụng, giao diện cần hiển thị trạng thái lỗi thay vì dữ liệu giả.

---

## 🚀 Hướng dẫn Cài đặt & Chạy Local

### Yêu cầu môi trường (Prerequisites)

- **Node.js**: Phiên bản `v18.18.0` trở lên (Khuyến nghị `v20.x` LTS hoặc `v22.x`).
- **Package Manager**: `pnpm` (phiên bản `9.x`). Cài đặt nhanh qua `npm install -g pnpm` hoặc `corepack enable`.

### Các bước khởi chạy

```bash
# 1. Clone repository hoặc mở thư mục dự án
cd react-vite-starter

# 2. Cài đặt các gói phụ thuộc (Dependencies)
pnpm install

# 3. Khởi chạy máy chủ phát triển (Dev Server)
pnpm dev
```

Mở trình duyệt tại: `http://localhost:5173`

---

## 🛠️ Danh mục Lệnh (Available Scripts)

| Lệnh                       | Mô tả                                                                 |
| :------------------------- | :-------------------------------------------------------------------- |
| `pnpm dev`                 | Khởi động Vite Development Server hỗ trợ HMR siêu tốc                 |
| `pnpm build`               | Kiểm tra Type-check và đóng gói ứng dụng cho Production               |
| `pnpm preview`             | Xem trước bản build production tại local                              |
| `pnpm test -- --runInBand` | Chạy toàn bộ Unit Tests với Jest                                      |
| `pnpm lint`                | Kiểm tra quy chuẩn mã nguồn với ESLint (Airbnb TypeScript + Prettier) |
| `pnpm format .`            | Tự động định dạng mã nguồn theo chuẩn Prettier                        |
| `pnpm test:e2e`            | Chạy bộ kiểm thử tự động End-to-End với Playwright                    |

### Phạm vi kiểm thử hiện tại

Unit tests bao phủ service và store chính. E2E tests dành cho Explore, tìm kiếm/lọc, persistence của favorites, tạo nhóm và modal chi tiết vẫn cần được bổ sung.

---

## 🏗️ Quyết định Kiến trúc & Lựa chọn Thư viện (Architecture Decisions)

```text
src/
├── types/              # TypeScript domain entities & API response contracts
│   └── pokemon.ts      # PokemonSummary, PokemonDetails, PokemonGroup, FavoritePokemon
├── components/         # Shared UI components
│   ├── pokemon/        # PokemonCard, PokemonDetailModal, GroupManagerModal, TypeBadge
│   └── ui/             # Reusable primitives (Dialog, DropdownMenu, Button, Badge...)
├── layout/             # Application Shell (Header với Live Navigation & Theme Switcher)
├── routes/             # TanStack Router file-based routes
│   ├── __root.tsx      # Root route layout (Header + Outlet container)
│   ├── index.tsx       # Page 1: Explore & Discovery PokeDex
│   └── favorites.tsx   # Page 2: Favorites & Custom Collections
├── services/           # API Service layer (PokéAPI endpoints, mappers, in-memory cache)
│   ├── pokemonApi.ts
│   └── __tests__/      # Service unit tests
├── store/              # Zustand state management
│   ├── favoritesStore.ts # Persistent Favorites & Groups store
│   ├── themeStore.ts   # Persisted Dark/Light theme store
│   └── __tests__/      # Store unit tests
└── lib/                # Utilities & class merge helpers (clsx, tailwind-merge)
```

1. **Framework: React 18 + Vite 5 + TypeScript**:
   - Thời gian build và Hot Module Replacement (HMR) cực nhanh.
   - Strict TypeScript đảm bảo an toàn kiểu dữ liệu (Type-Safety) xuyên suốt từ tầng API raw response đến UI component.
2. **State Management: Zustand với Persist Middleware**:
   - Gọn nhẹ (< 2KB), không boilerplate phức tạp như Redux Toolkit.
   - Lưu trữ `favorites` dưới dạng `Record<number, FavoritePokemon>` giúp thao tác tra cứu, toggle, gán nhóm đạt độ phức tạp thời gian tối ưu $O(1)$.
   - Tích hợp sẵn cơ chế đồng bộ `localStorage` tự động.
3. **Routing: TanStack Router**:
   - File-based routing với khả năng code-splitting tự động cho từng route trang.
   - Type-safe search params và path parameters.
4. **Styling & UI Primitives: Tailwind CSS + Radix UI**:
   - Tối ưu kích thước bundle CSS, thiết kế responsive dễ dàng (`sm:`, `md:`, `lg:`, `xl:`).
   - Radix UI (`Dialog`, `DropdownMenu`) chuẩn Accessibility (a11y) và bàn phím (Keyboard navigation).

---

## ⏱️ Đánh Đổi Trong Giới Hạn Sprint 2 Tiếng (Time-boxed Trade-offs)

Quy trình phát triển được phân chia theo kế hoạch 2 giờ:

### Giờ 1: Thiết kế Cấu trúc & Nền tảng (1 Hour Structure & Foundation)

- Thiết kế hệ thống kiểu dữ liệu Clean Architecture trong `src/types/pokemon.ts`.
- Xây dựng tầng Service API `src/services/pokemonApi.ts` kèm mappers và cache bộ nhớ.
- Thiết kế Store Contract `src/store/favoritesStore.ts` với đầy đủ CRUD cho Yêu thích và Nhóm gom.
- Cấu hình Jest test runner cho TypeScript.

### Giờ 2: Triển khai Tính năng & Hoàn thiện Giao diện (1 Hour Core Feature Sprint)

- Xây dựng Trang 1: Khám phá, Tìm kiếm debounced, Bộ lọc 18 hệ, Grid responsive.
- Xây dựng Trang 2: Tab lọc nhóm, Thống kê hệ chủ đạo, Tạo/xóa nhóm, Empty states.
- Xây dựng các Modal: Chi tiết chỉ số Pokémon và Quản lý nhóm.
- Viết Unit tests và hoàn thiện tài liệu.

### Các Đánh Đổi Kỹ Thuật (Trade-offs Made):

1. **REST Fetching + In-Memory Cache thay vì cài thêm TanStack Query (React Query)**:
   - _Lý do_: Giữ starter gọn nhẹ, không thêm dependency mới; tự cài đặt cache nhẹ và Promise.all đáp ứng đủ yêu cầu trong 1 giờ code.
2. **LocalStorage thay vì Database Backend / Mock Service Worker**:
   - _Lý do_: Đảm bảo đúng tiêu chí ứng dụng browser-only starter theo quy định `AGENTS.md`, dữ liệu người dùng vẫn được lưu vĩnh viễn trên máy client.
3. **Phân trang Client/Offset thay vì Virtualized Infinite Scroll**:
   - _Lý do_: Đủ nhanh và mượt mà cho 100-200 Pokémon đầu tiên mà không phát sinh độ phức tạp về DOM recycling.

---

## 🔮 Kế hoạch Mở rộng & Refactor (Future Enhancements Wishlist)

Nếu có thêm thời gian phát triển, các tính năng sau sẽ được nâng cấp:

1. **Tích hợp TanStack Query (React Query)**:
   - Tự động quản lý Server State, background revalidation, stale-while-revalidate, và retry logic khi mạng chập chờn.
2. **Công cụ So Sánh Chỉ Số (Pokémon Battle Comparator)**:
   - Cho phép chọn 2 Pokémon để so sánh song song thanh chỉ số (Radar chart / Bar comparison) và tương khắc hệ (Type Effectiveness).
3. **Xuất/Nhập Bộ Sưu Tập (Export & Import Data)**:
   - Hỗ trợ tải về file JSON bộ sưu tập hoặc tạo link chia sẻ đội hình cho bạn bè.
4. **Tối ưu Danh sách Lớn với Virtualization**:
   - Dùng `@tanstack/react-virtual` để hiển thị mượt mà toàn bộ hơn 1000 Pokémon của tất cả các Gen.
5. **Âm thanh Tiếng kêu (Pokemon Cries Audio)**:
   - Tích hợp phát file âm thanh tiếng kêu đặc trưng của từng Pokémon từ PokéAPI.
