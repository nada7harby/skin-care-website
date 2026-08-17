import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeOffIcon, LockIcon, MailIcon } from 'lucide-react';
import { Button } from '../components/ui/Button';
import { useAdminAuth } from '../context/AdminAuthContext';
import { useToast } from '../context/ToastContext';

export const AdminLogin: React.FC = () => {
  const { login, isAuthenticated } = useAdminAuth();
  const { notify } = useToast();
  const navigate = useNavigate();
  const [email, setEmail] = useState('admin@glowskin.com');
  const [password, setPassword] = useState('admin123');
  const [remember, setRemember] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (isAuthenticated) return <Navigate to="/admin/dashboard" replace />;

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError('');
    if (!email.includes('@')) {
      setError('Please enter a valid admin email.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setLoading(true);
    try {
      await login(email, password, remember);
      notify('Admin signed in successfully.');
      navigate('/admin/dashboard');
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unable to sign in.';
      setError(message);
      notify(message, 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-espresso px-4 py-10 text-porcelain-paper">
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-6xl items-center">
        <div className="grid w-full grid-cols-1 overflow-hidden rounded-2xl border border-porcelain-paper/10 bg-[#201813] md:grid-cols-2">
          <section className="relative hidden min-h-[620px] overflow-hidden md:block">
            <img src="https://images.pexels.com/photos/7428104/pexels-photo-7428104.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="GlowSkin lab bottles" className="absolute inset-0 h-full w-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-t from-espresso via-espresso/55 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <span className="label-tag text-copper-glow">Admin Studio</span>
              <h1 className="mt-3 font-display text-4xl font-semibold leading-tight">Operate every formula, order, and customer moment from one place.</h1>
            </div>
          </section>
          <section className="flex items-center justify-center p-6 sm:p-10">
            <div className="w-full max-w-md">
              <div className="mb-8">
                <span className="label-tag text-copper-glow">GlowSkin Admin</span>
                <h2 className="mt-2 font-display text-3xl font-semibold">Sign in</h2>
                <p className="mt-2 text-sm text-porcelain-paper/55">Mock credentials are prefilled for local development.</p>
              </div>
              <form onSubmit={submit} className="space-y-4">
                <label className="block">
                  <span className="mb-2 block text-sm text-porcelain-paper/65">Email</span>
                  <span className="flex items-center gap-2 rounded-lg border border-porcelain-paper/15 bg-porcelain-paper/5 px-3 py-3 focus-within:border-copper-glow focus-within:ring-2 focus-within:ring-copper-glow/15">
                    <MailIcon size={17} className="text-copper-glow" />
                    <input value={email} onChange={event => setEmail(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-porcelain-paper/35" placeholder="admin@glowskin.com" />
                  </span>
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm text-porcelain-paper/65">Password</span>
                  <span className="flex items-center gap-2 rounded-lg border border-porcelain-paper/15 bg-porcelain-paper/5 px-3 py-3 focus-within:border-copper-glow focus-within:ring-2 focus-within:ring-copper-glow/15">
                    <LockIcon size={17} className="text-copper-glow" />
                    <input type={showPassword ? 'text' : 'password'} value={password} onChange={event => setPassword(event.target.value)} className="w-full bg-transparent text-sm outline-none placeholder:text-porcelain-paper/35" />
                    <button type="button" onClick={() => setShowPassword(prev => !prev)} aria-label={showPassword ? 'Hide password' : 'Show password'} className="text-porcelain-paper/60 hover:text-copper-glow">
                      {showPassword ? <EyeOffIcon size={17} /> : <EyeIcon size={17} />}
                    </button>
                  </span>
                </label>
                <div className="flex items-center justify-between text-sm">
                  <label className="flex items-center gap-2 text-porcelain-paper/65">
                    <input type="checkbox" checked={remember} onChange={event => setRemember(event.target.checked)} className="accent-copper" />
                    Remember me
                  </label>
                  <button type="button" onClick={() => notify('Password reset is mocked for this local build.', 'info')} className="text-copper-glow hover:underline">Forgot password?</button>
                </div>
                {error && <p className="rounded-lg border border-rust/30 bg-rust/10 px-3 py-2 text-sm text-rust">{error}</p>}
                <Button type="submit" fullWidth size="lg" disabled={loading}>{loading ? 'Signing in...' : 'Sign In'}</Button>
              </form>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
