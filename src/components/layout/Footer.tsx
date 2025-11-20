import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon } from 'lucide-react';
export const Footer: React.FC = () => {
  return <footer className="bg-primary-dark text-white">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h2 className="text-xl font-bold mb-4">GlowSkin</h2>
            <p className="text-gray-300 mb-4">
              Premium skincare products for a radiant, healthy complexion.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-gray-300">
                <FacebookIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <InstagramIcon size={20} />
              </a>
              <a href="#" className="text-white hover:text-gray-300">
                <TwitterIcon size={20} />
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/products" className="text-gray-300 hover:text-white">
                  Shop All
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-300 hover:text-white">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          {/* Categories */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/products?category=Cleansers" className="text-gray-300 hover:text-white">
                  Cleansers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Serums" className="text-gray-300 hover:text-white">
                  Serums
                </Link>
              </li>
              <li>
                <Link to="/products?category=Moisturizers" className="text-gray-300 hover:text-white">
                  Moisturizers
                </Link>
              </li>
              <li>
                <Link to="/products?category=Masks" className="text-gray-300 hover:text-white">
                  Masks
                </Link>
              </li>
            </ul>
          </div>
          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Stay Updated</h3>
            <p className="text-gray-300 mb-4">
              Subscribe to our newsletter for skincare tips and exclusive
              offers.
            </p>
            <form className="flex">
              <input type="email" placeholder="Your email" className="px-4 py-2 text-primary-dark rounded-l-md w-full focus:outline-none" />
              <button type="submit" className="bg-primary-light text-primary-dark px-4 py-2 rounded-r-md hover:bg-opacity-90 font-medium">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
          <p>
            &copy; {new Date().getFullYear()} GlowSkin. All rights reserved.
          </p>
        </div>
      </div>
    </footer>;
};