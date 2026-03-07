# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a full-stack application for "Nettoyer Shoes" - a shoe cleaning service in Malang, Indonesia.

## Tech Stack (LTS Versions)

### Backend
- **PHP**: 8.1+ (LTS: 8.1, 8.2, 8.3 supported)
- **Laravel**: 10.10+ (LTS - supported until 2026)
- **Laravel Sanctum**: 3.3+ (API authentication)
- **PHPUnit**: 10.1+ (Testing framework)
- **GuzzleHTTP**: 7.2+ (HTTP client)
- **Laravel DOMPDF**: 3.1+ (PDF generation)

### Frontend
- **Node.js**: 20.11.19 (LTS - Iron)
- **Next.js**: 14.1.0 (App Router architecture)
- **React**: 18 (Latest stable)
- **TypeScript**: 5.x (configured but not strictly enforced)

### UI & Styling
- **Tailwind CSS**: 3.3+ (Utility-first CSS)
- **PostCSS**: 8.x (CSS processing)
- **Autoprefixer**: 10.x (CSS vendor prefixes)

### Key Frontend Libraries
- **axios**: 1.6.8 (HTTP client)
- **next-client-cookies**: 1.1.1 (Cookie management)
- **@tiptap/react**: 2.3.2 (Rich text editor)
- **framer-motion**: 11.0.6 (Animations)
- **swiper**: 11.1.3 (Carousels/sliders)
- **lucide-react**: 0.378.0 (Icons)
- **react-hot-toast**: 2.4.1 (Toast notifications)
- **html-react-parser**: 5.1.10 (HTML parsing)
- **clsx**: 2.1.0 (Conditional className)

The application manages shoe cleaning services, products, articles, order tracking (resi), promotions, and shop locations.

## Development Commands

### Backend (Laravel)
```bash
# Run development server (requires PHP 8.1+)
php artisan serve

# Run tests
./vendor/bin/phpunit

# Run a specific test
./vendor/bin/phpunit tests/Feature/YourTest.php

# Clear cache
php artisan cache:clear
php artisan config:clear
php artisan route:clear

# Create storage link for file uploads
php artisan storage:link
# OR use the web route: /storage-link
# OR use artisan: /foo

# Database migrations
php artisan migrate
php artisan migrate:fresh --seed
```

### Frontend (Next.js)
```bash
# Navigate to frontend directory first
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
# Server runs on http://localhost:3000

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint
```

## Architecture

### Backend Structure

**Laravel 10 API** with RESTful endpoints under `/api/v1/` prefix.

- **Controllers**: `app/Http/Controllers/Api/v1/`
  - Standard CRUD pattern with `index()`, `store()`, `show()`, `update()`, `destroy()`
  - Additional custom methods for specific operations (e.g., `getResiDetail()`, `getByCategoryId()`)

- **Models**: `app/Models/`
  - Use `HasSearch` trait for search functionality
  - `CekResi` model has special status constants: `STATUS_ANTRIAN`, `STATUS_DIKERJAKAN`, `STATUS_SELESAI`
  - `Services` model uses slug as route key via `getRouteKeyName()`

- **API Resources**: `app/Http/Resources/`
  - Transform data for API responses
  - `*Collection` for paginated results, `*Resource` for single items

- **Helpers**: `app/Helpers/`
  - `CrudHelper`: Generic save/read/delete operations
  - `WaLinkHelper`: WhatsApp link generation
  - `GenerateResi`: Generate tracking numbers
  - `DecodeMessage`: Message decoding utilities

- **Traits**: `app/Traits/HasSearch.php`
  - Provides `scopeSearch()` method for searchable models
  - Usage: `Model::search($searchTerm, ['column1', 'column2'])`

- **Middleware**: `app/Http/Middleware/CorsMiddleware.php`
  - Applied to all API routes via `->middleware('cors')` in routes/api.php

- **File Storage**:
  - Uses Laravel's storage system (`storage/app/public/`)
  - Images stored in `public/products/`, `public/artikel/`, `public/cek_resi/`
  - Files tracked via `File` model with `parent_id` and `parent_table` polymorphic relation

### Frontend Structure

**Next.js 14 App Router** with route groups for separation of concerns.

