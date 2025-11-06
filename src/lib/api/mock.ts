import type { Product, Category } from '@/types/product';
import productsData from '@/data/products.json';
import categoriesData from '@/data/categories.json';

// Simulate API delay
const delay = (ms: number = 300) => new Promise(resolve => setTimeout(resolve, ms));

export async function listProducts(filters?: {
  categoryId?: string;
  brands?: string[];
  priceRange?: [number, number];
  sortBy?: 'relevance' | 'newest' | 'priceAsc' | 'priceDesc' | 'rating';
  limit?: number;
  offset?: number;
}): Promise<{ products: Product[]; total: number }> {
  await delay();
  
  let products = [...productsData] as Product[];
  
  // Apply filters
  if (filters?.categoryId) {
    products = products.filter(p => p.categoryId === filters.categoryId);
  }
  
  if (filters?.brands && filters.brands.length > 0) {
    products = products.filter(p => filters.brands?.includes(p.brand));
  }
  
  if (filters?.priceRange) {
    const [min, max] = filters.priceRange;
    products = products.filter(p => p.price >= min && p.price <= max);
  }
  
  // Apply sorting
  if (filters?.sortBy) {
    switch (filters.sortBy) {
      case 'newest':
        products.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      case 'priceAsc':
        products.sort((a, b) => a.price - b.price);
        break;
      case 'priceDesc':
        products.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        products.sort((a, b) => b.rating.avg - a.rating.avg);
        break;
    }
  }
  
  const total = products.length;
  
  // Apply pagination
  if (filters?.limit) {
    const offset = filters.offset || 0;
    products = products.slice(offset, offset + filters.limit);
  }
  
  return { products, total };
}

export async function getProduct(slugOrId: string): Promise<Product | null> {
  await delay();
  
  const product = productsData.find(
    p => p.id === slugOrId || p.slug === slugOrId
  ) as Product | undefined;
  
  return product || null;
}

export async function listCategories(): Promise<Category[]> {
  await delay();
  return categoriesData as Category[];
}

export async function getCategory(slugOrId: string): Promise<Category | null> {
  await delay();
  
  const category = categoriesData.find(
    c => c.id === slugOrId || c.slug === slugOrId
  ) as Category | undefined;
  
  return category || null;
}

export async function searchProducts(query: string): Promise<Product[]> {
  await delay();
  
  const lowerQuery = query.toLowerCase();
  const products = productsData.filter(p => 
    p.title.toLowerCase().includes(lowerQuery) ||
    p.brand.toLowerCase().includes(lowerQuery) ||
    p.description?.toLowerCase().includes(lowerQuery)
  ) as Product[];
  
  return products;
}

export async function getFeaturedProducts(): Promise<Product[]> {
  await delay();
  return productsData.filter(p => p.featured) as Product[];
}

export async function getNewArrivals(): Promise<Product[]> {
  await delay();
  return productsData.filter(p => p.isNew) as Product[];
}
