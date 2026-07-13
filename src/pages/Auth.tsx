import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';

export const Auth: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  return (
    <div className="min-h-screen bg-porcelain flex items-center justify-center py-32 px-4">
      <div className="max-w-md w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="bg-porcelain-paper border border-porcelain-line rounded-2xl p-8 sm:p-10"
        >
          <div className="text-center mb-8">
            <span className="eyebrow-mono">GlowSkin Account</span>
            <h2 className="text-display-3 font-display font-semibold text-ink mt-1">
              {isLogin ? 'Welcome Back' : 'Create Account'}
            </h2>
          </div>
          <form className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-sm text-ink-muted mb-2 block">Full Name</label>
                <input type="text" className="input" placeholder="Jane Doe" />
              </div>
            )}
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Email</label>
              <input type="email" className="input" placeholder="your@email.com" />
            </div>
            <div>
              <label className="text-sm text-ink-muted mb-2 block">Password</label>
              <input type="password" className="input" placeholder="••••••••" />
            </div>
            {isLogin && (
              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 text-sm text-ink-muted cursor-pointer">
                  <input type="checkbox" className="accent-copper" />
                  Remember me
                </label>
                <a href="#" className="text-sm text-copper hover:underline">Forgot password?</a>
              </div>
            )}
            <Button fullWidth size="lg" type="submit">
              {isLogin ? 'Sign In' : 'Sign Up'}
            </Button>
          </form>

          <div className="mt-7">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-porcelain-line" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-3 bg-porcelain-paper text-ink-soft label-tag">Or continue with</span>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <button className="input flex items-center justify-center gap-2 hover:border-ink/30 transition-colors" type="button">
                <svg className="w-4 h-4" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                  <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                </svg>
                Google
              </button>
              <button className="input flex items-center justify-center gap-2 hover:border-ink/30 transition-colors" type="button">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Facebook
              </button>
            </div>
          </div>

          <div className="mt-7 text-center">
            <button onClick={() => setIsLogin(!isLogin)} className="text-sm text-ink-muted hover:text-ink transition-colors">
              {isLogin ? "Don't have an account? " : 'Already have an account? '}
              <span className="font-medium text-copper">{isLogin ? 'Sign up' : 'Sign in'}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
