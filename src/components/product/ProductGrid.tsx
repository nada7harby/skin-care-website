import React from 'react';
import { ProductCard } from './ProductCard';
import { Product } from '../../context/CartContext';

interface ProductGridProps {
  products: Product[];
  title?: string;
  eyebrow?: string;
}

export const ProductGrid: React.FC<ProductGridProps> = ({ products, title, eyebrow }) => {
  return (
    <div>
      {title && (
        <div className="mb-8">
          {eyebrow && <span className="eyebrow-mono">{eyebrow}</span>}
          <h2 className="text-display-3 font-display font-semibold text-ink mt-1">{title}</h2>
        </div>
      )}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10">
        {products.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </div>
  );
};
