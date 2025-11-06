import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Smartphone, Laptop, Tablet, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ProductCard } from '@/components/ProductCard';
import { useTranslations } from '@/lib/i18n';
import { getFeaturedProducts, getNewArrivals } from '@/lib/api/mock';
import type { Product } from '@/types/product';

export default function Home() {
  const { t } = useTranslations();
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProducts() {
      setLoading(true);
      const [featured, newItems] = await Promise.all([
        getFeaturedProducts(),
        getNewArrivals(),
      ]);
      setFeaturedProducts(featured);
      setNewArrivals(newItems);
      setLoading(false);
    }
    loadProducts();
  }, []);

  const categories = [
    {
      id: 'smartphones',
      name: t('nav.smartphones'),
      icon: Smartphone,
      image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&q=80',
    },
    {
      id: 'laptops',
      name: t('nav.laptops'),
      icon: Laptop,
      image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=600&q=80',
    },
    {
      id: 'tablets',
      name: t('nav.tablets'),
      icon: Tablet,
      image: 'https://images.unsplash.com/photo-1561154464-82e9adf32764?w=600&q=80',
    },
    {
      id: 'accessories',
      name: t('nav.accessories'),
      icon: Headphones,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&q=80',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[500px] md:h-[600px] overflow-hidden bg-gradient-hero tech-dots">
        {/* Animated Tech Grid */}
        <div className="absolute inset-0 opacity-30">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&q=80')] bg-cover bg-center opacity-20" />
        </div>
        
        {/* Tech Circuit Lines */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="circuitGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" style={{ stopColor: 'hsl(73 100% 62%)', stopOpacity: 0.6 }} />
                <stop offset="100%" style={{ stopColor: 'hsl(142 76% 45%)', stopOpacity: 0.3 }} />
              </linearGradient>
            </defs>
            <path d="M0,100 L200,100 L200,200 L400,200" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" />
            <path d="M800,50 L1000,50 L1000,150 L1200,150" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" />
            <path d="M300,400 L500,400 L500,500" stroke="url(#circuitGrad)" strokeWidth="2" fill="none" />
            <circle cx="200" cy="100" r="4" fill="hsl(73 100% 62%)" opacity="0.8" />
            <circle cx="200" cy="200" r="4" fill="hsl(73 100% 62%)" opacity="0.8" />
            <circle cx="1000" cy="50" r="4" fill="hsl(142 76% 45%)" opacity="0.8" />
            <circle cx="1000" cy="150" r="4" fill="hsl(142 76% 45%)" opacity="0.8" />
            <circle cx="500" cy="400" r="4" fill="hsl(73 100% 62%)" opacity="0.8" />
          </svg>
        </div>
        
        {/* Floating Tech Icons */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 animate-pulse">
            <Smartphone className="h-12 w-12 text-primary/20" />
          </div>
          <div className="absolute top-1/3 right-1/4 animate-pulse" style={{ animationDelay: '1s' }}>
            <Laptop className="h-16 w-16 text-success/15" />
          </div>
          <div className="absolute bottom-1/4 left-1/3 animate-pulse" style={{ animationDelay: '2s' }}>
            <Tablet className="h-10 w-10 text-primary/15" />
          </div>
          <div className="absolute top-1/2 right-1/3 animate-pulse" style={{ animationDelay: '1.5s' }}>
            <Headphones className="h-14 w-14 text-success/20" />
          </div>
        </div>
        
        <div className="container relative h-full flex items-center z-10">
          <div className="max-w-2xl text-white animate-fade-in-up">
            <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4 drop-shadow-lg">
              {t('hero.title')}
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/90 drop-shadow-md">
              {t('hero.subtitle')}
            </p>
            <Button size="lg" variant="default" className="glow-effect" asChild>
              <Link to="/catalog">
                {t('hero.cta')}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="container py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((category) => (
            <Link key={category.id} to={`/catalog/${category.id}`}>
              <Card className="group hover-lift overflow-hidden">
                <div className="relative aspect-square">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4 text-white">
                    <category.icon className="h-8 w-8 mb-2" />
                    <h3 className="font-heading font-bold text-lg">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      {/* Bestsellers */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-heading font-bold mb-2">
              {t('home.bestsellers')}
            </h2>
            <p className="text-muted-foreground">
              Most popular products this month
            </p>
          </div>
          <Button variant="outline" asChild>
            <Link to="/catalog">
              {t('home.viewAll')}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-[400px] animate-pulse bg-muted" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* New Arrivals */}
      <section className="bg-muted/30 py-16">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-heading font-bold mb-2">
                {t('home.newArrivals')}
              </h2>
              <p className="text-muted-foreground">
                Latest tech just landed
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to="/catalog?sort=newest">
                {t('home.viewAll')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <Card key={i} className="h-[400px] animate-pulse bg-muted" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {newArrivals.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands */}
      <section className="container py-16">
        <h2 className="text-3xl font-heading font-bold text-center mb-12">
          Trusted Brands
        </h2>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-60">
          {['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Google', 'OnePlus'].map((brand) => (
            <div key={brand} className="text-center">
              <p className="text-2xl font-heading font-bold">{brand}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
