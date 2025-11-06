import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  Heart, 
  GitCompare, 
  Star, 
  Truck, 
  Shield,
  RotateCcw,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { ProductCard } from '@/components/ProductCard';
import { useCart, useWishlist, useCompare } from '@/lib/store';
import { useTranslations } from '@/lib/i18n';
import { getProduct, listProducts } from '@/lib/api/mock';
import type { Product } from '@/types/product';
import { toast } from 'sonner';

export default function ProductDetail() {
  const { slug } = useParams();
  const { t } = useTranslations();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);

  const cart = useCart();
  const wishlist = useWishlist();
  const compare = useCompare();

  useEffect(() => {
    async function loadProduct() {
      if (!slug) return;
      
      setLoading(true);
      const prod = await getProduct(slug);
      setProduct(prod);

      if (prod) {
        const { products } = await listProducts({
          categoryId: prod.categoryId,
          limit: 4,
        });
        setRelatedProducts(products.filter(p => p.id !== prod.id));
      }

      setLoading(false);
    }

    loadProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="container py-8">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded w-64 mb-8" />
          <div className="grid md:grid-cols-2 gap-8">
            <div className="aspect-square bg-muted rounded-lg" />
            <div className="space-y-4">
              <div className="h-12 bg-muted rounded" />
              <div className="h-6 bg-muted rounded w-48" />
              <div className="h-16 bg-muted rounded" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-16 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <Button asChild>
          <Link to="/catalog">Back to catalog</Link>
        </Button>
      </div>
    );
  }

  const isInWishlist = wishlist.isInWishlist(product.id);
  const isInCompare = compare.isInCompare(product.id);

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
    <div className="container py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-8">
        <Link to="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <Link to="/catalog" className="hover:text-foreground">{t('nav.catalog')}</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">{product.title}</span>
      </nav>

      {/* Product Details */}
      <div className="grid md:grid-cols-2 gap-12 mb-16">
        {/* Images */}
        <div className="space-y-4">
          <div className="aspect-square rounded-lg overflow-hidden bg-muted">
            <img
              src={product.images[0]}
              alt={product.title}
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Info */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Badge variant="outline">{product.brand}</Badge>
              <Badge className={stockColor[product.stock]}>
                {stockLabel[product.stock]}
              </Badge>
            </div>

            <h1 className="text-3xl md:text-4xl font-heading font-bold mb-4">
              {product.title}
            </h1>

            <div className="flex items-center gap-2 mb-6">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating.avg)
                        ? 'fill-primary text-primary'
                        : 'text-muted'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm font-medium">{product.rating.avg}</span>
              <span className="text-sm text-muted-foreground">
                ({product.rating.count} {t('product.reviews')})
              </span>
            </div>

            {product.description && (
              <p className="text-muted-foreground mb-6">{product.description}</p>
            )}

            <div className="flex items-baseline gap-3 mb-6">
              <span className="text-4xl font-heading font-bold">
                {product.price} MDL
              </span>
              {product.oldPrice && (
                <>
                  <span className="text-xl text-muted-foreground line-through">
                    {product.oldPrice} MDL
                  </span>
                  <Badge variant="destructive">
                    -{Math.round((1 - product.price / product.oldPrice) * 100)}%
                  </Badge>
                </>
              )}
            </div>
          </div>

          <Separator />

          {/* Purchase Panel */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="flex items-center border rounded-lg">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                >
                  -
                </Button>
                <span className="w-12 text-center">{quantity}</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  +
                </Button>
              </div>

              <Button
                size="lg"
                className="flex-1"
                disabled={product.stock === 'out_of_stock'}
                onClick={() => {
                  cart.addItem(product, quantity);
                  toast.success(t('product.addToCart'));
                }}
              >
                <ShoppingCart className="mr-2 h-5 w-5" />
                {t('product.addToCart')}
              </Button>
            </div>

            <div className="flex gap-2">
              <Button
                variant={isInWishlist ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => {
                  if (isInWishlist) {
                    wishlist.removeItem(product.id);
                    toast.info('Removed from wishlist');
                  } else {
                    wishlist.addItem(product);
                    toast.success('Added to wishlist');
                  }
                }}
              >
                <Heart className={`mr-2 h-4 w-4 ${isInWishlist ? 'fill-current' : ''}`} />
                {t('product.addToWishlist')}
              </Button>

              <Button
                variant={isInCompare ? 'default' : 'outline'}
                className="flex-1"
                onClick={() => {
                  if (isInCompare) {
                    compare.removeItem(product.id);
                    toast.info('Removed from compare');
                  } else {
                    compare.addItem(product);
                    toast.success('Added to compare');
                  }
                }}
              >
                <GitCompare className="mr-2 h-4 w-4" />
                {t('product.compare')}
              </Button>
            </div>
          </div>

          <Separator />

          {/* Features */}
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <Truck className="h-6 w-6 mb-2 text-primary" />
              <span className="font-medium">{product.deliveryEtaDays} {t('product.delivery')}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <Shield className="h-6 w-6 mb-2 text-primary" />
              <span className="font-medium">{product.warrantyMonths} {t('product.warranty')}</span>
            </div>
            <div className="flex flex-col items-center text-center p-3 rounded-lg bg-muted/50">
              <RotateCcw className="h-6 w-6 mb-2 text-primary" />
              <span className="font-medium">14 days returns</span>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="specs" className="mb-16">
        <TabsList>
          <TabsTrigger value="specs">{t('product.specifications')}</TabsTrigger>
          <TabsTrigger value="description">{t('product.description')}</TabsTrigger>
          <TabsTrigger value="reviews">{t('product.reviews')}</TabsTrigger>
        </TabsList>

        <TabsContent value="specs" className="mt-6">
          <div className="grid md:grid-cols-2 gap-4">
            {Object.entries(product.specs).map(([key, value]) => (
              value && (
                <div key={key} className="flex justify-between p-4 rounded-lg bg-muted/30">
                  <span className="font-medium capitalize">{key}:</span>
                  <span className="text-muted-foreground">{value}</span>
                </div>
              )
            ))}
          </div>
        </TabsContent>

        <TabsContent value="description" className="mt-6">
          <div className="prose max-w-none">
            <p>{product.description || 'No description available.'}</p>
          </div>
        </TabsContent>

        <TabsContent value="reviews" className="mt-6">
          <p className="text-muted-foreground">Reviews coming soon...</p>
        </TabsContent>
      </Tabs>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <section>
          <h2 className="text-2xl font-heading font-bold mb-6">
            {t('product.relatedProducts')}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
