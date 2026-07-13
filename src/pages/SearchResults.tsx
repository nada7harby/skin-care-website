import React, { useState } from 'react';
import { SearchIcon } from 'lucide-react';
import { ProductGrid } from '../components/product/ProductGrid';
import { products } from '../data/products';

export const SearchResults: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(products);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const filtered = products.filter(product =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.brand.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setSearchResults(filtered);
  };

  return (
    <div className="container-custom pt-32 pb-24">
      <div className="text-center mb-12">
        <span className="eyebrow-mono">Find your formula</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1">Search Products</h1>
      </div>
      <form onSubmit={handleSearch} className="mb-14">
        <div className="flex max-w-xl mx-auto border border-porcelain-line rounded-xl overflow-hidden focus-within:border-copper focus-within:ring-2 focus-within:ring-copper/15 transition-all">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search for products, brands, ingredients…"
            className="flex-grow px-5 py-4 bg-porcelain-paper text-ink placeholder:text-ink-soft focus:outline-none"
          />
          <button type="submit" className="bg-copper text-porcelain-paper px-6 hover:bg-copper-deep transition-colors flex items-center gap-2 font-medium">
            <SearchIcon size={18} />
            <span className="hidden sm:inline">Search</span>
          </button>
        </div>
      </form>
      {searchQuery && (
        <p className="text-ink-muted mb-6 text-center text-sm">
          <span className="text-ink font-medium tabular">{searchResults.length}</span> results for "{searchQuery}"
        </p>
      )}
      {searchResults.length > 0 ? (
        <ProductGrid products={searchResults} />
      ) : (
        <div className="text-center py-20">
          <h3 className="font-display font-semibold text-ink mb-2">No products found</h3>
          <p className="text-ink-muted">Try adjusting your search terms</p>
        </div>
      )}
    </div>
  );
};
