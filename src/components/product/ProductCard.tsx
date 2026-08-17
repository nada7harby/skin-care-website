import React, { useRef } from 'react';
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

const TILT_STYLE = {
  '--r-x': '0deg',
  '--r-y': '0deg',
  '--m-x': '50%',
  '--m-y': '50%',
  '--glare-o': '0',
  transform: 'perspective(1000px) rotateX(var(--r-y)) rotateY(var(--r-x))',
} as React.CSSProperties;

export const ProductCard: React.FC<ProductCardProps> = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const favorited = isFavorite(product.id);
  const isOutOfStock = (product.stock ?? 1) <= 0 || product.stockStatus === 'Out of Stock';
  const cardRef = useRef<HTMLAnchorElement>(null);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    favorited ? removeFromFavorites(product.id) : addToFavorites(product);
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    if (isOutOfStock) return;
    addToCart(product);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLAnchorElement>) => {
    if (e.pointerType !== 'mouse') return;
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty('--r-x', `${((px - 50) / 6).toFixed(2)}deg`);
    card.style.setProperty('--r-y', `${((50 - py) / 8).toFixed(2)}deg`);
    card.style.setProperty('--m-x', `${px}%`);
    card.style.setProperty('--m-y', `${py}%`);
    card.style.setProperty('--glare-o', '1');
  };

  const handlePointerLeave = () => {
    const card = cardRef.current;
    if (!card) return;
    card.style.setProperty('--r-x', '0deg');
    card.style.setProperty('--r-y', '0deg');
    card.style.setProperty('--glare-o', '0');
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
      <Link
        ref={cardRef}
        to={`/product/${product.id}`}
        className="block rounded-2xl will-change-transform transition-[transform,box-shadow] duration-300 ease-out hover:shadow-glow"
        style={TILT_STYLE}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <div className="relative overflow-hidden rounded-2xl bg-porcelain-line/40 aspect-[4/5] mb-4">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-700 ease-expo group-hover:scale-[1.06]"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-espresso/25 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div
            className="pointer-events-none absolute inset-0 mix-blend-soft-light transition-opacity duration-300"
            style={{
              opacity: 'var(--glare-o)',
              background: 'radial-gradient(circle at var(--m-x) var(--m-y), rgba(255,255,255,0.9), rgba(255,255,255,0) 55%)',
            }}
          />
          <div
            className="pointer-events-none absolute inset-0 transition-opacity duration-300"
            style={{
              opacity: 'var(--glare-o)',
              background: 'radial-gradient(circle at var(--m-x) var(--m-y), rgba(242,168,106,0.35), rgba(242,168,106,0) 45%)',
            }}
          />

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
            {isOutOfStock && (
              <span className="label-tag bg-rust text-porcelain-paper px-2 py-1 rounded-md">Out of Stock</span>
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
              disabled={isOutOfStock}
              className="w-full glass-light flex items-center justify-center gap-2 py-3 text-ink font-medium text-sm hover:text-copper transition-colors disabled:cursor-not-allowed disabled:text-ink-soft"
            >
              <ShoppingBagIcon size={16} />
              {isOutOfStock ? 'Out of Stock' : 'Quick Add'}
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
