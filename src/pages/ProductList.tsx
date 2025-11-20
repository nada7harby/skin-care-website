import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FilterIcon, XIcon } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
import { products, categories as allCategories, brands as allBrands } from '../data/products';
import { Product } from '../context/CartContext';

export const ProductList: React.FC = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get('category');
  
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);
  const [filters, setFilters] = useState({
    category: categoryParam || 'all',
    brand: 'all',
    priceRange: 'all',
    rating: 'all',
    sortBy: 'featured'
  });
  const [showFilters, setShowFilters] = useState(false);
  
  const categories = ['all', ...allCategories];
  const brands = ['all', ...allBrands];
  
  const priceRanges = [
    { label: 'All Prices', value: 'all' },
    { label: 'Under $25', value: 'under-25' },
    { label: '$25 - $50', value: '25-50' },
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
    let result = [...products];
    
    // Apply category filter
    if (filters.category !== 'all') {
      result = result.filter(product => product.category === filters.category);
    }
    
    // Apply brand filter
    if (filters.brand !== 'all') {
      result = result.filter(product => product.brand === filters.brand);
    }
    
    // Apply price range filter
    switch (filters.priceRange) {
      case 'under-25':
        result = result.filter(product => product.price < 25);
        break;
      case '25-50':
        result = result.filter(product => product.price >= 25 && product.price <= 50);
        break;
      case 'over-50':
        result = result.filter(product => product.price > 50);
        break;
      default:
        break;
    }
    
    // Apply rating filter
    if (filters.rating !== 'all') {
      const minRating = parseFloat(filters.rating);
      result = result.filter(product => product.rating >= minRating);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case 'popularity':
        result = result.sort((a, b) => (b.isBestSeller ? 1 : 0) - (a.isBestSeller ? 1 : 0));
        break;
      case 'price-asc':
        result = result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result = result.sort((a, b) => b.price - a.price);
        break;
      case 'rating-desc':
        result = result.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        result = result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      default:
        // 'featured' is default, no sorting needed
        break;
    }
    
    setFilteredProducts(result);
  }, [filters]);
  useEffect(() => {
    // Update category filter when URL param changes
    if (categoryParam) {
      setFilters(prev => ({
        ...prev,
        category: categoryParam
      }));
    }
  }, [categoryParam]);
  const handleFilterChange = (filterType: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  const clearFilters = () => {
    setFilters({
      category: 'all',
      brand: 'all',
      priceRange: 'all',
      rating: 'all',
      sortBy: 'featured'
    });
  };
  return <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-2">
        Our Products
      </h1>
      <p className="text-gray-600 mb-8">
        Discover our collection of premium skincare products
      </p>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden mb-4">
          <Button variant="outline" className="flex items-center" onClick={() => setShowFilters(!showFilters)}>
            <FilterIcon size={18} className="mr-2" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>
        </div>
        {/* Filters Sidebar */}
        <div className={`lg:w-1/4 ${showFilters ? 'block' : 'hidden lg:block'}`}>
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-bold text-primary-dark">Filters</h2>
              <button onClick={clearFilters} className="text-sm text-primary-dark hover:underline">
                Clear All
              </button>
            </div>
            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Category</h3>
              <div className="space-y-2">
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      type="radio"
                      id={`category-${category}`}
                      name="category"
                      checked={filters.category === category}
                      onChange={() => handleFilterChange('category', category)}
                      className="mr-2 accent-primary-dark"
                    />
                    <label htmlFor={`category-${category}`} className="text-gray-600 capitalize cursor-pointer">
                      {category === 'all' ? 'All Categories' : category}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Brand Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Brand</h3>
              <div className="space-y-2">
                {brands.map(brand => (
                  <div key={brand} className="flex items-center">
                    <input
                      type="radio"
                      id={`brand-${brand}`}
                      name="brand"
                      checked={filters.brand === brand}
                      onChange={() => handleFilterChange('brand', brand)}
                      className="mr-2 accent-primary-dark"
                    />
                    <label htmlFor={`brand-${brand}`} className="text-gray-600 capitalize cursor-pointer">
                      {brand === 'all' ? 'All Brands' : brand}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map(range => (
                  <div key={range.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`price-${range.value}`}
                      name="price"
                      checked={filters.priceRange === range.value}
                      onChange={() => handleFilterChange('priceRange', range.value)}
                      className="mr-2 accent-primary-dark"
                    />
                    <label htmlFor={`price-${range.value}`} className="text-gray-600 cursor-pointer">
                      {range.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Rating Filter */}
            <div className="mb-6">
              <h3 className="font-medium text-gray-700 mb-3">Rating</h3>
              <div className="space-y-2">
                {ratingOptions.map(option => (
                  <div key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      id={`rating-${option.value}`}
                      name="rating"
                      checked={filters.rating === option.value}
                      onChange={() => handleFilterChange('rating', option.value)}
                      className="mr-2 accent-primary-dark"
                    />
                    <label htmlFor={`rating-${option.value}`} className="text-gray-600 cursor-pointer">
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            {/* Mobile Close Button */}
            <div className="lg:hidden mt-6">
              <Button fullWidth onClick={() => setShowFilters(false)} variant="outline">
                <XIcon size={16} className="mr-2" />
                Close Filters
              </Button>
            </div>
          </div>
        </div>
        {/* Products Grid */}
        <div className="lg:w-3/4">
          {/* Sort Options */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
            <p className="text-gray-600 mb-4 sm:mb-0">
              Showing {filteredProducts.length} products
            </p>
            <div className="flex items-center">
              <label htmlFor="sort" className="text-gray-600 mr-2">
                Sort by:
              </label>
              <select id="sort" value={filters.sortBy} onChange={e => handleFilterChange('sortBy', e.target.value)} className="border border-gray-300 rounded-md p-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-primary-dark">
                {sortOptions.map(option => <option key={option.value} value={option.value}>
                    {option.label}
                  </option>)}
              </select>
            </div>
          </div>
          {filteredProducts.length > 0 ? <ProductGrid products={filteredProducts} /> : <div className="bg-white rounded-lg shadow-md p-8 text-center">
              <h3 className="text-lg font-medium text-primary-dark mb-2">
                No products found
              </h3>
              <p className="text-gray-600 mb-6">
                Try adjusting your filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters}>Clear Filters</Button>
            </div>}
        </div>
      </div>
    </div>;
};