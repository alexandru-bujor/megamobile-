import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { useWishlist } from '@/lib/store';
import { useTranslations } from '@/lib/i18n';
import { Link } from 'react-router-dom';

export default function Wishlist() {
  const wishlist = useWishlist();
  const { t } = useTranslations();

  if (wishlist.items.length === 0) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto p-8 text-center">
          <Heart className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-heading font-bold mb-2">
            Your wishlist is empty
          </h2>
          <p className="text-muted-foreground mb-6">
            Save your favorite products here
          </p>
          <Button asChild>
            <Link to="/catalog">Browse products</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-heading font-bold">
          {t('nav.wishlist')}
        </h1>
        <p className="text-muted-foreground">
          {wishlist.items.length} {wishlist.items.length === 1 ? 'item' : 'items'}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {wishlist.items.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
