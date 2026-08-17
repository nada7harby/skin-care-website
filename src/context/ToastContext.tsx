import React, { createContext, useContext, useMemo, useState } from 'react';
import { CheckCircleIcon, InfoIcon, TriangleAlertIcon, XIcon } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info';

interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

interface ToastContextType {
  notify: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const notify = (message: string, type: ToastType = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    window.setTimeout(() => setToasts(prev => prev.filter(toast => toast.id !== id)), 3200);
  };

  const value = useMemo(() => ({ notify }), []);

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="fixed right-4 top-4 z-[80] flex w-[min(24rem,calc(100vw-2rem))] flex-col gap-3" aria-live="polite">
        {toasts.map(toast => {
          const Icon = toast.type === 'success' ? CheckCircleIcon : toast.type === 'error' ? TriangleAlertIcon : InfoIcon;
          const tone = toast.type === 'success' ? 'text-sage' : toast.type === 'error' ? 'text-rust' : 'text-copper';
          return (
            <div key={toast.id} className="flex items-start gap-3 rounded-xl border border-porcelain-line bg-porcelain-paper p-4 shadow-card">
              <Icon size={18} className={`${tone} mt-0.5 shrink-0`} />
              <p className="flex-1 text-sm text-ink">{toast.message}</p>
              <button onClick={() => setToasts(prev => prev.filter(item => item.id !== toast.id))} aria-label="Dismiss notification" className="text-ink-soft hover:text-ink">
                <XIcon size={15} />
              </button>
            </div>
          );
        })}
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
};
