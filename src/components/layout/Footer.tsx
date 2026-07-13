import React from 'react';
import { Link } from 'react-router-dom';
import { FacebookIcon, InstagramIcon, TwitterIcon, ArrowUpRightIcon } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-espresso text-porcelain-paper relative overflow-hidden">
      <div className="absolute inset-0 bg-grain pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-copper/10 blur-3xl" />

      <div className="container-custom relative pt-16 pb-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-porcelain-paper/10">
          <div className="lg:col-span-5">
            <div className="flex items-center gap-2.5 mb-5">
              <svg width="24" height="24" viewBox="0 0 26 26" fill="none">
                <path d="M13 2C13 2 5.5 11.2 5.5 16.6C5.5 20.9 8.9 24 13 24C17.1 24 20.5 20.9 20.5 16.6C20.5 11.2 13 2 13 2Z" stroke="currentColor" className="text-copper-glow" strokeWidth="1.4" />
              </svg>
              <span className="font-display text-xl font-semibold">GlowSkin</span>
            </div>
            <p className="text-porcelain-paper/60 max-w-sm leading-relaxed mb-6">
              Formulated skincare, made from ingredients you can pronounce. Every batch is dermatologist-tested and cruelty-free.
            </p>
            <div className="flex gap-3">
              {[FacebookIcon, InstagramIcon, TwitterIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-porcelain-paper/15 flex items-center justify-center hover:border-copper-glow hover:text-copper-glow transition-colors duration-300"
                  aria-label="Social link"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label-tag text-copper-glow mb-5">Shop</h3>
            <ul className="space-y-3">
              <li><Link to="/products" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">All Products</Link></li>
              <li><Link to="/products?category=Cleansers" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">Cleansers</Link></li>
              <li><Link to="/products?category=Serums" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">Serums</Link></li>
              <li><Link to="/products?category=Moisturizers" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">Moisturizers</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h3 className="label-tag text-copper-glow mb-5">Company</h3>
            <ul className="space-y-3">
              <li><Link to="/about" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">About Us</Link></li>
              <li><Link to="/contact" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">Contact</Link></li>
              <li><Link to="/faq" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">FAQ</Link></li>
              <li><Link to="/account" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">Account</Link></li>
              <li><Link to="/favorites" className="text-porcelain-paper/65 hover:text-porcelain-paper transition-colors">Wishlist</Link></li>
            </ul>
          </div>

          <div className="lg:col-span-3">
            <h3 className="label-tag text-copper-glow mb-5">Stay in the loop</h3>
            <p className="text-porcelain-paper/60 text-sm mb-4">Formulation notes, restocks, and early access — no more than twice a month.</p>
            <form className="flex items-center border-b border-porcelain-paper/25 focus-within:border-copper-glow transition-colors pb-2" onSubmit={e => e.preventDefault()}>
              <input
                type="email"
                placeholder="your@email.com"
                aria-label="Email address"
                className="bg-transparent flex-grow text-porcelain-paper placeholder:text-porcelain-paper/35 focus:outline-none text-sm"
              />
              <button type="submit" aria-label="Subscribe" className="text-copper-glow hover:translate-x-0.5 transition-transform">
                <ArrowUpRightIcon size={20} />
              </button>
            </form>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-porcelain-paper/45">
          <p className="font-mono">&copy; {new Date().getFullYear()} GLOWSKIN LABS — ALL RIGHTS RESERVED</p>
          <div className="flex gap-6 font-mono">
            <a href="#" className="hover:text-porcelain-paper/80">PRIVACY</a>
            <a href="#" className="hover:text-porcelain-paper/80">TERMS</a>
            <a href="#" className="hover:text-porcelain-paper/80">SHIPPING</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
