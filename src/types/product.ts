export interface Product {
  id: string;
  slug: string;
  title: string;
  brand: string;
  categoryId: string;
  images: string[];
  price: number;
  oldPrice?: number;
  specs: {
    cpu?: string;
    ram?: string;
    storage?: string;
    display?: string;
    battery?: string;
    camera?: string;
    os?: string;
    weight?: string;
    color?: string;
  };
  rating: {
    avg: number;
    count: number;
  };
  stock: "in_stock" | "preorder" | "out_of_stock";
  warrantyMonths: number;
  deliveryEtaDays: number;
  createdAt: string;
  featured?: boolean;
  isNew?: boolean;
  description?: string;
}

export interface Category {
  id: string;
  slug: string;
  name: string;
  description?: string;
  image?: string;
  parentId?: string | null;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Filter {
  brands: string[];
  priceRange: [number, number];
  ram: string[];
  storage: string[];
  stock: string[];
}
