import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MinusIcon, PlusIcon, TrashIcon, ArrowLeftIcon, ShoppingBagIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { useStoreData } from '../context/StoreDataContext';
import { useToast } from '../context/ToastContext';

export const Cart: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, applyCoupon, clearCoupon, coupon, getDiscount, getPayableTotal } = useCart();
  const { validateCoupon } = useStoreData();
  const { notify } = useToast();
  const [promoCode, setPromoCode] = useState(coupon?.code || '');

  const handleApplyCode = () => {
    const result = validateCoupon(promoCode, getTotalPrice());
    if (!result) {
      notify('Coupon is invalid or minimum order was not reached.', 'error');
      return;
    }
    applyCoupon(result.coupon.code, result.discount);
    notify(`${result.coupon.code} applied.`);
  };

  if (cart.length === 0) {
    return (
      <div className="container-custom pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-porcelain flex items-center justify-center mb-6">
          <ShoppingBagIcon size={26} className="text-ink-soft" />
        </div>
        <h2 className="text-display-3 font-display font-semibold text-ink mb-3">Your Cart is Empty</h2>
        <p className="text-ink-muted mb-8 max-w-sm">Looks like you haven't added any products to your cart yet.</p>
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
        <span className="eyebrow-mono">{cart.length} item{cart.length > 1 ? 's' : ''}</span>
        <h1 className="text-display-2 font-display font-semibold text-ink mt-1">Your Cart</h1>
      </div>
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="lg:w-2/3">
          <div className="hidden md:grid grid-cols-12 gap-4 pb-4 border-b border-porcelain-line text-xs label-tag text-ink-soft">
            <div className="col-span-6">Product</div>
            <div className="col-span-2 text-center">Price</div>
            <div className="col-span-2 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
          </div>
          {cart.map(item => (
            <div key={item.product.id} className="grid grid-cols-1 md:grid-cols-12 gap-4 py-6 border-b border-porcelain-line items-center">
              <div className="col-span-1 md:col-span-6">
                <div className="flex items-center gap-4">
                  <img src={item.product.image} alt={item.product.name} className="w-18 h-18 object-cover rounded-xl shrink-0" style={{ width: 72, height: 72 }} />
                  <div>
                    <h3 className="font-medium text-ink leading-snug">{item.product.name}</h3>
                    <p className="text-sm text-ink-soft">{item.product.category}</p>
                    <div className="md:hidden mt-2 flex justify-between gap-4 font-mono text-sm tabular">
                      <span>${item.product.price.toFixed(2)}</span>
                      <span className="font-medium">${(item.product.price * item.quantity).toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block col-span-2 text-center font-mono text-ink-muted tabular">${item.product.price.toFixed(2)}</div>
              <div className="col-span-1 md:col-span-2 flex justify-between md:justify-center items-center gap-3">
                <div className="flex border border-porcelain-line rounded-lg overflow-hidden">
                  <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)} className="w-9 h-9 flex items-center justify-center hover:bg-porcelain transition-colors" aria-label="Decrease quantity">
                    <MinusIcon size={14} />
                  </button>
                  <span className="w-9 flex items-center justify-center text-sm tabular">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)} className="w-9 h-9 flex items-center justify-center hover:bg-porcelain transition-colors" aria-label="Increase quantity">
                    <PlusIcon size={14} />
                  </button>
                </div>
                <button onClick={() => removeFromCart(item.product.id)} className="text-ink-soft hover:text-rust transition-colors" aria-label="Remove item">
                  <TrashIcon size={17} />
                </button>
              </div>
              <div className="hidden md:block col-span-2 text-right font-mono font-medium text-ink tabular">${(item.product.price * item.quantity).toFixed(2)}</div>
            </div>
          ))}
          <div className="mt-8">
            <Link to="/products" className="inline-flex items-center gap-2 text-ink font-medium hover:text-copper transition-colors">
              <ArrowLeftIcon size={16} />
              Continue Shopping
            </Link>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-7 lg:sticky lg:top-28">
            <h2 className="font-display font-semibold text-ink mb-5">Order Summary</h2>
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span className="font-mono tabular">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Tax</span>
                <span>Calculated at checkout</span>
              </div>
              {coupon && (
                <div className="flex justify-between text-sage">
                  <span>Discount ({coupon.code})</span>
                  <span className="font-mono tabular">-${getDiscount().toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-dashed border-porcelain-line pt-3 mt-3">
                <div className="flex justify-between font-semibold text-ink">
                  <span>Total</span>
                  <span className="font-mono text-lg tabular">${getPayableTotal().toFixed(2)}</span>
                </div>
              </div>
            </div>
            <div className="mb-6">
              <input type="text" placeholder="Promo code" value={promoCode} onChange={e => setPromoCode(e.target.value.toUpperCase())} className="input mb-2" />
              <div className="grid grid-cols-2 gap-2">
                <Button variant="outline" fullWidth onClick={handleApplyCode}>Apply Code</Button>
                <Button variant="ghost" fullWidth onClick={() => { clearCoupon(); setPromoCode(''); }}>Clear</Button>
              </div>
            </div>
            <Link to="/checkout">
              <Button fullWidth size="lg">Proceed to Checkout</Button>
            </Link>
            <p className="text-xs text-ink-soft text-center mt-4">Secure checkout, industry-standard encryption</p>
          </div>
        </div>
      </div>
    </div>
  );
};
