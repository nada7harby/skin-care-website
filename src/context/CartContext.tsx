import React, { useEffect, useState, createContext, useContext } from 'react';

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  brand: string;
  description: string;
  rating: number;
  sku?: string;
  slug?: string;
  barcode?: string;
  shortDescription?: string;
  discountPrice?: number;
  costPrice?: number;
  tax?: number;
  stock?: number;
  reservedStock?: number;
  lowStockAlert?: number;
  maxPurchaseQuantity?: number;
  status?: 'Draft' | 'Published' | 'Archived';
  stockStatus?: 'In Stock' | 'Low Stock' | 'Out of Stock';
  featured?: boolean;
  createdDate?: string;
  gallery?: string[];
  tags?: string[];
  warnings?: string;
  dermatologistTested?: boolean;
  crueltyFree?: boolean;
  vegan?: boolean;
  fragranceFree?: boolean;
  parabenFree?: boolean;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  isNew?: boolean;
  isBestSeller?: boolean;
  ingredients?: string[];
  skinType?: string[];
  benefits?: string[];
  howToUse?: string;
}
interface CartItem {
  product: Product;
  quantity: number;
}
interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  applyCoupon: (code: string, discount: number) => void;
  clearCoupon: () => void;
  coupon?: { code: string; discount: number };
  getDiscount: () => number;
  getPayableTotal: () => number;
}
const CartContext = createContext<CartContextType | undefined>(undefined);
export const CartProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [coupon, setCoupon] = useState<{ code: string; discount: number } | undefined>();
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
    const savedCoupon = localStorage.getItem('cartCoupon');
    if (savedCoupon) {
      setCoupon(JSON.parse(savedCoupon));
    }
  }, []);
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);
  useEffect(() => {
    if (coupon) {
      localStorage.setItem('cartCoupon', JSON.stringify(coupon));
    } else {
      localStorage.removeItem('cartCoupon');
    }
  }, [coupon]);
  const addToCart = (product: Product, quantity = 1) => {
    if ((product.stock ?? 1) <= 0 || product.stockStatus === 'Out of Stock' || product.status === 'Archived') {
      return;
    }
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      const maxAllowed = Math.max(0, product.stock ?? product.maxPurchaseQuantity ?? 99);
      if (existingItem) {
        return prevCart.map(item => item.product.id === product.id ? {
          ...item,
          quantity: Math.min(item.quantity + quantity, maxAllowed)
        } : item);
      } else {
        return [...prevCart, {
          product,
          quantity: Math.min(quantity, maxAllowed || quantity)
        }];
      }
    });
  };
  const removeFromCart = (productId: number) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
  };
  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prevCart => prevCart.map(item => {
      if (item.product.id !== productId) return item;
      const maxAllowed = Math.max(1, item.product.stock ?? item.product.maxPurchaseQuantity ?? 99);
      return {
        ...item,
        quantity: Math.min(quantity, maxAllowed)
      };
    }));
  };
  const clearCart = () => {
    setCart([]);
  };
  const getTotalItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };
  const getTotalPrice = () => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
  };
  const applyCoupon = (code: string, discount: number) => {
    setCoupon({ code, discount });
  };
  const clearCoupon = () => setCoupon(undefined);
  const getDiscount = () => Math.min(coupon?.discount || 0, getTotalPrice());
  const getPayableTotal = () => Math.max(0, getTotalPrice() - getDiscount());
  return <CartContext.Provider value={{
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalItems,
    getTotalPrice,
    applyCoupon,
    clearCoupon,
    coupon,
    getDiscount,
    getPayableTotal
  }}>
      {children}
    </CartContext.Provider>;
};
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
