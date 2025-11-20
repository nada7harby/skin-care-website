import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ArrowLeftIcon } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';
export const Favorites: React.FC = () => {
  const {
    favorites
  } = useFavorites();
  if (favorites.length === 0) {
    return <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <HeartIcon size={64} className="text-gray-300 mb-4" />
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Your Wishlist is Empty
        </h2>
        <p className="text-gray-600 mb-8 text-center max-w-md">
          Start adding products to your wishlist by clicking the heart icon on
          any product.
        </p>
        <Link to="/products">
          <Button className="flex items-center">
            <ArrowLeftIcon size={16} className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>;
  }
  return <div className="container-custom py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-primary-dark mb-2">
          My Wishlist
        </h1>
        <p className="text-gray-600">{favorites.length} items saved</p>
      </div>
      <ProductGrid products={favorites} />
      <div className="mt-8">
        <Link to="/products" className="inline-flex items-center text-primary-dark hover:text-primary-dark/80">
          <ArrowLeftIcon size={16} className="mr-2" />
          Continue Shopping
        </Link>
      </div>
    </div>;
};