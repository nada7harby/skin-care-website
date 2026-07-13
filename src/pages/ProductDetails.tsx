import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, ShoppingBagIcon, HeartIcon, ArrowLeftIcon, PackageIcon, ShieldCheckIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from '../components/ui/Button';
import { ProductGrid } from '../components/product/ProductGrid';
import { getProductById, getProductsByCategory } from '../data/products';

const tabs = [
  { id: 'description', label: 'Description' },
  { id: 'ingredients', label: 'Ingredients' },
  { id: 'howToUse', label: 'How to Use' },
  { id: 'reviews', label: 'Reviews' },
];

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);

  const product = getProductById(Number(id));
  const relatedProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4) : [];

  if (!product) {
    return (
      <div className="container-custom pt-40 pb-24 text-center">
        <h2 className="text-display-3 font-display font-semibold text-ink mb-4">Product Not Found</h2>
        <p className="text-ink-muted mb-8">The product you're looking for doesn't exist or has been removed.</p>
        <Link to="/products">
          <Button className="inline-flex items-center mx-auto">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>
    );
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) setQuantity(value);
  };
  const handleAddToCart = () => addToCart(product, quantity);
  const handleFavoriteToggle = () => (isFavorite(product.id) ? removeFromFavorites(product.id) : addToFavorites(product));
  const productImages = [product.image, product.image, product.image];
  const batchNo = String((product.id % 20) + 1).padStart(2, '0');

  return (
    <div className="container-custom pt-32 pb-24">
      <div className="flex items-center gap-2 text-sm text-ink-soft mb-8">
        <Link to="/" className="hover:text-copper transition-colors">Home</Link>
        <span>/</span>
        <Link to="/products" className="hover:text-copper transition-colors">Products</Link>
        <span>/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-copper transition-colors">{product.category}</Link>
        <span>/</span>
        <span className="text-ink">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-14 mb-24">
        <div>
          <div className="relative rounded-2xl overflow-hidden bg-porcelain-line/40 aspect-[4/5] mb-4">
            <img src={productImages[selectedImage]} alt={product.name} className="w-full h-full object-cover" loading="eager" />
            <span className="absolute top-4 left-4 label-tag bg-espresso/70 text-porcelain-paper backdrop-blur-sm px-2.5 py-1.5 rounded-md">
              N&deg;{batchNo}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-xl overflow-hidden border-2 transition-colors aspect-square ${selectedImage === index ? 'border-copper' : 'border-transparent hover:border-porcelain-line'}`}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        <div>
          <div className="flex items-center gap-2 mb-3">
            {product.isNew && <span className="label-tag bg-sage/10 text-sage px-2.5 py-1 rounded-full">New</span>}
            {product.isBestSeller && <span className="label-tag bg-copper/10 text-copper px-2.5 py-1 rounded-full">Best Seller</span>}
          </div>

          <span className="eyebrow-mono">{product.brand}</span>
          <h1 className="text-display-3 font-display font-semibold text-ink mt-1 mb-3">{product.name}</h1>

          <div className="flex items-center gap-2 mb-6">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon key={i} size={16} className={i < Math.floor(product.rating) ? 'fill-copper text-copper' : 'text-porcelain-line'} />
              ))}
            </div>
            <span className="text-ink-muted text-sm tabular">({product.rating})</span>
          </div>

          <div className="font-mono text-3xl text-ink tabular mb-6">${product.price.toFixed(2)}</div>

          <p className="text-ink-muted leading-relaxed mb-6">{product.description}</p>

          {product.skinType && product.skinType.length > 0 && (
            <div className="mb-4 text-sm">
              <span className="font-medium text-ink">Skin Type: </span>
              <span className="text-ink-muted">{product.skinType.join(', ')}</span>
            </div>
          )}

          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-8">
              <span className="label-tag text-ink-muted block mb-2.5">Key Benefits</span>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <span key={index} className="bg-porcelain text-ink text-sm px-3 py-1.5 rounded-full border border-porcelain-line">{benefit}</span>
                ))}
              </div>
            </div>
          )}

          <div className="mb-8">
            <label htmlFor="quantity" className="label-tag text-ink-muted block mb-2.5">Quantity</label>
            <div className="inline-flex items-center border border-porcelain-line rounded-lg overflow-hidden">
              <button onClick={() => quantity > 1 && setQuantity(quantity - 1)} className="w-11 h-11 flex items-center justify-center hover:bg-porcelain transition-colors" aria-label="Decrease quantity">
                <MinusIcon size={15} />
              </button>
              <input type="number" id="quantity" min="1" value={quantity} onChange={handleQuantityChange} className="w-14 text-center py-2 border-x border-porcelain-line focus:outline-none tabular" />
              <button onClick={() => setQuantity(quantity + 1)} className="w-11 h-11 flex items-center justify-center hover:bg-porcelain transition-colors" aria-label="Increase quantity">
                <PlusIcon size={15} />
              </button>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            <Button fullWidth size="lg" className="flex items-center justify-center" onClick={handleAddToCart}>
              <ShoppingBagIcon size={19} className="mr-2" />
              Add to Cart
            </Button>
            <Button fullWidth size="lg" variant="outline" className="flex items-center justify-center" onClick={handleFavoriteToggle}>
              <HeartIcon size={19} className={`mr-2 ${isFavorite(product.id) ? 'fill-copper text-copper' : ''}`} />
              {isFavorite(product.id) ? 'Saved' : 'Wishlist'}
            </Button>
          </div>

          <div className="border-t border-porcelain-line pt-6 space-y-3">
            <div className="flex items-center text-ink-muted text-sm gap-2.5">
              <PackageIcon size={17} className="text-copper" />
              Free shipping on orders over $50
            </div>
            <div className="flex items-center text-ink-muted text-sm gap-2.5">
              <ShieldCheckIcon size={17} className="text-copper" />
              30-day money-back guarantee
            </div>
          </div>
        </div>
      </div>

      <div className="mb-24">
        <div className="flex border-b border-porcelain-line gap-1 overflow-x-auto no-scrollbar">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-3.5 px-5 font-medium text-sm whitespace-nowrap transition-colors relative ${activeTab === tab.id ? 'text-ink' : 'text-ink-soft hover:text-ink'}`}
            >
              {tab.label}
              {activeTab === tab.id && <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-copper rounded-full" />}
            </button>
          ))}
        </div>
        <div className="py-8 max-w-2xl">
          {activeTab === 'description' && (
            <div>
              <p className="text-ink-muted leading-relaxed mb-4">{product.description}</p>
              <p className="text-ink-muted leading-relaxed">
                Our {product.brand} products are formulated with the highest quality ingredients to provide effective results. We believe in clean beauty and sustainable practices, ensuring that our products are good for your skin and the environment.
              </p>
            </div>
          )}
          {activeTab === 'ingredients' && (
            product.ingredients && product.ingredients.length > 0 ? (
              <ul className="space-y-3">
                {product.ingredients.map((ingredient, index) => (
                  <li key={index} className="flex items-center gap-3 text-ink-muted">
                    <span className="font-mono text-xs text-copper tabular">{String(index + 1).padStart(2, '0')}</span>
                    {ingredient}
                  </li>
                ))}
              </ul>
            ) : <p className="text-ink-muted">All ingredients are carefully selected for their effectiveness and safety.</p>
          )}
          {activeTab === 'howToUse' && (
            <p className="text-ink-muted leading-relaxed">
              {product.howToUse || 'Apply to clean skin as directed. For best results, use consistently as part of your daily skincare routine. Follow with moisturizer if needed.'}
            </p>
          )}
          {activeTab === 'reviews' && (
            <div className="space-y-6">
              {[
                { name: 'Sarah J.', rating: 5, date: '2 months ago', comment: 'This product exceeded my expectations! My skin feels so much smoother and more hydrated. Will definitely purchase again.' },
                { name: 'Michael T.', rating: 4, date: '3 months ago', comment: 'Great product overall. I noticed improvements in my skin’s texture after just a week of use.' },
                { name: 'Emma L.', rating: 5, date: '1 month ago', comment: 'Absolutely love this! It’s gentle on my sensitive skin and really helps with hydration.' },
              ].map((review, index) => (
                <div key={index} className="pb-6 border-b border-porcelain-line last:border-0">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-medium text-ink">{review.name}</span>
                    <span className="text-ink-soft text-sm">· {review.date}</span>
                  </div>
                  <div className="flex mb-2.5">
                    {[...Array(5)].map((_, i) => (
                      <StarIcon key={i} size={14} className={i < review.rating ? 'fill-copper text-copper' : 'text-porcelain-line'} />
                    ))}
                  </div>
                  <p className="text-ink-muted leading-relaxed">{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {relatedProducts.length > 0 && <ProductGrid products={relatedProducts} title="You May Also Like" eyebrow="Same category" />}
    </div>
  );
};
