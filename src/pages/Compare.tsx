import { GitCompare, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useCompare, useCart } from '@/lib/store';
import { useTranslations } from '@/lib/i18n';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';

export default function Compare() {
  const compare = useCompare();
  const cart = useCart();
  const { t } = useTranslations();

  if (compare.items.length === 0) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto p-8 text-center">
          <GitCompare className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-heading font-bold mb-2">
            No products to compare
          </h2>
          <p className="text-muted-foreground mb-6">
            Add products to compare their specifications
          </p>
          <Button asChild>
            <Link to="/catalog">Browse products</Link>
          </Button>
        </Card>
      </div>
    );
  }

  // Get all unique spec keys
  const allSpecs = new Set<string>();
  compare.items.forEach(product => {
    Object.keys(product.specs).forEach(key => allSpecs.add(key));
  });

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">
          {t('nav.compare')}
        </h1>
        <Button variant="outline" onClick={compare.clearAll}>
          Clear all
        </Button>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-max">
          <div className="grid gap-4" style={{ gridTemplateColumns: `200px repeat(${compare.items.length}, 300px)` }}>
            {/* Header Row */}
            <div className="font-semibold"></div>
            {compare.items.map(product => (
              <Card key={product.id} className="p-4">
                <div className="relative">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-0 right-0"
                    onClick={() => compare.removeItem(product.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>

                  <Link to={`/product/${product.slug}`}>
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="w-full aspect-square object-cover rounded-lg mb-4"
                    />
                  </Link>

                  <Badge variant="outline" className="mb-2">
                    {product.brand}
                  </Badge>

                  <Link to={`/product/${product.slug}`}>
                    <h3 className="font-heading font-semibold mb-3 hover:text-primary">
                      {product.title}
                    </h3>
                  </Link>

                  <p className="text-2xl font-heading font-bold mb-4">
                    {product.price} MDL
                  </p>

                  <Button
                    className="w-full"
                    onClick={() => {
                      cart.addItem(product);
                      toast.success(t('product.addToCart'));
                    }}
                  >
                    {t('product.addToCart')}
                  </Button>
                </div>
              </Card>
            ))}

            {/* Price Row */}
            <div className="font-semibold py-3">Price</div>
            {compare.items.map(product => (
              <div key={product.id} className="py-3">
                <span className="text-xl font-bold">{product.price} MDL</span>
              </div>
            ))}

            {/* Rating Row */}
            <div className="font-semibold py-3">Rating</div>
            {compare.items.map(product => (
              <div key={product.id} className="py-3">
                ⭐ {product.rating.avg} ({product.rating.count})
              </div>
            ))}

            {/* Stock Row */}
            <div className="font-semibold py-3">Availability</div>
            {compare.items.map(product => (
              <div key={product.id} className="py-3">
                <Badge className={
                  product.stock === 'in_stock' ? 'bg-success' :
                  product.stock === 'preorder' ? 'bg-primary' :
                  'bg-destructive'
                }>
                  {t(`product.${product.stock}`)}
                </Badge>
              </div>
            ))}

            {/* Warranty Row */}
            <div className="font-semibold py-3">Warranty</div>
            {compare.items.map(product => (
              <div key={product.id} className="py-3">
                {product.warrantyMonths} {t('product.warranty')}
              </div>
            ))}

            {/* Specs Rows */}
            {Array.from(allSpecs).map(specKey => (
              <>
                <div key={specKey} className="font-semibold py-3 capitalize">
                  {specKey}
                </div>
                {compare.items.map(product => (
                  <div key={`${product.id}-${specKey}`} className="py-3">
                    {product.specs[specKey as keyof typeof product.specs] || '-'}
                  </div>
                ))}
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
