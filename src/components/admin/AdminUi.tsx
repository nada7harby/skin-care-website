import React from 'react';
import { AlertTriangleIcon, SearchIcon, XIcon } from 'lucide-react';

export const adminInputClass = 'w-full rounded-lg border border-porcelain-line bg-porcelain-paper px-3 py-2.5 text-sm text-ink placeholder:text-ink-soft outline-none transition-colors focus:border-copper focus:ring-2 focus:ring-copper/15 dark:border-white/10 dark:bg-white/5 dark:text-white';

export const PageHeader: React.FC<{ title: string; description?: string; action?: React.ReactNode }> = ({ title, description, action }) => (
  <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
    <div>
      <h1 className="font-display text-2xl font-semibold text-ink dark:text-white">{title}</h1>
      {description && <p className="mt-1 max-w-2xl text-sm text-ink-muted dark:text-white/55">{description}</p>}
    </div>
    {action}
  </div>
);

export const StatusBadge: React.FC<{ status: string }> = ({ status }) => {
  const normalized = status.toLowerCase();
  const tone = normalized.includes('paid') || normalized.includes('active') || normalized.includes('published') || normalized.includes('approved') || normalized.includes('delivered') || normalized.includes('in stock')
    ? 'bg-sage/10 text-sage'
    : normalized.includes('pending') || normalized.includes('processing') || normalized.includes('low') || normalized.includes('draft')
      ? 'bg-copper/10 text-copper'
      : normalized.includes('cancel') || normalized.includes('failed') || normalized.includes('out') || normalized.includes('rejected') || normalized.includes('archived')
        ? 'bg-rust/10 text-rust'
        : 'bg-ink/8 text-ink-muted dark:bg-white/10 dark:text-white/65';
  return <span className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${tone}`}>{status}</span>;
};

export const StatCard: React.FC<{ title: string; value: string; helper?: string; icon?: React.ReactNode }> = ({ title, value, helper, icon }) => (
  <div className="rounded-xl border border-porcelain-line bg-porcelain-paper p-5 dark:border-white/10 dark:bg-white/5">
    <div className="flex items-start justify-between gap-3">
      <div>
        <p className="text-sm text-ink-muted dark:text-white/55">{title}</p>
        <p className="mt-2 font-mono text-2xl font-semibold tabular text-ink dark:text-white">{value}</p>
      </div>
      {icon && <div className="rounded-lg bg-copper/10 p-2 text-copper">{icon}</div>}
    </div>
    {helper && <p className="mt-3 text-xs text-ink-soft dark:text-white/40">{helper}</p>}
  </div>
);

export const ChartCard: React.FC<{ title: string; values: number[]; labels?: string[] }> = ({ title, values, labels }) => {
  const max = Math.max(...values, 1);
  return (
    <div className="rounded-xl border border-porcelain-line bg-porcelain-paper p-5 dark:border-white/10 dark:bg-white/5">
      <h3 className="mb-5 font-display text-lg font-semibold text-ink dark:text-white">{title}</h3>
      <div className="flex h-48 items-end gap-2">
        {values.map((value, index) => (
          <div key={index} className="flex flex-1 flex-col items-center gap-2">
            <div className="w-full rounded-t-md bg-copper transition-all" style={{ height: `${Math.max(8, (value / max) * 100)}%` }} title={`${labels?.[index] || index + 1}: ${value}`} />
            {labels && <span className="text-[0.65rem] text-ink-soft dark:text-white/40">{labels[index]}</span>}
          </div>
        ))}
      </div>
    </div>
  );
};

export const SearchInput: React.FC<{ value: string; onChange: (value: string) => void; placeholder?: string }> = ({ value, onChange, placeholder = 'Search...' }) => (
  <label className="flex items-center gap-2 rounded-lg border border-porcelain-line bg-porcelain-paper px-3 py-2.5 dark:border-white/10 dark:bg-white/5">
    <SearchIcon size={16} className="text-ink-soft" />
    <input value={value} onChange={event => onChange(event.target.value)} placeholder={placeholder} className="w-full bg-transparent text-sm outline-none placeholder:text-ink-soft dark:text-white" />
  </label>
);

export const EmptyState: React.FC<{ title: string; message: string }> = ({ title, message }) => (
  <div className="rounded-xl border border-dashed border-porcelain-line bg-porcelain-paper p-10 text-center dark:border-white/15 dark:bg-white/5">
    <p className="font-display text-lg font-semibold text-ink dark:text-white">{title}</p>
    <p className="mt-2 text-sm text-ink-muted dark:text-white/55">{message}</p>
  </div>
);

export const SkeletonRows: React.FC<{ rows?: number }> = ({ rows = 5 }) => (
  <div className="space-y-3">
    {Array.from({ length: rows }).map((_, index) => <div key={index} className="h-12 animate-pulse rounded-lg bg-porcelain-line dark:bg-white/10" />)}
  </div>
);

export const ConfirmDialog: React.FC<{ open: boolean; title: string; message: string; onCancel: () => void; onConfirm: () => void }> = ({ open, title, message, onCancel, onConfirm }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-espresso/55 p-4">
      <div role="dialog" aria-modal="true" className="w-full max-w-md rounded-xl border border-porcelain-line bg-porcelain-paper p-6 shadow-card dark:border-white/10 dark:bg-[#211914]">
        <div className="mb-4 flex items-start gap-3">
          <span className="rounded-lg bg-rust/10 p-2 text-rust"><AlertTriangleIcon size={20} /></span>
          <div>
            <h2 className="font-display text-lg font-semibold text-ink dark:text-white">{title}</h2>
            <p className="mt-1 text-sm text-ink-muted dark:text-white/55">{message}</p>
          </div>
        </div>
        <div className="flex justify-end gap-3">
          <button onClick={onCancel} className="rounded-lg border border-porcelain-line px-4 py-2 text-sm font-semibold hover:border-copper dark:border-white/10">Cancel</button>
          <button onClick={onConfirm} className="rounded-lg bg-rust px-4 py-2 text-sm font-semibold text-white hover:bg-rust/90">Delete</button>
        </div>
      </div>
    </div>
  );
};

export const Drawer: React.FC<{ open: boolean; title: string; onClose: () => void; children: React.ReactNode }> = ({ open, title, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[65]">
      <button className="absolute inset-0 bg-espresso/40" onClick={onClose} aria-label="Close drawer overlay" />
      <aside className="absolute right-0 top-0 h-full w-full max-w-xl overflow-y-auto border-l border-porcelain-line bg-porcelain-paper p-6 shadow-card dark:border-white/10 dark:bg-[#1d1713]">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold text-ink dark:text-white">{title}</h2>
          <button onClick={onClose} className="rounded-lg p-2 hover:bg-porcelain dark:hover:bg-white/7" aria-label="Close drawer"><XIcon size={18} /></button>
        </div>
        {children}
      </aside>
    </div>
  );
};

export const Pagination: React.FC<{ page: number; totalPages: number; onPageChange: (page: number) => void }> = ({ page, totalPages, onPageChange }) => (
  <div className="mt-5 flex items-center justify-between text-sm">
    <span className="text-ink-muted dark:text-white/55">Page {page} of {totalPages}</span>
    <div className="flex gap-2">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)} className="rounded-lg border border-porcelain-line px-3 py-2 disabled:opacity-40 dark:border-white/10">Previous</button>
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)} className="rounded-lg border border-porcelain-line px-3 py-2 disabled:opacity-40 dark:border-white/10">Next</button>
    </div>
  </div>
);
