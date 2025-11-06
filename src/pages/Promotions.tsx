import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard';
import { useTranslations } from '@/lib/i18n';
import { listProducts } from '@/lib/api/mock';
import type { Product } from '@/types/product';

export default function Promotions() {
  const { t } = useTranslations();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadPromotions() {
      setLoading(true);
      const { products } = await listProducts({});
      // Filter products with discounts
      const promoProducts = products.filter(p => p.oldPrice && p.oldPrice > p.price);
      setProducts(promoProducts);
      setLoading(false);
    }
    loadPromotions();
  }, []);

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
          {t('nav.promotions')}
        </h1>
        <p className="text-muted-foreground">
          Special offers and discounts on top tech products
        </p>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse" />
          ))}
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">
            No active promotions at the moment
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
