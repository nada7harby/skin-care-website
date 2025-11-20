import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SearchIcon, ShoppingBagIcon, UserIcon, MenuIcon, XIcon, HeartIcon } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';
export const Header: React.FC = () => {
  const {
    getTotalItems
  } = useCart();
  const {
    getFavoritesCount
  } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center">
            <h1 className="text-2xl font-bold text-primary-dark">GlowSkin</h1>
          </Link>
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-primary-dark hover:text-primary-dark/80 font-medium transition-colors">
              Home
            </Link>
            <Link to="/products" className="text-primary-dark hover:text-primary-dark/80 font-medium transition-colors">
              Shop
            </Link>
            <Link to="/about" className="text-primary-dark hover:text-primary-dark/80 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-primary-dark hover:text-primary-dark/80 font-medium transition-colors">
              Contact
            </Link>
          </nav>
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/search" className="p-2 text-primary-dark hover:bg-gray-100 rounded-full transition-colors">
              <SearchIcon size={20} />
            </Link>
            <Link to="/favorites" className="p-2 text-primary-dark hover:bg-gray-100 rounded-full relative transition-colors">
              <HeartIcon size={20} />
              {getFavoritesCount() > 0 && <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getFavoritesCount()}
                </span>}
            </Link>
            <Link to="/account" className="p-2 text-primary-dark hover:bg-gray-100 rounded-full transition-colors">
              <UserIcon size={20} />
            </Link>
            <Link to="/cart" className="p-2 text-primary-dark hover:bg-gray-100 rounded-full relative transition-colors">
              <ShoppingBagIcon size={20} />
              {getTotalItems() > 0 && <span className="absolute -top-1 -right-1 bg-primary-dark text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {getTotalItems()}
                </span>}
            </Link>
          </div>
          <button className="md:hidden p-2 text-primary-dark" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
        {isMenuOpen && <div className="md:hidden pt-4 pb-3 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link to="/" className="px-4 py-2 text-primary-dark hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
              <Link to="/products" className="px-4 py-2 text-primary-dark hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Shop
              </Link>
              <Link to="/about" className="px-4 py-2 text-primary-dark hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                About
              </Link>
              <Link to="/contact" className="px-4 py-2 text-primary-dark hover:bg-gray-50 rounded-md" onClick={() => setIsMenuOpen(false)}>
                Contact
              </Link>
            </nav>
            <div className="mt-4 flex items-center justify-around border-t border-gray-200 pt-4">
              <Link to="/search" className="flex flex-col items-center text-primary-dark" onClick={() => setIsMenuOpen(false)}>
                <SearchIcon size={20} />
                <span className="text-xs mt-1">Search</span>
              </Link>
              <Link to="/favorites" className="flex flex-col items-center text-primary-dark relative" onClick={() => setIsMenuOpen(false)}>
                <HeartIcon size={20} />
                {getFavoritesCount() > 0 && <span className="absolute -top-1 right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getFavoritesCount()}
                  </span>}
                <span className="text-xs mt-1">Favorites</span>
              </Link>
              <Link to="/account" className="flex flex-col items-center text-primary-dark" onClick={() => setIsMenuOpen(false)}>
                <UserIcon size={20} />
                <span className="text-xs mt-1">Account</span>
              </Link>
              <Link to="/cart" className="flex flex-col items-center text-primary-dark relative" onClick={() => setIsMenuOpen(false)}>
                <ShoppingBagIcon size={20} />
                {getTotalItems() > 0 && <span className="absolute -top-1 right-3 bg-primary-dark text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                    {getTotalItems()}
                  </span>}
                <span className="text-xs mt-1">Cart</span>
              </Link>
            </div>
          </div>}
      </div>
    </header>;
};