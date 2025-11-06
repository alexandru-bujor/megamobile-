# Mega Mobile - Modern E-Commerce Platform

A premium, front-end e-commerce website for a Moldovan tech retailer, built with React, TypeScript, and modern web technologies.

## 🎨 Design System

### Brand Colors
- **Primary (Neon Lime)**: `#D7FF3F` - Used for CTAs, accents, and highlights
- **Secondary (Deep Blue)**: `#0F2B46` - Headers, trust elements, and contrast
- **Success Green**: `#22C55E` - Positive states and confirmations
- **Backgrounds**: Light `#F8FAFC` / Dark `#0E1624`

### Typography
- **Headings**: Poppins (600-800 weight)
- **Body**: Inter (300-700 weight)

### Key Features
- Rounded corners (2xl) for modern feel
- Soft shadows with subtle glow effects
- Smooth micro-animations
- Semantic color tokens throughout

## 🌍 Multi-language Support

Three languages with persistent selection:
- **Romanian (RO)** - Default
- **English (EN)**
- **Russian (RU)**

Language files: `src/i18n/{ro,en,ru}.json`

## 🎨 Theme System

Three theme modes:
- **Light Mode** - Clean and bright
- **Dark Mode** - OLED-friendly deep blues
- **System** - Auto-detects OS preference

## 🏗️ Architecture

### Tech Stack
- **Framework**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: TailwindCSS + shadcn/ui
- **State Management**: Zustand (cart, wishlist, compare, theme, i18n)
- **Routing**: React Router with lazy loading
- **Icons**: Lucide React

### Project Structure
```
src/
├── components/          # Reusable UI components
│   ├── ui/             # shadcn components
│   ├── Navbar.tsx      # Main navigation with language/theme switchers
│   ├── Footer.tsx      # Site footer with links and newsletter
│   └── ProductCard.tsx # Product display card
├── pages/              # Route pages
│   ├── Home.tsx        # Landing page with hero, categories, featured
│   ├── Catalog.tsx     # Product listing with filters
│   ├── ProductDetail.tsx # Single product view
│   ├── Cart.tsx        # Shopping cart
│   ├── Wishlist.tsx    # Saved products
│   ├── Compare.tsx     # Product comparison
│   └── Promotions.tsx  # Special offers
├── lib/
│   ├── api/
│   │   └── mock.ts     # Mock API layer (easy to replace)
│   ├── store.ts        # Zustand stores
│   ├── i18n.ts         # Translation utilities
│   ├── theme.ts        # Theme management
│   └── utils.ts        # Helper functions
├── data/               # Mock data
│   ├── products.json   # Product catalog
│   └── categories.json # Category tree
├── types/              # TypeScript definitions
│   └── product.ts      # Product, Category, Filter types
└── i18n/               # Translation files
    ├── ro.json
    ├── en.json
    └── ru.json
```

## 🛍️ Features

### Core Pages
1. **Home** (`/`)
   - Hero section with promotional banners
   - Category shortcuts
   - Bestsellers carousel
   - New arrivals section
   - Brand showcase

2. **Catalog** (`/catalog`, `/catalog/:category`)
   - Advanced filtering (brand, price, specs)
   - Sorting options (relevance, price, rating, newest)
   - Responsive filter drawer on mobile
   - Pagination support

3. **Product Detail** (`/product/:slug`)
   - Image gallery
   - Specifications table
   - Add to cart/wishlist/compare
   - Related products
   - Reviews section (placeholder)
   - Trust badges (fast delivery, warranty, returns)

4. **Shopping Cart** (`/cart`)
   - Quantity controls
   - Promo code support (try `MEGA10` for -10%)
   - Free shipping progress bar (threshold: 2000 MDL)
   - Order summary

5. **Wishlist** (`/wishlist`)
   - Saved products
   - Quick add to cart

6. **Compare** (`/compare`)
   - Side-by-side specification comparison
   - Max 4 products
   - Responsive table layout

7. **Promotions** (`/promotions`)
   - Discounted products
   - Special offers

### State Management

#### Cart Store
- Add/remove items
- Update quantities
- Calculate totals
- Persistent storage

#### Wishlist Store
- Save favorite products
- Check if product is in wishlist
- Persistent storage

