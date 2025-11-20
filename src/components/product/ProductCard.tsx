import React, { lazy } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, StarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
interface ProductCardProps {
  product: Product;
}
export const ProductCard: React.FC<ProductCardProps> = ({
  product
}) => {
  const {
    addToCart
  } = useCart();
  const {
    addToFavorites,
    removeFromFavorites,
    isFavorite
  } = useFavorites();
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };
  return <motion.div className="card group transition-all duration-300 hover:shadow-lg" whileHover={{
    y: -5
  }} transition={{
    duration: 0.2
  }}>
      <div className="relative overflow-hidden">
        <Link to={`/product/${product.id}`}>
          <img src={product.image} alt={product.name} className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />
        </Link>
        <button onClick={handleFavoriteClick} className="absolute top-3 right-3 bg-white p-2 rounded-full shadow-md hover:bg-primary-light transition-colors z-10" aria-label={isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'}>
          <HeartIcon size={20} className={`transition-colors ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-primary-dark'}`} />
        </button>
        <div className="absolute inset-0 bg-black bg-opacity-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <button onClick={e => {
          e.preventDefault();
          addToCart(product);
        }} className="bg-white p-2 rounded-full shadow-md hover:bg-primary-light transition-colors" aria-label="Add to cart">
            <ShoppingBagIcon size={20} className="text-primary-dark" />
          </button>
        </div>
      </div>
      <div className="p-4 bg-primary-light bg-opacity-30">
        <div className="flex items-center mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => <StarIcon key={i} size={16} className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
          </div>
          <span className="text-sm text-gray-600 ml-1">({product.rating})</span>
        </div>
        <Link to={`/product/${product.id}`} className="block">
          <h3 className="font-medium text-primary-dark hover:text-primary-dark/80 transition-colors">
            {product.name}
          </h3>
        </Link>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-semibold text-primary-dark">
            ${product.price.toFixed(2)}
          </span>
          <span className="text-sm text-gray-600">{product.category}</span>
        </div>
      </div>
    </motion.div>;
};