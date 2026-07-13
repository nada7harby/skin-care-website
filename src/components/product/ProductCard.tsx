import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBagIcon, HeartIcon, StarIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import { Product } from '../../context/CartContext';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
  index?: number;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    favorited ? removeFromFavorites(product.id) : addToFavorites(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const batchNo = String((product.id % 20) + 1).padStart(2, '0');

  return (
    <motion.div
      className="group relative"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/product/${product.id}`} className="block">
        <div className="relative overflow-hidden rounded-2xl bg-porcelain-line/40 aspect-[4/5] mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start">
            <span className="label-tag bg-espresso/70 text-porcelain-paper backdrop-blur-sm px-2 py-1 rounded-md">
              N&deg;{batchNo}
            </span>
            {product.isNew && (
              <span className="label-tag bg-sage text-porcelain-paper px-2 py-1 rounded-md">New</span>
            )}
            {product.isBestSeller && (
              <span className="label-tag bg-copper text-porcelain-paper px-2 py-1 rounded-md">Best Seller</span>
            )}
          </div>

          <button
            onClick={handleFavoriteClick}
            className="absolute top-3 right-3 w-9 h-9 rounded-full glass-light flex items-center justify-center shadow-card hover:scale-110 transition-transform duration-200 z-10"
            aria-label={favorited ? 'Remove from favorites' : 'Add to favorites'}
          >
            <HeartIcon size={16} className={`transition-colors ${favorited ? 'fill-copper text-copper' : 'text-ink'}`} />
          </button>

          <div className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-expo">
            <button
              onClick={handleAddToCart}
              className="w-full glass-light flex items-center justify-center gap-2 py-3 text-ink font-medium text-sm hover:text-copper transition-colors"
            >
              <ShoppingBagIcon size={16} />
              Quick Add
            </button>
          </div>
        </div>

        <div className="flex items-start justify-between gap-2 mb-1">
          <span className="label-tag text-ink-soft">{product.brand}</span>
          <div className="flex items-center gap-0.5 shrink-0">
            <StarIcon size={12} className="fill-copper text-copper" />
            <span className="text-xs text-ink-muted tabular">{product.rating}</span>
          </div>
        </div>
        <h3 className="font-medium text-ink group-hover:text-copper transition-colors duration-200 leading-snug mb-1.5">
          {product.name}
        </h3>
        <div className="flex items-center justify-between">
          <span className="font-mono text-ink tabular">${product.price.toFixed(2)}</span>
          <span className="text-xs text-ink-soft">{product.category}</span>
        </div>
      </Link>
    </motion.div>
  );
};
