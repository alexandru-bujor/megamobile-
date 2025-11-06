import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/lib/store';
import { useTranslations } from '@/lib/i18n';
import { useState } from 'react';
import { toast } from 'sonner';

export default function Cart() {
  const cart = useCart();
  const { t } = useTranslations();
  const [promoCode, setPromoCode] = useState('');
  const [discount, setDiscount] = useState(0);

  const subtotal = cart.total();
  const total = subtotal - discount;
  const freeShippingThreshold = 2000;
  const shippingProgress = (subtotal / freeShippingThreshold) * 100;

  const applyPromoCode = () => {
    if (promoCode.toUpperCase() === 'MEGA10') {
      setDiscount(subtotal * 0.1);
      toast.success('Promo code applied: -10%');
    } else {
      toast.error('Invalid promo code');
    }
  };

  if (cart.items.length === 0) {
    return (
      <div className="container py-16">
        <Card className="max-w-md mx-auto p-8 text-center">
          <ShoppingBag className="h-16 w-16 mx-auto mb-4 text-muted-foreground" />
          <h2 className="text-2xl font-heading font-bold mb-2">
            {t('cart.empty')}
          </h2>
          <p className="text-muted-foreground mb-6">
            Add some products to get started
          </p>
          <Button asChild>
            <Link to="/catalog">{t('cart.continueShopping')}</Link>
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <h1 className="text-3xl font-heading font-bold mb-8">{t('cart.title')}</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.items.map((item) => (
            <Card key={item.product.id} className="p-4">
              <div className="flex gap-4">
                <Link to={`/product/${item.product.slug}`}>
                  <img
                    src={item.product.images[0]}
                    alt={item.product.title}
                    className="w-24 h-24 object-cover rounded-lg"
                  />
                </Link>

                <div className="flex-1">
                  <Link to={`/product/${item.product.slug}`}>
                    <h3 className="font-heading font-semibold mb-1 hover:text-primary">
                      {item.product.title}
                    </h3>
                  </Link>
                  <p className="text-sm text-muted-foreground mb-2">
                    {item.product.brand}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => cart.updateQuantity(item.product.id, item.quantity - 1)}
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="icon"
                        className="h-8 w-8"
                        onClick={() => cart.updateQuantity(item.product.id, item.quantity + 1)}
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>

                    <div className="flex items-center gap-4">
                      <span className="text-lg font-heading font-bold">
                        {item.product.price * item.quantity} MDL
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive"
                        onClick={() => cart.removeItem(item.product.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="p-6 sticky top-20">
            <h2 className="text-xl font-heading font-bold mb-6">Order Summary</h2>

            {/* Free Shipping Progress */}
            {subtotal < freeShippingThreshold && (
              <div className="mb-6">
                <div className="flex justify-between text-sm mb-2">
                  <span>
                    {t('cart.freeShipping')} {freeShippingThreshold} MDL
                  </span>
                  <span className="font-medium">
                    {freeShippingThreshold - subtotal} MDL
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-primary transition-all"
                    style={{ width: `${Math.min(shippingProgress, 100)}%` }}
                  />
                </div>
              </div>
            )}

            {/* Promo Code */}
            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder={t('cart.applyPromo')}
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                />
                <Button onClick={applyPromoCode}>Apply</Button>
              </div>
            </div>

            <Separator className="my-4" />

            {/* Totals */}
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">{t('cart.subtotal')}:</span>
                <span className="font-medium">{subtotal} MDL</span>
              </div>

              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>{t('cart.discount')}:</span>
                  <span className="font-medium">-{discount.toFixed(2)} MDL</span>
                </div>
              )}

              <Separator />

              <div className="flex justify-between text-lg">
                <span className="font-heading font-bold">{t('cart.total')}:</span>
                <span className="font-heading font-bold">{total.toFixed(2)} MDL</span>
              </div>
            </div>

            <Button className="w-full mt-6" size="lg">
              {t('cart.checkout')}
            </Button>

            <Button variant="outline" className="w-full mt-3" asChild>
              <Link to="/catalog">{t('cart.continueShopping')}</Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