#### Compare Store
- Add up to 4 products
- Side-by-side comparison
- Clear all functionality
- Persistent storage

#### Theme Store
- Light/Dark/System modes
- Persistent preference
- Auto-apply on load

#### i18n Store
- Language selection (RO/EN/RU)
- Translation helper
- Persistent preference

## 🔌 Mock API

All data operations go through `src/lib/api/mock.ts`:

```typescript
// List products with filters
const { products, total } = await listProducts({
  categoryId: 'smartphones',
  brands: ['Apple', 'Samsung'],
  priceRange: [1000, 5000],
  sortBy: 'priceAsc',
  limit: 12,
  offset: 0,
});

// Get single product
const product = await getProduct('iphone-15-pro');

// Search
const results = await searchProducts('macbook');
```

### Replacing with Real API

1. Update `src/lib/api/mock.ts` functions to call your backend
2. Keep the same TypeScript interfaces
3. All components will work without changes

Example:
```typescript
export async function listProducts(filters) {
  const response = await fetch('/api/products', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
  return response.json();
}
```

## 🎯 Key Components

### Navbar
- Sticky header with backdrop blur
- Multi-level navigation
- Search bar
- Language switcher
- Theme switcher
- Cart/Wishlist/Compare counters
- Mobile hamburger menu

### ProductCard
- Image with hover effects
- Quick action buttons (wishlist, compare)
- Stock badges
- Rating display
- Price with old price strikethrough
- Add to cart button

### Filters
- Price range slider
- Brand checkboxes
- Sort dropdown
- Clear all button
- Responsive (sidebar on desktop, drawer on mobile)

## 🚀 Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run development server**
   ```bash
   npm run dev
   ```

3. **Build for production**
   ```bash
   npm run build
   ```

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints:
  - Mobile: < 768px
  - Tablet: 768px - 1024px
  - Desktop: > 1024px
  - Wide: > 1400px

## ♿ Accessibility

- WCAG AA+ contrast ratios
- Focus indicators on all interactive elements
- Semantic HTML structure
- ARIA labels where needed
- Keyboard navigation support
- Reduced motion support

## 🎨 Customization

### Changing Colors
Edit `src/index.css` CSS variables:
```css
:root {
  --primary: 73 100% 62%;  /* Neon lime */
  --secondary: 210 64% 17%; /* Deep blue */
  /* ... */
}
```

### Adding Products
Edit `src/data/products.json`:
```json
{
  "id": "new-product",
  "slug": "new-product-slug",
  "title": "Product Name",
  "brand": "Brand",
  "categoryId": "smartphones",
  "images": ["url"],
  "price": 1999,
  "specs": { ... },
  "rating": { "avg": 4.5, "count": 100 },
  "stock": "in_stock",
  "warrantyMonths": 24,
  "deliveryEtaDays": 2
}
```

### Adding Categories
Edit `src/data/categories.json`

### Adding Translations
Edit `src/i18n/{ro,en,ru}.json`

## 🔐 SEO Optimization

- Semantic HTML structure
- Meta tags for all pages
- Canonical URLs
- Open Graph tags
- Twitter Card tags
- Structured data ready (Product, Organization, BreadcrumbList)

## 📦 Mock Data

Includes sample products:
- iPhone 15 Pro
- Samsung Galaxy S24 Ultra
- Xiaomi 14 Pro
- MacBook Air M3
- iPad Pro M4
- AirPods Pro (2nd gen)

Categories:
- Smartphones
- Laptops
- Tablets
- Wearables
- Accessories

## 🎉 Special Features

### Promo Code
Try `MEGA10` in cart for 10% discount

### Free Shipping
Progress bar shows how much more to spend for free shipping (threshold: 2000 MDL)

### Toast Notifications
All user actions show toast feedback

### Smooth Animations
- Hover effects on cards
- Fade-in on page load
- Slide-in mobile menu
- Skeleton loaders

## 🔄 Future Enhancements

Ready to add:
- [ ] User authentication
- [ ] Order history
- [ ] Product reviews
- [ ] Advanced search
- [ ] Checkout flow
- [ ] Payment integration
- [ ] Email notifications
- [ ] Inventory management
- [ ] Admin panel

## 📄 License

Built with ❤️ for Mega Mobile
