/**
 * @file product.types.ts
 * @description Product types
 * @author Kindy
 * @created 2025-11-16
 */

export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  image?: string;
  category: string;
}

export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
}

