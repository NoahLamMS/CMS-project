# Next.js Architecture - Feature-Based + Domain-Driven

## Proposed Folder Structure

```
next-base-structure/
├── src/
│   ├── app/                    # Next.js App Router (Routes/Pages)
│   │   ├── (auth)/            # Route groups
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/            # Protected routes
│   │   │   ├── home/
│   │   │   ├── products/
│   │   │   └── profile/
│   │   ├── api/                # API Routes
│   │   │   └── [feature]/
│   │   ├── layout.tsx         # Root layout
│   │   ├── page.tsx           # Home page
│   │   └── globals.css
│   │
│   ├── features/              # Feature-based modules (Domain-Driven)
│   │   ├── auth/
│   │   │   ├── components/    # Auth-specific components
│   │   │   ├── hooks/         # Custom hooks
│   │   │   ├── api/           # API functions
│   │   │   ├── store/         # State management (Zustand)
│   │   │   ├── types/         # Types
│   │   │   └── index.ts       # Public API
│   │   ├── products/
│   │   │   ├── components/
│   │   │   ├── hooks/
│   │   │   ├── api/
│   │   │   ├── store/
│   │   │   ├── types/
│   │   │   └── index.ts
│   │   └── profile/
│   │       └── ...
│   │
│   ├── shared/                # Shared code across features
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/            # Base UI (Button, Input, Card)
│   │   │   └── layout/        # Layout components
│   │   ├── hooks/             # Shared hooks
│   │   ├── utils/             # Utility functions
│   │   ├── constants/         # Constants
│   │   └── types/             # Common types
│   │
│   ├── core/                  # Core infrastructure
│   │   ├── api/               # API client (Axios/Fetch)
│   │   │   ├── client.ts
│   │   │   ├── endpoints.ts
│   │   │   └── interceptors.ts
│   │   ├── config/            # App configuration
│   │   │   ├── env.ts
│   │   │   └── theme.ts
│   │   ├── services/          # Core services
│   │   │   ├── storage.service.ts
│   │   │   └── analytics.service.ts
│   │   └── store/             # Global store
│   │
│   ├── lib/                   # Third-party libraries setup
│   │   ├── zustand.ts
│   │   ├── react-query.ts
│   │   └── utils.ts
│   │
│   └── types/                 # Global TypeScript types
│       └── env.d.ts
│
├── public/                    # Static assets
├── docs/                      # Documentation
└── ...
```

## Key Principles

### 1. **Feature-Based Organization**
- Each feature is self-contained
- All related code (components, hooks, API, types) in one folder
- Clear boundaries between features

### 2. **Domain-Driven Design**
- Features represent business domains
- Example: `auth`, `products`, `cart`, `orders`, `profile`

### 3. **Next.js App Router Integration**
- `src/app/` for routes and pages
- Route groups `(auth)`, `(main)` for organization
- API routes in `src/app/api/`

### 4. **Shared vs Feature-Specific**
- **Shared**: Reusable across features (Button, Input, hooks)
- **Feature**: Domain-specific (ProductCard, AuthForm)

## Example: Product Feature

```
features/products/
├── components/
│   ├── ProductCard.tsx
│   ├── ProductList.tsx
│   └── ProductFilter.tsx
├── hooks/
│   ├── useProducts.ts
│   └── useProductDetail.ts
├── api/
│   └── productApi.ts
├── store/
│   └── productStore.ts
├── types/
│   └── product.types.ts
└── index.ts              # Export public API
```

## Data Fetching Strategy

### Server Components (Default)
```tsx
// app/products/page.tsx
import { productApi } from '@/features/products';

export default async function ProductsPage() {
  const products = await productApi.getProducts();
  return <ProductList products={products} />;
}
```

### Client Components (Interactivity)
```tsx
// features/products/components/ProductList.tsx
'use client';
import { useProducts } from '@/features/products';

export function ProductList() {
  const { data, isLoading } = useProducts();
  // ...
}
```

### API Routes
```tsx
// app/api/products/route.ts
import { productApi } from '@/features/products/api';

export async function GET() {
  const products = await productApi.getProducts();
  return Response.json(products);
}
```

## State Management

- **Server State**: React Query (TanStack Query)
- **Client State**: Zustand
- **Form State**: React Hook Form + Zod

## Recommended Packages

```json
{
  "dependencies": {
    "@tanstack/react-query": "^5.x",
    "zustand": "^4.x",
    "react-hook-form": "^7.x",
    "zod": "^3.x",
    "axios": "^1.x"
  }
}
```

## Benefits

1. **Scalability**: Easy to add new features
2. **Maintainability**: Clear organization
3. **Team Collaboration**: Multiple developers can work on different features
4. **Reusability**: Shared components and utilities
5. **Type Safety**: Full TypeScript support

