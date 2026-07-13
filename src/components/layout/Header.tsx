import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { SearchIcon, ShoppingBagIcon, UserIcon, MenuIcon, XIcon, HeartIcon } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import { useFavorites } from '../../context/FavoritesContext';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Shop', to: '/products' },
  { label: 'About', to: '/about' },
  { label: 'Contact', to: '/contact' },
];

export const Header: React.FC = () => {
  const { getTotalItems } = useCart();
  const { getFavoritesCount } = useFavorites();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  const transparent = isHome && !scrolled;
  const textColor = transparent ? 'text-porcelain-paper' : 'text-ink';

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-expo ${
        transparent ? 'bg-transparent py-6' : 'glass-light border-b border-porcelain-line py-3 shadow-[0_1px_0_rgba(36,29,23,0.04)]'
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" className="shrink-0">
              <path
                d="M13 2C13 2 5.5 11.2 5.5 16.6C5.5 20.9 8.9 24 13 24C17.1 24 20.5 20.9 20.5 16.6C20.5 11.2 13 2 13 2Z"
                stroke="currentColor"
                className={transparent ? 'text-copper-glow' : 'text-copper'}
                strokeWidth="1.4"
              />
              <path d="M8.8 16.2C8.8 18.7 10.6 20.4 13 20.4" stroke="currentColor" className={transparent ? 'text-copper-glow' : 'text-copper'} strokeWidth="1.2" strokeLinecap="round" opacity="0.6" />
            </svg>
            <span className={`font-display text-xl font-semibold tracking-tight ${textColor}`}>
              GlowSkin
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-9">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`relative font-medium text-[0.95rem] transition-colors duration-200 ${textColor} hover:text-copper group`}
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-copper transition-all duration-300 ease-expo group-hover:w-full" />
              </Link>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-1">
            <Link to="/search" className={`p-2.5 rounded-full transition-colors ${textColor} hover:text-copper`} aria-label="Search">
              <SearchIcon size={19} />
            </Link>
            <Link to="/favorites" className={`p-2.5 rounded-full relative transition-colors ${textColor} hover:text-copper`} aria-label="Favorites">
              <HeartIcon size={19} />
              {getFavoritesCount() > 0 && (
                <span className="absolute top-1 right-1 bg-copper text-porcelain-paper text-[0.6rem] w-4 h-4 flex items-center justify-center rounded-full font-mono">
                  {getFavoritesCount()}
                </span>
              )}
            </Link>
            <Link to="/account" className={`p-2.5 rounded-full transition-colors ${textColor} hover:text-copper`} aria-label="Account">
              <UserIcon size={19} />
            </Link>
            <Link to="/cart" className={`ml-1 p-2.5 rounded-full relative transition-colors ${textColor} hover:text-copper`} aria-label="Cart">
              <ShoppingBagIcon size={19} />
              {getTotalItems() > 0 && (
                <span className="absolute top-1 right-1 bg-copper text-porcelain-paper text-[0.6rem] w-4 h-4 flex items-center justify-center rounded-full font-mono">
                  {getTotalItems()}
                </span>
              )}
            </Link>
          </div>

          <button className={`md:hidden p-2 ${textColor}`} onClick={() => setIsMenuOpen(!isMenuOpen)} aria-label="Toggle menu">
            {isMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="md:hidden glass-light border-t border-porcelain-line overflow-hidden"
          >
            <div className="container-custom py-5">
              <nav className="flex flex-col gap-1">
                {navLinks.map(link => (
                  <Link key={link.to} to={link.to} className="px-3 py-3 text-ink font-medium rounded-lg hover:bg-porcelain">
                    {link.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-4 flex items-center justify-around border-t border-porcelain-line pt-4">
                <Link to="/search" className="flex flex-col items-center gap-1 text-ink text-xs">
                  <SearchIcon size={19} />
                  Search
                </Link>
                <Link to="/favorites" className="flex flex-col items-center gap-1 text-ink text-xs relative">
                  <HeartIcon size={19} />
                  Favorites
                  {getFavoritesCount() > 0 && (
                    <span className="absolute -top-1 right-2 bg-copper text-porcelain-paper text-[0.6rem] w-4 h-4 flex items-center justify-center rounded-full">
                      {getFavoritesCount()}
                    </span>
                  )}
                </Link>
                <Link to="/account" className="flex flex-col items-center gap-1 text-ink text-xs">
                  <UserIcon size={19} />
                  Account
                </Link>
                <Link to="/cart" className="flex flex-col items-center gap-1 text-ink text-xs relative">
                  <ShoppingBagIcon size={19} />
                  Cart
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 right-2 bg-copper text-porcelain-paper text-[0.6rem] w-4 h-4 flex items-center justify-center rounded-full">
                      {getTotalItems()}
                    </span>
                  )}
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};
