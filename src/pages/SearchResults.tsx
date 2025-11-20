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
  return <div className="container-custom py-12">
      <h1 className="text-3xl font-bold text-primary-dark mb-8">
        Search Products
      </h1>
      <form onSubmit={handleSearch} className="mb-12">
        <div className="flex max-w-2xl mx-auto">
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search for products..." className="flex-grow px-6 py-4 text-lg rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark" />
          <button type="submit" className="bg-primary-dark text-white px-8 py-4 rounded-r-md hover:bg-opacity-90 transition-colors flex items-center">
            <SearchIcon size={24} className="mr-2" />
            Search
          </button>
        </div>
      </form>
      {searchQuery && <div className="mb-6">
          <p className="text-gray-600">
            {searchResults.length} results for "{searchQuery}"
          </p>
        </div>}
      {searchResults.length > 0 ? <ProductGrid products={searchResults} /> : <div className="text-center py-16">
          <h3 className="text-xl font-medium text-primary-dark mb-2">
            No products found
          </h3>
          <p className="text-gray-600">Try adjusting your search terms</p>
        </div>}
    </div>;
};