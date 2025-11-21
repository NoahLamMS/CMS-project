# Next.js Base Structure - Feature-Based Architecture

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Project Structure

This project uses **Feature-Based + Domain-Driven Architecture** similar to React Native project.

### Main Structure

```
src/
├── app/              # Next.js App Router (Routes)
│   ├── (auth)/      # Authentication routes
│   ├── (main)/      # Main app routes (protected)
│   └── api/          # API routes
├── features/         # Feature-based modules
│   ├── auth/        # Auth feature
│   ├── products/    # Products feature
│   └── profile/     # Profile feature
├── shared/           # Shared components & utilities
│   ├── components/  # Reusable UI components
│   ├── hooks/       # Shared hooks
│   └── utils/       # Utility functions
├── core/             # Core infrastructure
│   ├── api/         # API client (Axios)
│   ├── config/      # App configuration
│   └── services/    # Core services
├── lib/              # Library setup
└── types/            # Global TypeScript types
```

## Getting Started

### Prerequisites

- Node.js >= 20.9.0 (recommended)
- npm, yarn, pnpm, or bun

### Installation

1. **Install dependencies:**

```bash
npm install
```

2. **Setup environment variables:**

Create `.env.local` file:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=10000
NODE_ENV=development
```

3. **Run development server:**

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Tech Stack

### Core
- **Next.js 16.0.3** - React framework
- **React 19.2.0** - UI library
- **TypeScript** - Type safety

### State Management
- **Zustand** - Client state management
- **TanStack Query (React Query)** - Server state management

### Styling
- **Tailwind CSS v4** - Utility-first CSS framework
- **clsx** & **tailwind-merge** - Class name utilities

### API
- **Axios** - HTTP client

## Features

### Current Features

- ✅ **Auth** - Authentication (login, register, logout)
- ✅ **Products** - Product management
- ✅ **Dashboard** - Admin dashboard with sidebar
- ✅ **Orders** - Order management
- ✅ **Customers** - Customer management
- ✅ **Reports** - Reports and analytics
- ✅ **Settings** - App settings

### Feature Structure

Each feature follows this structure:

```
features/{feature-name}/
├── components/    # Feature-specific components
├── hooks/         # Custom hooks
├── api/           # API functions
├── store/         # State management (Zustand)
├── types/         # TypeScript types
└── index.ts       # Public API exports
```

## Creating a New Feature

1. **Create feature structure:**

```bash
mkdir -p src/features/{feature-name}/{components,hooks,api,store,types}
```

2. **Define types first:**

```typescript
// features/{feature}/types/{feature}.types.ts
export interface FeatureData {
  id: string;
  name: string;
}
```

3. **Create API functions:**

```typescript
// features/{feature}/api/{feature}Api.ts
import { apiClient } from '@/core/api/client';
import { API_ENDPOINTS } from '@/core/api/endpoints';

export const featureApi = {
  getList: async () => {
    const { data } = await apiClient.get(API_ENDPOINTS.FEATURE.LIST);
    return data;
  },
};
```

4. **Create hooks:**

```typescript
// features/{feature}/hooks/useFeature.ts
'use client';
import { useQuery } from '@tanstack/react-query';
import { featureApi } from '../api/featureApi';

export function useFeature() {
  return useQuery({
    queryKey: ['feature'],
    queryFn: featureApi.getList,
  });
}
```

5. **Create components:**

```typescript
// features/{feature}/components/FeatureList.tsx
'use client';
import { useFeature } from '../hooks/useFeature';

export function FeatureList() {
  const { data, isLoading } = useFeature();
  // ...
}
```

6. **Export public API:**

```typescript
// features/{feature}/index.ts
export { FeatureList } from './components/FeatureList';
export { useFeature } from './hooks/useFeature';
export type { FeatureData } from './types/feature.types';
```

## Documentation

See detailed documentation in `docs/` folder:

- [ARCHITECTURE.md](./docs/ARCHITECTURE.md) - Architecture overview
- [STRUCTURE_PROPOSAL.md](./docs/STRUCTURE_PROPOSAL.md) - Structure proposal
- [API_GUIDE.md](./docs/API_GUIDE.md) - API calling guide

## 🛠️ Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## UI Libraries

Currently using:
- **Tailwind CSS v4** - Styling framework
- **Custom Components** - Button, Input, Card (self-coded)

No UI component library installed (Ant Design, Material-UI, etc.)

## Configuration

### Environment Variables

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api
NEXT_PUBLIC_API_TIMEOUT=10000
NODE_ENV=development
```

### API Client

API client is configured in `src/core/api/client.ts`:
- Auto-adds auth token to requests
- Handles 401 errors (auto logout)
- Error handling

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial
- [Next.js GitHub repository](https://github.com/vercel/next.js)

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

##  Author

**Kindy** - Created on 2025-11-16

---

**Note:** This project uses Node.js >= 20.9.0. Make sure to use the correct Node version.
