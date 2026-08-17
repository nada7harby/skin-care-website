import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilterIcon, XIcon, ChevronDownIcon } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { Product } from '../context/CartContext';
import { useStoreData } from '../context/StoreDataContext';

const FilterGroup: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="py-6 border-b border-porcelain-line last:border-0">
    <h3 className="label-tag text-ink-muted mb-4">{title}</h3>
    <div className="space-y-3">{children}</div>
  </div>
);

const RadioRow: React.FC<{ id: string; checked: boolean; onChange: () => void; label: string }> = ({ id, checked, onChange, label }) => (
  <label htmlFor={id} className="flex items-center gap-3 cursor-pointer group">
    <span className={`w-4 h-4 rounded-full border flex items-center justify-center shrink-0 transition-colors ${checked ? 'border-copper' : 'border-ink/25 group-hover:border-ink/50'}`}>
      {checked && <span className="w-2 h-2 rounded-full bg-copper" />}
    </span>
    <input type="radio" id={id} checked={checked} onChange={onChange} className="sr-only" />
    <span className={`text-sm capitalize transition-colors ${checked ? 'text-ink font-medium' : 'text-ink-muted'}`}>{label}</span>
  </label>
);

export const ProductList: React.FC = () => {
  const location = useLocation();
  const { products, categories: managedCategories, brands: managedBrands } = useStoreData();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');

  const activeProducts = useMemo(() => products.filter(product => product.status !== 'Archived'), [products]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(activeProducts);
  const [filters, setFilters] = useState({
    category: categoryParam || 'all',
    brand: 'all',
    priceRange: 'all',
    rating: 'all',
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);

  const categories = ['all', ...managedCategories.filter(item => item.status === 'Active').map(item => item.name)];
  const brands = ['all', ...managedBrands.filter(item => item.status === 'Active').map(item => item.name)];

  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: 'under-25' },
    { label: '$25 – $50', value: '25-50' },
    { label: 'Over $50', value: 'over-50' }
  ];

  const ratingOptions = [
    { label: 'All Ratings', value: 'all' },
    { label: '4.5 & Up', value: '4.5' },
    { label: '4.0 & Up', value: '4.0' },
    { label: '3.5 & Up', value: '3.5' }
  ];

  const sortOptions = [
    { label: 'Featured', value: 'featured' },
    { label: 'Popularity', value: 'popularity' },
    { label: 'Price: Low to High', value: 'price-asc' },
    { label: 'Price: High to Low', value: 'price-desc' },
    { label: 'Highest Rated', value: 'rating-desc' },
    { label: 'Newest', value: 'newest' }
  ];

  useEffect(() => {
    let result = [...activeProducts];
    if (filters.category !== 'all') result = result.filter(p => p.category === filters.category);
    if (filters.brand !== 'all') result = result.filter(p => p.brand === filters.brand);
    switch (filters.priceRange) {
      case 'under-25': result = result.filter(p => p.price < 25); break;
      case '25-50': result = result.filter(p => p.price >= 25 && p.price <= 50); break;
      case 'over-50': result = result.filter(p => p.price > 50); break;
      default: break;
    }
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      result = result.filter(p => p.rating >= minRating);
    }
    switch (filters.sortBy) {
      case 'popularity': result = result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0)); break;
      case 'price-asc': result = result.sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = result.sort((a, b) => b.price - a.price); break;
      case 'rating-desc': result = result.sort((a, b) => b.rating - a.rating); break;
      case 'newest': result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0)); break;
      default: break;
    }
    setFilteredProducts(result);
  }, [filters, activeProducts]);

  useEffect(() => {
    if (categoryParam) setFilters(prev => ({ ...prev, category: categoryParam }));
  }, [categoryParam]);

  const handleFilterChange = (filterType: string, value: string) => setFilters(prev => ({ ...prev, [filterType]: value }));
  const clearFilters = () => setFilters({ category: 'all', brand: 'all', priceRange: 'all', rating: 'all', sortBy: 'featured' });
  const activeFilterCount = [filters.category, filters.brand, filters.priceRange, filters.rating].filter(v => v !== 'all').length;

  return (
    <div className="container-custom pt-32 pb-20">
      <div className="mb-10">
        <span className="eyebrow-mono">The full catalog</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1 mb-2">Shop All</h1>
        <p className="text-ink-muted">{activeProducts.length} formulas, sorted, filtered, and ready to ship.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:hidden">
          <Button variant="outline" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon size={16} className="mr-2" />
            Filters {activeFilterCount > 0 && `(${activeFilterCount})`}
          </Button>
        </div>

        <aside className={`lg:w-64 shrink-0 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="lg:sticky lg:top-28 bg-porcelain-paper lg:bg-transparent rounded-2xl lg:rounded-none p-6 lg:p-0 border lg:border-0 border-porcelain-line">
            <div className="flex items-center justify-between mb-2">
              <h2 className="font-display font-semibold text-ink">Filters</h2>
              <button onClick={clearFilters} className="text-xs text-copper hover:underline font-medium">Clear all</button>
            </div>

            <FilterGroup title="Category">
              {categories.map(category => (
                <RadioRow key={category} id={`category-${category}`} checked={filters.category === category} onChange={() => handleFilterChange('category', category)} label={category === 'all' ? 'All Categories' : category} />
              ))}
            </FilterGroup>

            <FilterGroup title="Brand">
              {brands.map(brand => (
                <RadioRow key={brand} id={`brand-${brand}`} checked={filters.brand === brand} onChange={() => handleFilterChange('brand', brand)} label={brand === 'all' ? 'All Brands' : brand} />
              ))}
            </FilterGroup>

            <FilterGroup title="Price">
              {priceRanges.map(range => (
                <RadioRow key={range.value} id={`price-${range.value}`} checked={filters.priceRange === range.value} onChange={() => handleFilterChange('priceRange', range.value)} label={range.label} />
              ))}
            </FilterGroup>

            <FilterGroup title="Rating">
              {ratingOptions.map(option => (
                <RadioRow key={option.value} id={`rating-${option.value}`} checked={filters.rating === option.value} onChange={() => handleFilterChange('rating', option.value)} label={option.label} />
              ))}
            </FilterGroup>

            <div className="lg:hidden mt-6">
              <Button fullWidth onClick={() => setShowFilters(false)} variant="outline">
                <XIcon size={16} className="mr-2" />
                Close Filters
              </Button>
            </div>
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-porcelain-line">
            <p className="text-ink-muted text-sm mb-3 sm:mb-0">
              Showing <span className="text-ink font-medium tabular">{filteredProducts.length}</span> products
            </p>
            <div className="relative">
              <select
                id="sort"
                value={filters.sortBy}
                onChange={e => handleFilterChange('sortBy', e.target.value)}
                className="appearance-none border border-porcelain-line rounded-lg pl-4 pr-9 py-2.5 text-sm text-ink bg-porcelain-paper focus:outline-none focus:border-copper focus:ring-2 focus:ring-copper/15 cursor-pointer"
              >
                {sortOptions.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}
              </select>
              <ChevronDownIcon size={14} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink-soft pointer-events-none" />
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <ProductGrid products={filteredProducts} />
          ) : (
            <div className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-12 text-center">
              <h3 className="font-display font-semibold text-ink mb-2">No products found</h3>
              <p className="text-ink-muted mb-6">Try adjusting your filters to find what you're looking for.</p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
