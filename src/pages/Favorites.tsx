import React from 'react';
import { Link } from 'react-router-dom';
import { HeartIcon, ArrowLeftIcon } from 'lucide-react';
import { useFavorites } from '../context/FavoritesContext';
import { ProductGrid } from '../components/product/ProductGrid';
import { Button } from '../components/ui/Button';

export const Favorites: React.FC = () => {
  const { favorites } = useFavorites();

  if (favorites.length === 0) {
    return (
      <div className="container-custom pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-porcelain flex items-center justify-center mb-6">
          <HeartIcon size={26} className="text-ink-soft" />
        </div>
        <h2 className="text-display-3 font-display font-semibold text-ink mb-3">Your Wishlist is Empty</h2>
        <p className="text-ink-muted mb-8 max-w-sm">
          Start adding products to your wishlist by clicking the heart icon on any product.
        </p>
        <Link to="/products">
          <Button className="inline-flex items-center">
            <ArrowLeftIcon size={16} className="mr-2" />
            Continue Shopping
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container-custom pt-32 pb-24">
      <div className="mb-10">
        <span className="eyebrow-mono">Saved for later</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1 mb-2">My Wishlist</h1>
        <p className="text-ink-muted">{favorites.length} item{favorites.length > 1 ? 's' : ''} saved</p>
      </div>
      <ProductGrid products={favorites} />
      <div className="mt-12">
        <Link to="/products" className="inline-flex items-center gap-2 text-ink font-medium hover:text-copper transition-colors">
          <ArrowLeftIcon size={16} />
          Continue Shopping
        </Link>
      </div>
    </div>
  );
};
