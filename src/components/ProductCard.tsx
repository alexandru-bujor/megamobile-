import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, GitCompare, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useCart, useWishlist, useCompare } from '@/lib/store';
import { useTranslations } from '@/lib/i18n';
import type { Product } from '@/types/product';
import { cn } from '@/lib/utils';
import { toast } from 'sonner';

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const cart = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();
  const { t } = useTranslations();

  const isInWishlist = wishlist.isInWishlist(product.id);
  const isInCompare = compare.isInCompare(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    cart.addItem(product);
    toast.success(t('product.addToCart'), {
      description: product.title,
    });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInWishlist) {
      wishlist.removeItem(product.id);
      toast.info('Removed from wishlist');
    } else {
      wishlist.addItem(product);
      toast.success('Added to wishlist');
    }
  };

  const handleToggleCompare = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isInCompare) {
      compare.removeItem(product.id);
      toast.info('Removed from compare');
    } else {
      if (compare.items.length >= 4) {
        toast.error('Maximum 4 products for comparison');
        return;
      }
      compare.addItem(product);
      toast.success('Added to compare');
    }
  };

  const stockColor = {
    in_stock: 'bg-success text-success-foreground',
    preorder: 'bg-primary text-primary-foreground',
    out_of_stock: 'bg-destructive text-destructive-foreground',
  };

  const stockLabel = {
    in_stock: t('product.inStock'),
    preorder: t('product.preorder'),
    out_of_stock: t('product.outOfStock'),
  };

  return (
    <Link to={`/product/${product.slug}`}>
      <Card className={cn('group hover-lift overflow-hidden', className)}>
        <div className="relative aspect-square overflow-hidden bg-muted">
          <img
            src={product.images[0]}
            alt={product.title}
            className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-2">
            {product.oldPrice && (
              <Badge className="bg-destructive text-destructive-foreground">
                -{Math.round((1 - product.price / product.oldPrice) * 100)}%
              </Badge>
            )}
            {product.isNew && (
              <Badge className="bg-primary text-primary-foreground">
                {t('home.newArrivals')}
              </Badge>
            )}
          </div>

          {/* Quick Actions */}
          <div className="absolute top-2 right-2 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button
              size="icon"
              variant={isInWishlist ? 'default' : 'secondary'}
              onClick={handleToggleWishlist}
            >
              <Heart className={cn('h-4 w-4', isInWishlist && 'fill-current')} />
            </Button>
            <Button
              size="icon"
              variant={isInCompare ? 'default' : 'secondary'}
              onClick={handleToggleCompare}
            >
              <GitCompare className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="outline" className="text-xs">
              {product.brand}
            </Badge>
            <Badge className={stockColor[product.stock]}>
              {stockLabel[product.stock]}
            </Badge>
          </div>

          <h3 className="font-heading font-semibold mb-2 line-clamp-2">
            {product.title}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="text-sm font-medium">{product.rating.avg}</span>
            <span className="text-xs text-muted-foreground">
              ({product.rating.count})
            </span>
          </div>

          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-heading font-bold">
              {product.price} MDL
            </span>
            {product.oldPrice && (
              <span className="text-sm text-muted-foreground line-through">
                {product.oldPrice} MDL
              </span>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button 
            className="w-full" 
            onClick={handleAddToCart}
            disabled={product.stock === 'out_of_stock'}
          >
            <ShoppingCart className="mr-2 h-4 w-4" />
            {t('product.addToCart')}
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}
