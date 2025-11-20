import React from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
export const Cart: React.FC = () => {
  const {
    cart,
    updateQuantity,
    removeFromCart,
    getTotalPrice
  } = useCart();
  if (cart.length === 0) {
    return <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Looks like you haven't added any products to your cart yet.
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
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Your Cart</h1>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart Items */}
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="hidden md:grid grid-cols-12 gap-4 p-4 bg-gray-50 border-b text-sm font-medium text-gray-600">
              <div className="col-span-6">Product</div>
              <div className="col-span-2 text-center">Price</div>
              <div className="col-span-2 text-center">Quantity</div>
              <div className="col-span-2 text-center">Total</div>
            </div>
            {cart.map(item => <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 p-4 border-b items-center">
                {/* Product Info - Mobile & Desktop */}
                <div className="col-span-1 md:col-span-6">
                  <div className="flex items-center">
                    <img src={item.product.image} alt={item.product.name} className="w-16 h-16 object-cover rounded-md mr-4" />
                    <div>
                      <h3 className="font-medium text-primary-dark">
                        {item.product.name}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {item.product.category}
                      </p>
                      <div className="md:hidden mt-2 flex justify-between">
                        <span className="text-sm">
                          ${item.product.price.toFixed(2)}
                        </span>
                        <span className="text-sm font-medium">
                          ${(item.product.price * item.quantity).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                {/* Price - Desktop */}
                <div className="hidden md:block col-span-2 text-center">
                  ${item.product.price.toFixed(2)}
                </div>
                {/* Quantity - Mobile & Desktop */}
                <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center">
                  <div className="flex border rounded-md">
                    <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="px-2 py-1 border-r" aria-label="Decrease quantity">
                      <MinusIcon size={16} />
                    </button>
                    <span className="px-4 py-1 flex items-center justify-center">
                      {item.quantity}
                    </span>
                    <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="px-2 py-1 border-l" aria-label="Increase quantity">
                      <PlusIcon size={16} />
                    </button>
                  </div>
                  <button onClick={() => removeFromCart(item.product.id)} className="text-red-500 hover:text-red-700 md:ml-4" aria-label="Remove item">
                    <TrashIcon size={18} />
                  </button>
                </div>
                {/* Total - Desktop */}
                <div className="hidden md:block col-span-2 text-center font-medium">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </div>
              </div>)}
          </div>
          <div className="mt-8">
            <Link to="/products" className="inline-flex items-center text-primary-dark hover:text-primary-dark/80">
              <ArrowLeftIcon size={16} className="mr-2" />
              Continue Shopping
            </Link>
          </div>
        </div>
        {/* Order Summary */}
        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold text-primary-dark mb-4">
              Order Summary
            </h2>
            <div className="space-y-3 mb-6">
              <div className="flex justify-between text-gray-600">
                <span>Subtotal</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-primary-dark">Total</span>
                  <span className="text-primary-dark">
                    ${getTotalPrice().toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <input type="text" placeholder="Promo Code" className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2" />
              <Button variant="outline" fullWidth>
                Apply Code
              </Button>
            </div>
            <Link to="/checkout">
              <Button fullWidth size="lg">
                Proceed to Checkout
              </Button>
            </Link>
            <p className="text-xs text-gray-500 text-center mt-4">
              Secure checkout powered by industry-standard encryption
            </p>
          </div>
        </div>
      </div>
    </div>;
};