- **Route Groups**:
  - `(main)/`: Public-facing pages (home, services, products, articles, tracking)
  - `(admin)/`: Admin dashboard with authentication
  - `app/api/v2/`: Next.js API route handlers (proxy to backend)

- **Authentication**:
  - Token-based using `next-client-cookies`
  - Protected routes via `middleware.js`
  - Redirects: `/login` → `/dashboard` (authenticated), `/dashboard` → `/login` (unauthenticated)

- **Styling**: Tailwind CSS with custom breakpoints:
  - `phone`, `phone2`, `tablet`, `laptop`, `laptop-lg`, `desktop`, `desktop-sm`, `desktop-md`, `desktop-lg`
  - Custom font: `Playfair_Display` (serif)

- **Key Dependencies**:
  - `axios`: HTTP client for API requests
  - `react-hot-toast`: Notification system
  - `@tiptap/react`: Rich text editor for articles
  - `framer-motion`: Animations
  - `swiper`: Image carousels
  - `lucide-react`: Icon library

- **Components**: `app/components/`
  - Shared UI components (Navbar, Sidebar, Footer, Modal, Tiptap editor)

### API Routes

**Backend API** (`/api/v1/`):
- Authentication: `login`, `logout`, `getUser/{token}`, `changePassword`
- Products: CRUD + `allProductsCategory`
- Services: CRUD + `getByCategoryId`, `getById`
- Articles: CRUD + `rekomendasiArtikel/{categoryId}`
- Article Categories: CRUD
- Service Categories: CRUD + `getSlug`, `getId`, `allServiceCategory`
- Tracking (CekResi): CRUD + `getResi`, `getResiDetail/{kode_resi}`, `status-pengerjaan`, `items/{kode_resi}`
- WhatsApp Numbers: CRUD + `getExistsNomor`
- Promotions: CRUD + `showPromoNavbar`
- Shop Locations: CRUD
- PDF: `pdf/{kode_resi}`

**Frontend API** (`/api/v2/`):
- Proxy routes that consume backend APIs
- Used for data fetching in Next.js pages

## Key Patterns

### Search Implementation
Models use `HasSearch` trait for searchable queries:
```php
// In controller
$query = Model::search($searchTerm, ['column1', 'column2'])->paginate();
```

### Pagination
Most index endpoints support:
- `?search=term`: Search across specified columns
- `?all=true`: Return all records without pagination
- `?page=1&limit=10`: Custom pagination

### File Upload Handling
1. Store file: `$file->storeAs('public/folder', $file->hashName())`
2. Save filename to database
3. For polymorphic files, create `File` records with `parent_id` and `parent_table`
4. Delete old files when updating

### WhatsApp Link Generation
- `WaLinkHelper::orderProduct()`: Generate order links for products
- `WaLinkHelper::templateService()`: Generate order links for services
- Links stored in database fields like `whatsapp_link` and `link_wa`

### Tracking Number (Resi) System
- `CekResi`: Main tracking records
- `ResiTemp`: Temporary tracking records (for status updates)
- Status workflow: `Dalam Antrian` → `Sedang Dikerjakan` → `Dikirim / Selesai`
- Generate via: `GenerateResi::generateResi($tokoId)`

## Configuration

### Backend Environment (.env)
```
APP_URL=http://localhost
FRONTEND_URL=http://localhost:3000
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel
DB_USERNAME=root
DB_PASSWORD=
```

### Frontend Environment (frontend/.env.local)
```
NEXT_PUBLIC_APP_URL='http://localhost:3000'
NEXT_PUBLIC_BACKEND_URL='https://nettoyershoes.com/backend'
```

**Note**: The frontend uses a custom server.js for development. The `NEXT_PUBLIC_BACKEND_URL` points to the production backend by default.

## Database

- **Primary Tables**: `products`, `services`, `cek_resi`, `artikels`, `artikel_categories`, `service_categories`, `promos`, `tokos`, `nomors`, `users`
- **Support Tables**: `resi_temps`, `files` (for polymorphic file storage)
- **Relationships**: Models use Eloquent relationships (belongsTo, hasOne, etc.)

## Testing

- PHPUnit configuration: `phpunit.xml`
- Test suites: Unit (`tests/Unit/`), Feature (`tests/Feature/`)
- Run with: `./vendor/bin/phpunit`
