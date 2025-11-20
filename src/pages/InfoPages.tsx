import React from 'react';
import { useLocation } from 'react-router-dom';
import { MailIcon, PhoneIcon, MapPinIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
export const InfoPages: React.FC = () => {
  const location = useLocation();
  const page = location.pathname.substring(1);
  if (page === 'about') {
    return <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-primary-dark mb-8 text-center">
          About GlowSkin
        </h1>
        <div className="max-w-3xl mx-auto">
          <img src="https://images.unsplash.com/photo-1556228578-0d85b1a4d571?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80" alt="About us" className="w-full h-64 object-cover rounded-lg mb-8" />
          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-4">
              GlowSkin was founded in 2020 with a simple mission: to provide
              premium, effective skincare products that are accessible to
              everyone. We believe that beautiful, healthy skin should be
              achievable for all, regardless of age, skin type, or budget.
            </p>
            <p className="text-gray-700 mb-4">
              Our products are formulated with the highest quality ingredients,
              combining the best of nature and science. We're committed to clean
              beauty, sustainability, and transparency in everything we do.
            </p>
            <p className="text-gray-700 mb-4">
              Every product is dermatologist-tested, cruelty-free, and made with
              love. We work closely with skincare experts to ensure our
              formulations deliver real results you can see and feel.
            </p>
          </div>
        </div>
      </div>;
  }
  if (page === 'contact') {
    return <div className="container-custom py-12">
        <h1 className="text-4xl font-bold text-primary-dark mb-8 text-center">
          Contact Us
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div>
            <h2 className="text-2xl font-bold text-primary-dark mb-6">
              Get in Touch
            </h2>
            <div className="space-y-6 mb-8">
              <div className="flex items-start">
                <MailIcon size={24} className="text-primary-dark mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-dark">Email</h3>
                  <p className="text-gray-600">support@glowskin.com</p>
                </div>
              </div>
              <div className="flex items-start">
                <PhoneIcon size={24} className="text-primary-dark mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-dark">Phone</h3>
                  <p className="text-gray-600">+1 (555) 123-4567</p>
                </div>
              </div>
              <div className="flex items-start">
                <MapPinIcon size={24} className="text-primary-dark mr-4 mt-1" />
                <div>
                  <h3 className="font-semibold text-primary-dark">Address</h3>
                  <p className="text-gray-600">
                    123 Beauty Lane
                    <br />
                    Los Angeles, CA 90001
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <form className="bg-white rounded-lg shadow-md p-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-gray-700 mb-2">Name</label>
                  <input type="text" className="input" placeholder="Your name" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Email</label>
                  <input type="email" className="input" placeholder="your@email.com" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Subject</label>
                  <input type="text" className="input" placeholder="How can we help?" />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Message</label>
                  <textarea className="input min-h-[150px]" placeholder="Your message"></textarea>
                </div>
                <Button fullWidth type="submit">
                  Send Message
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>;
  }
  return null;
};