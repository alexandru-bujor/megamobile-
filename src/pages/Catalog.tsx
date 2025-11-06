import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { SlidersHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { ProductCard } from '@/components/ProductCard';
import { useTranslations } from '@/lib/i18n';
import { listProducts, getCategory } from '@/lib/api/mock';
import type { Product, Category } from '@/types/product';

export default function Catalog() {
  const { categorySlug } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslations();

  const [products, setProducts] = useState<Product[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [sortBy, setSortBy] = useState<string>('relevance');

  const availableBrands = ['Apple', 'Samsung', 'Xiaomi', 'Huawei', 'Google', 'OnePlus'];

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      
      if (categorySlug) {
        const cat = await getCategory(categorySlug);
        setCategory(cat);
      }

      const filters = {
        categoryId: categorySlug,
        brands: selectedBrands.length > 0 ? selectedBrands : undefined,
        priceRange: priceRange[0] !== 0 || priceRange[1] !== 10000 ? priceRange : undefined,
        sortBy: sortBy as any,
        limit: 12,
        offset: 0,
      };

      const { products: prods, total: tot } = await listProducts(filters);
      setProducts(prods);
      setTotal(tot);
      setLoading(false);
    }

    loadData();
  }, [categorySlug, selectedBrands, priceRange, sortBy]);

  const toggleBrand = (brand: string) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const clearFilters = () => {
    setSelectedBrands([]);
    setPriceRange([0, 10000]);
    setSortBy('relevance');
  };

  const FilterContent = () => (
    <div className="space-y-6">
      {/* Sort */}
      <div>
        <Label className="mb-3 block font-semibold">{t('filters.sortBy')}</Label>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">{t('sort.relevance')}</SelectItem>
            <SelectItem value="newest">{t('sort.newest')}</SelectItem>
            <SelectItem value="priceAsc">{t('sort.priceAsc')}</SelectItem>
            <SelectItem value="priceDesc">{t('sort.priceDesc')}</SelectItem>
            <SelectItem value="rating">{t('sort.rating')}</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Price Range */}
      <div>
        <Label className="mb-3 block font-semibold">{t('filters.priceRange')}</Label>
        <div className="space-y-4">
          <Slider
            value={priceRange}
            onValueChange={(val) => setPriceRange(val as [number, number])}
            min={0}
            max={10000}
            step={100}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{priceRange[0]} MDL</span>
            <span>{priceRange[1]} MDL</span>
          </div>
        </div>
      </div>

      {/* Brands */}
      <div>
        <Label className="mb-3 block font-semibold">{t('filters.brand')}</Label>
        <div className="space-y-3">
          {availableBrands.map((brand) => (
            <div key={brand} className="flex items-center space-x-2">
              <Checkbox
                id={brand}
                checked={selectedBrands.includes(brand)}
                onCheckedChange={() => toggleBrand(brand)}
              />
              <label
                htmlFor={brand}
                className="text-sm cursor-pointer"
              >
                {brand}
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Clear */}
      <Button variant="outline" className="w-full" onClick={clearFilters}>
        {t('filters.clearAll')}
      </Button>
    </div>
  );

  return (
    <div className="container py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-heading font-bold mb-2">
          {category?.name || t('nav.catalog')}
        </h1>
        {category?.description && (
          <p className="text-muted-foreground">{category.description}</p>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Desktop Filters */}
        <aside className="hidden lg:block w-64 flex-shrink-0">
          <div className="sticky top-20">
            <div className="border rounded-lg p-6">
              <h2 className="text-lg font-heading font-bold mb-6 flex items-center">
                <SlidersHorizontal className="mr-2 h-5 w-5" />
                {t('filters.filter')}
              </h2>
              <FilterContent />
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1">
          {/* Mobile Filter + Sort */}
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">
                  <SlidersHorizontal className="mr-2 h-4 w-4" />
                  {t('filters.filter')}
                </Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>{t('filters.filter')}</SheetTitle>
                </SheetHeader>
                <div className="mt-6">
                  <FilterContent />
                </div>
              </SheetContent>
            </Sheet>

            <p className="text-sm text-muted-foreground">
              {total} {total === 1 ? 'product' : 'products'}
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-[400px] rounded-lg bg-muted animate-pulse" />
              ))}
            </div>
          ) : products.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-lg text-muted-foreground mb-4">
                No products found
              </p>
              <Button onClick={clearFilters}>
                {t('filters.clearAll')}
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {/* Pagination placeholder */}
              {total > 12 && (
                <div className="mt-8 flex justify-center">
                  <Button variant="outline">Load more</Button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}
