import React, { useState, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { CheckIcon, ArrowLeftIcon } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Button } from '../components/ui/Button';
import { motion } from 'framer-motion';
export const Checkout: React.FC = () => {
  const {
    cart,
    getTotalPrice
  } = useCart();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: ''
  });
  const steps = [{
    number: 1,
    title: 'Shipping'
  }, {
    number: 2,
    title: 'Payment'
  }, {
    number: 3,
    title: 'Review'
  }];
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };
  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };
  if (cart.length === 0) {
    return <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <h2 className="text-2xl font-bold text-primary-dark mb-4">
          Your Cart is Empty
        </h2>
        <p className="text-gray-600 mb-8 text-center">
          Add some products to your cart before checking out.
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
      <h1 className="text-3xl font-bold text-primary-dark mb-8">Checkout</h1>
      {/* Progress Bar */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((step, index) => <Fragment key={step.number}>
              <div className="flex flex-col items-center">
                <motion.div className={`w-12 h-12 rounded-full flex items-center justify-center font-semibold transition-colors ${currentStep >= step.number ? 'bg-primary-dark text-white' : 'bg-gray-200 text-gray-600'}`} initial={{
              scale: 0.8
            }} animate={{
              scale: currentStep === step.number ? 1.1 : 1
            }} transition={{
              duration: 0.3
            }}>
                  {currentStep > step.number ? <CheckIcon size={20} /> : step.number}
                </motion.div>
                <span className="text-sm mt-2 text-gray-600">{step.title}</span>
              </div>
              {index < steps.length - 1 && <div className={`flex-1 h-1 mx-4 transition-colors ${currentStep > step.number ? 'bg-primary-dark' : 'bg-gray-200'}`} />}
            </Fragment>)}
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md p-6">
            {currentStep === 1 && <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
                <h2 className="text-xl font-bold text-primary-dark mb-6">
                  Shipping Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">Email</label>
                    <input type="email" name="email" value={formData.email} onChange={handleInputChange} className="input" placeholder="your@email.com" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        First Name
                      </label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} className="input" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Last Name
                      </label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} className="input" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Address</label>
                    <input type="text" name="address" value={formData.address} onChange={handleInputChange} className="input" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">City</label>
                      <input type="text" name="city" value={formData.city} onChange={handleInputChange} className="input" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">State</label>
                      <input type="text" name="state" value={formData.state} onChange={handleInputChange} className="input" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">
                        ZIP Code
                      </label>
                      <input type="text" name="zipCode" value={formData.zipCode} onChange={handleInputChange} className="input" />
                    </div>
                  </div>
                </div>
              </motion.div>}
            {currentStep === 2 && <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
                <h2 className="text-xl font-bold text-primary-dark mb-6">
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-gray-700 mb-2">
                      Card Number
                    </label>
                    <input type="text" name="cardNumber" value={formData.cardNumber} onChange={handleInputChange} className="input" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-gray-700 mb-2">
                        Expiry Date
                      </label>
                      <input type="text" name="expiryDate" value={formData.expiryDate} onChange={handleInputChange} className="input" placeholder="MM/YY" />
                    </div>
                    <div>
                      <label className="block text-gray-700 mb-2">CVV</label>
                      <input type="text" name="cvv" value={formData.cvv} onChange={handleInputChange} className="input" placeholder="123" />
                    </div>
                  </div>
                </div>
              </motion.div>}
            {currentStep === 3 && <motion.div initial={{
            opacity: 0,
            x: 20
          }} animate={{
            opacity: 1,
            x: 0
          }}>
                <h2 className="text-xl font-bold text-primary-dark mb-6">
                  Review Your Order
                </h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Shipping Address
                    </h3>
                    <p className="text-gray-600">
                      {formData.firstName} {formData.lastName}
                      <br />
                      {formData.address}
                      <br />
                      {formData.city}, {formData.state} {formData.zipCode}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-700 mb-2">
                      Order Items
                    </h3>
                    <div className="space-y-2">
                      {cart.map(item => <div key={item.product.id} className="flex justify-between text-gray-600">
                          <span>
                            {item.product.name} × {item.quantity}
                          </span>
                          <span>
                            ${(item.product.price * item.quantity).toFixed(2)}
                          </span>
                        </div>)}
                    </div>
                  </div>
                </div>
              </motion.div>}
            <div className="flex justify-between mt-8">
              {currentStep > 1 && <Button variant="outline" onClick={handlePrevStep}>
                  Back
                </Button>}
              <Button onClick={handleNextStep} className={currentStep === 1 ? 'ml-auto' : ''}>
                {currentStep === 3 ? 'Place Order' : 'Continue'}
              </Button>
            </div>
          </div>
        </div>
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 sticky top-24">
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
                <span>$5.99</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Tax</span>
                <span>${(getTotalPrice() * 0.08).toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3">
                <div className="flex justify-between font-bold">
                  <span className="text-primary-dark">Total</span>
                  <span className="text-primary-dark">
                    $
                    {(getTotalPrice() + 5.99 + getTotalPrice() * 0.08).toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};