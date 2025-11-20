import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { StarIcon, ShoppingBagIcon, HeartIcon, ArrowLeftIcon, PackageIcon, ShieldCheckIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Button } from '../components/ui/Button';
import { ProductGrid } from '../components/product/ProductGrid';
import { getProductById, getProductsByCategory } from '../data/products';

export const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  const [selectedImage, setSelectedImage] = useState(0);
  // Get product details from the ID
  const product = getProductById(Number(id));
  // Get related products
  const relatedProducts = product ? getProductsByCategory(product.category).filter(p => p.id !== product.id).slice(0, 4) : [];
  if (!product) {
    return <div className="container-custom py-16 text-center">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Product Not Found
        </h2>
        <p className="text-gray-600 mb-8">
          The product you're looking for doesn't exist or has been removed.
        </p>
        <Link to="/products">
          <Button className="flex items-center mx-auto">
            <ArrowLeftIcon size={16} className="mr-2" />
            Back to Products
          </Button>
        </Link>
      </div>;
  }
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleFavoriteToggle = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  // Multiple product images (using same image for demo)
  const productImages = [product.image, product.image, product.image];
  return <div className="container-custom py-12">
      {/* Breadcrumb */}
      <div className="text-sm text-gray-600 mb-6">
        <Link to="/" className="hover:text-primary-dark">
          Home
        </Link>
        <span className="mx-2">/</span>
        <Link to="/products" className="hover:text-primary-dark">
          Products
        </Link>
        <span className="mx-2">/</span>
        <Link to={`/products?category=${product.category}`} className="hover:text-primary-dark">
          {product.category}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-primary-dark">{product.name}</span>
      </div>
      {/* Product Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg overflow-hidden shadow-md mb-4">
            <img 
              src={productImages[selectedImage]} 
              alt={product.name} 
              className="w-full h-auto object-cover"
              loading="eager"
            />
          </div>
          <div className="grid grid-cols-3 gap-2">
            {productImages.map((img, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`rounded-lg overflow-hidden border-2 ${
                  selectedImage === index ? 'border-primary-dark' : 'border-gray-200'
                }`}
              >
                <img src={img} alt={`${product.name} ${index + 1}`} className="w-full h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            {product.isNew && (
              <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">New</span>
            )}
            {product.isBestSeller && (
              <span className="bg-yellow-100 text-yellow-800 text-xs px-2 py-1 rounded-full">Best Seller</span>
            )}
          </div>

          <h1 className="text-3xl font-bold text-primary-dark mb-2">
            {product.name}
          </h1>

          <p className="text-gray-600 mb-4">by {product.brand}</p>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <StarIcon 
                  key={i} 
                  size={18} 
                  className={`${i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} 
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.rating})</span>
          </div>

          {/* Price */}
          <div className="text-3xl font-bold text-primary-dark mb-6">
            ${product.price.toFixed(2)}
          </div>

          {/* Description */}
          <p className="text-gray-700 mb-6">{product.description}</p>

          {/* Skin Type */}
          {product.skinType && product.skinType.length > 0 && (
            <div className="mb-4">
              <span className="font-medium text-gray-700">Skin Type: </span>
              <span className="text-gray-600">{product.skinType.join(', ')}</span>
            </div>
          )}

          {/* Benefits */}
          {product.benefits && product.benefits.length > 0 && (
            <div className="mb-6">
              <span className="font-medium text-gray-700 block mb-2">Key Benefits:</span>
              <div className="flex flex-wrap gap-2">
                {product.benefits.map((benefit, index) => (
                  <span key={index} className="bg-primary-light text-primary-dark text-sm px-3 py-1 rounded-full">
                    {benefit}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="mb-6">
            <label htmlFor="quantity" className="block font-medium text-gray-700 mb-2">
              Quantity
            </label>
            <div className="flex items-center">
              <button 
                onClick={() => quantity > 1 && setQuantity(quantity - 1)} 
                className="px-4 py-2 border border-gray-300 rounded-l-md bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity" 
                min="1" 
                value={quantity} 
                onChange={handleQuantityChange} 
                className="w-20 text-center py-2 border-y border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-dark" 
              />
              <button 
                onClick={() => setQuantity(quantity + 1)} 
                className="px-4 py-2 border border-gray-300 rounded-r-md bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 mb-6">
            <Button 
              fullWidth 
              size="lg" 
              className="flex items-center justify-center" 
              onClick={handleAddToCart}
            >
              <ShoppingBagIcon size={20} className="mr-2" />
              Add to Cart
            </Button>
            <Button 
              fullWidth 
              size="lg" 
              variant="outline" 
              className="flex items-center justify-center" 
              onClick={handleFavoriteToggle}
            >
              <HeartIcon 
                size={20} 
                className={`mr-2 ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : ''}`} 
              />
              {isFavorite(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
            </Button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6 space-y-3">
            <div className="flex items-center text-gray-600">
              <PackageIcon size={18} className="mr-2 text-primary-dark" />
              <span className="text-sm">Free shipping on orders over $50</span>
            </div>
            <div className="flex items-center text-gray-600">
              <ShieldCheckIcon size={18} className="mr-2 text-primary-dark" />
              <span className="text-sm">30-day money-back guarantee</span>
            </div>
          </div>
        </div>
      </div>
      {/* Product Tabs */}
      <div className="mb-16 bg-white rounded-lg shadow-md">
        <div className="flex border-b">
          <button 
            className={`py-4 px-6 font-medium transition-colors ${
              activeTab === 'description' 
                ? 'text-primary-dark border-b-2 border-primary-dark' 
                : 'text-gray-600 hover:text-primary-dark'
            }`} 
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`py-4 px-6 font-medium transition-colors ${
              activeTab === 'ingredients' 
                ? 'text-primary-dark border-b-2 border-primary-dark' 
                : 'text-gray-600 hover:text-primary-dark'
            }`} 
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`py-4 px-6 font-medium transition-colors ${
              activeTab === 'howToUse' 
                ? 'text-primary-dark border-b-2 border-primary-dark' 
                : 'text-gray-600 hover:text-primary-dark'
            }`} 
            onClick={() => setActiveTab('howToUse')}
          >
            How to Use
          </button>
          <button 
            className={`py-4 px-6 font-medium transition-colors ${
              activeTab === 'reviews' 
                ? 'text-primary-dark border-b-2 border-primary-dark' 
                : 'text-gray-600 hover:text-primary-dark'
            }`} 
            onClick={() => setActiveTab('reviews')}
          >
            Reviews
          </button>
        </div>
        <div className="p-6">
          {activeTab === 'description' && (
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-4">Product Description</h3>
              <p className="text-gray-700 mb-4">{product.description}</p>
              <p className="text-gray-700">
                Our {product.brand} products are formulated with the highest quality
                ingredients to provide effective results. We believe in clean
                beauty and sustainable practices, ensuring that our products are
                good for your skin and the environment.
              </p>
            </div>
          )}
          {activeTab === 'ingredients' && (
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-4">Key Ingredients</h3>
              {product.ingredients && product.ingredients.length > 0 ? (
                <ul className="space-y-3">
                  {product.ingredients.map((ingredient, index) => (
                    <li key={index} className="flex items-start">
                      <span className="inline-block w-2 h-2 bg-primary-dark rounded-full mt-2 mr-3"></span>
                      <span className="text-gray-700">{ingredient}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-600">All ingredients are carefully selected for their effectiveness and safety.</p>
              )}
            </div>
          )}
          {activeTab === 'howToUse' && (
            <div>
              <h3 className="text-xl font-semibold text-primary-dark mb-4">How to Use</h3>
              {product.howToUse ? (
                <p className="text-gray-700">{product.howToUse}</p>
              ) : (
                <p className="text-gray-700">
                  Apply to clean skin as directed. For best results, use consistently as part of your
                  daily skincare routine. Follow with moisturizer if needed.
                </p>
              )}
            </div>
          )}
          {activeTab === 'reviews' && <div>
              <p className="text-gray-700 mb-6">
                Customer reviews for {product.name}:
              </p>
              <div className="space-y-6">
                {[{
              name: 'Sarah J.',
              rating: 5,
              date: '2 months ago',
              comment: 'This product exceeded my expectations! My skin feels so much smoother and more hydrated. Will definitely purchase again.'
            }, {
              name: 'Michael T.',
              rating: 4,
              date: '3 months ago',
              comment: "Great product overall. I noticed improvements in my skin's texture after just a week of use. The only downside is the scent is a bit strong for my preference."
            }, {
              name: 'Emma L.',
              rating: 5,
              date: '1 month ago',
              comment: "Absolutely love this! It's gentle on my sensitive skin and really helps with hydration. The packaging is also beautiful."
            }].map((review, index) => <div key={index} className="border-b pb-6 last:border-0">
                    <div className="flex items-center mb-2">
                      <span className="font-medium text-primary-dark mr-2">
                        {review.name}
                      </span>
                      <span className="text-sm text-gray-500">
                        • {review.date}
                      </span>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(5)].map((_, i) => <StarIcon key={i} size={16} className={`${i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`} />)}
                    </div>
                    <p className="text-gray-700">{review.comment}</p>
                  </div>)}
              </div>
            </div>}
        </div>
      </div>
      {/* Related Products */}
      <ProductGrid products={relatedProducts} title="You May Also Like" />
    </div>;
};