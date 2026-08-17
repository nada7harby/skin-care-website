import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ArrowLeftIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
import { useStoreData } from '../context/StoreDataContext';
import { useToast } from '../context/ToastContext';

export const Checkout: React.FC = () => {
  const { cart, getTotalPrice, getDiscount, coupon, clearCart } = useCart();
  const { createOrderFromCart, settings } = useStoreData();
  const { notify } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [placedOrder, setPlacedOrder] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    email: '', firstName: '', lastName: '', address: '', city: '', state: '', zipCode: '',
    cardNumber: '', expiryDate: '', cvv: ''
  });

  const steps = [{ number: 1, title: 'Shipping' }, { number: 2, title: 'Payment' }, { number: 3, title: 'Review' }];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const shipping = getTotalPrice() >= settings.freeShippingMinimum ? 0 : settings.shippingCost;
  const tax = settings.taxEnabled ? getTotalPrice() * (settings.taxPercentage / 100) : 0;
  const total = getTotalPrice() + shipping + tax - getDiscount();

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      return;
    }
    const order = createOrderFromCart({
      customerId: 1,
      customer: `${formData.firstName || 'Guest'} ${formData.lastName || 'Customer'}`.trim(),
      email: formData.email || 'guest@example.com',
      items: cart.map(item => ({ productId: item.product.id, name: item.product.name, image: item.product.image, quantity: item.quantity, unitPrice: item.product.price })),
      subtotal: getTotalPrice(),
      shipping,
      tax: Number(tax.toFixed(2)),
      discount: getDiscount(),
      total: Number(total.toFixed(2)),
      promoCode: coupon?.code,
      paymentStatus: 'Paid',
      orderStatus: 'Pending',
      shippingStatus: 'Pending',
      shippingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      billingAddress: `${formData.address}, ${formData.city}, ${formData.state} ${formData.zipCode}`,
      paymentMethod: 'Mock credit card',
      shippingMethod: shipping === 0 ? 'Free standard shipping' : 'Standard shipping',
      notes: [],
    });
    clearCart();
    setPlacedOrder(order.orderNumber);
    notify(`${order.orderNumber} created and sent to admin orders.`);
  };
  const handlePrevStep = () => currentStep > 1 && setCurrentStep(currentStep - 1);

  if (placedOrder) {
    return (
      <div className="container-custom pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-display-3 font-display font-semibold text-ink mb-4">Order Placed</h2>
        <p className="text-ink-muted mb-8">Your mock order {placedOrder} is now visible in the admin dashboard.</p>
        <Link to="/products"><Button>Continue Shopping</Button></Link>
      </div>
    );
  }

  if (cart.length === 0) {
    return (
      <div className="container-custom pt-32 pb-24 min-h-[60vh] flex flex-col items-center justify-center text-center">
        <h2 className="text-display-3 font-display font-semibold text-ink mb-4">Your Cart is Empty</h2>
        <p className="text-ink-muted mb-8">Add some products to your cart before checking out.</p>
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
      <h1 className="text-display-2 font-display font-semibold text-ink mb-12">Checkout</h1>

      <div className="mb-14">
        <div className="flex items-center justify-between max-w-xl mx-auto">
          {steps.map((step, index) => (
            <Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <motion.div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-mono text-sm transition-colors ${currentStep >= step.number ? 'bg-copper text-porcelain-paper' : 'bg-porcelain-line text-ink-soft'}`}
                  animate={{ scale: currentStep === step.number ? 1.1 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {currentStep > step.number ? <CheckIcon size={17} /> : String(step.number).padStart(2, '0')}
                </motion.div>
                <span className="text-xs mt-2 text-ink-muted">{step.title}</span>
              </div>
              {index < steps.length - 1 && (
                <div className={`flex-1 h-px mx-3 transition-colors ${currentStep > step.number ? 'bg-copper' : 'bg-porcelain-line'}`} />
              )}
            </Fragment>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-7">
            {currentStep === 1 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-display font-semibold text-ink mb-6">Shipping Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-ink-muted mb-2 block">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input" placeholder="your@email.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">First Name</label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input" />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">Last Name</label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm text-ink-muted mb-2 block">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="input" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input" />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="input" />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">ZIP Code</label>
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="input" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {currentStep === 2 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-display font-semibold text-ink mb-6">Payment Information</h2>
                <div className="space-y-4">
                  <div>
                    <label className="text-sm text-ink-muted mb-2 block">Card Number</label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="input" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">Expiry Date</label>
                      <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="input" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="text-sm text-ink-muted mb-2 block">CVV</label>
                      <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} className="input" placeholder="123" />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            {currentStep === 3 && (
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
                <h2 className="font-display font-semibold text-ink mb-6">Review Your Order</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="label-tag text-ink-muted mb-2">Shipping Address</h3>
                    <p className="text-ink-muted leading-relaxed">
                      {formData.firstName} {formData.lastName}<br />
                      {formData.address}<br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="label-tag text-ink-muted mb-3">Order Items</h3>
                    <div className="space-y-2">
                      {cart.map(item => (
                        <div key={item.product.id} className="flex justify-between text-ink-muted text-sm">
                          <span>{item.product.name} × {item.quantity}</span>
                          <span className="font-mono tabular">${(item.product.price * item.quantity).toFixed(2)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            <div className="flex justify-between mt-8 pt-6 border-t border-porcelain-line">
              {currentStep > 1 && <Button variant="outline" onClick={handlePrevStep}>Back</Button>}
              <Button onClick={handleNextStep} className={currentStep === 1 ? 'ml-auto' : ''}>
                {currentStep === 3 ? 'Place Order' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>

        <div className="lg:col-span-1">
          <div className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-7 lg:sticky lg:top-28">
            <h2 className="font-display font-semibold text-ink mb-5">Order Summary</h2>
            <div className="space-y-3 mb-3 text-sm">
              <div className="flex justify-between text-ink-muted">
                <span>Subtotal</span>
                <span className="font-mono tabular">${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Shipping</span>
                  <span className="font-mono tabular">${shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-ink-muted">
                <span>Tax</span>
                  <span className="font-mono tabular">${tax.toFixed(2)}</span>
                </div>
                {coupon && (
                  <div className="flex justify-between text-sage">
                    <span>Discount ({coupon.code})</span>
                    <span className="font-mono tabular">-${getDiscount().toFixed(2)}</span>
                  </div>
                )}
              </div>
              <div className="border-t border-dashed border-porcelain-line pt-3 mt-3">
                <div className="flex justify-between font-semibold text-ink">
                  <span>Total</span>
                  <span className="font-mono text-lg tabular">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};
