import React, { useEffect, useMemo, useState } from 'react';
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import {
  ActivityIcon, BellIcon, BookOpenIcon, BoxesIcon, ChartNoAxesCombinedIcon, ChevronDownIcon,
  ClipboardListIcon, ContactIcon, FileTextIcon, HomeIcon, LayoutDashboardIcon, LogOutIcon,
  MailIcon, MenuIcon, MoonIcon, PackageIcon, PercentIcon, SearchIcon, SettingsIcon,
  ShoppingBagIcon, SparklesIcon, StarIcon, StoreIcon, SunIcon, TagsIcon, TicketIcon,
  UserCogIcon, UsersIcon, XIcon
} from 'lucide-react';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { useStoreData } from '../../context/StoreDataContext';

const navGroups = [
  {
    title: 'Operations',
    items: [
      { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboardIcon },
      { label: 'Products', to: '/admin/products', icon: PackageIcon },
      { label: 'Categories', to: '/admin/categories', icon: TagsIcon },
      { label: 'Brands', to: '/admin/brands', icon: SparklesIcon },
      { label: 'Inventory', to: '/admin/inventory', icon: BoxesIcon },
      { label: 'Orders', to: '/admin/orders', icon: ClipboardListIcon },
      { label: 'Customers', to: '/admin/customers', icon: UsersIcon },
    ],
  },
  {
    title: 'Growth',
    items: [
      { label: 'Reviews', to: '/admin/reviews', icon: StarIcon },
      { label: 'Coupons', to: '/admin/coupons', icon: PercentIcon },
      { label: 'Bundles', to: '/admin/bundles', icon: TicketIcon },
      { label: 'Blog', to: '/admin/blog', icon: BookOpenIcon },
      { label: 'Home Content', to: '/admin/content/home', icon: HomeIcon },
      { label: 'About Content', to: '/admin/content/about', icon: FileTextIcon },
      { label: 'FAQ Content', to: '/admin/content/faq', icon: ContactIcon },
    ],
  },
  {
    title: 'System',
    items: [
      { label: 'Messages', to: '/admin/messages', icon: MailIcon },
      { label: 'Newsletter', to: '/admin/newsletter', icon: ContactIcon },
      { label: 'Notifications', to: '/admin/notifications', icon: BellIcon },
      { label: 'Reports', to: '/admin/reports', icon: ChartNoAxesCombinedIcon },
      { label: 'Settings', to: '/admin/settings', icon: SettingsIcon },
      { label: 'Admin Users', to: '/admin/users', icon: UserCogIcon },
      { label: 'Activity Log', to: '/admin/activity-log', icon: ActivityIcon },
    ],
  },
];

const labelFromPath = (segment: string) => segment.split('-').map(part => part.charAt(0).toUpperCase() + part.slice(1)).join(' ');

export const AdminShell: React.FC = () => {
  const { admin, logout } = useAdminAuth();
  const { notifications, messages } = useStoreData();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [accountOpen, setAccountOpen] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem('adminTheme') === 'dark');
  const navigate = useNavigate();
  const location = useLocation();
  const unread = notifications.filter(item => !item.read).length;
  const newMessages = messages.filter(item => item.status === 'New').length;

  useEffect(() => {
    localStorage.setItem('adminTheme', dark ? 'dark' : 'light');
  }, [dark]);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const breadcrumbs = useMemo(() => {
    const parts = location.pathname.split('/').filter(Boolean).slice(1);
    return ['Admin', ...parts.map(labelFromPath)];
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  return (
    <div className={`${dark ? 'admin-dark' : ''} min-h-screen bg-[#f4f0ea] text-ink dark:bg-[#15110f] dark:text-porcelain-paper`}>
      <aside className={`fixed inset-y-0 left-0 z-50 w-72 border-r border-porcelain-line bg-porcelain-paper transition-transform duration-200 dark:border-white/10 dark:bg-[#1d1713] lg:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b border-porcelain-line px-5 py-4 dark:border-white/10">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5">
              <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-copper text-porcelain-paper"><StoreIcon size={18} /></span>
              <span>
                <span className="block font-display text-lg font-semibold">GlowSkin</span>
                <span className="block text-xs text-ink-soft dark:text-white/45">Admin Control</span>
              </span>
            </Link>
            <button className="lg:hidden" onClick={() => setSidebarOpen(false)} aria-label="Close admin menu"><XIcon size={20} /></button>
          </div>
          <nav className="flex-1 overflow-y-auto px-3 py-4">
            {navGroups.map(group => (
              <div key={group.title} className="mb-5">
                <p className="px-3 pb-2 text-[0.68rem] font-semibold uppercase tracking-[0.12em] text-ink-soft dark:text-white/35">{group.title}</p>
                <div className="space-y-1">
                  {group.items.map(({ label, to, icon: Icon }) => (
                    <NavLink
                      key={to}
                      to={to}
                      className={({ isActive }) => `flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${isActive ? 'bg-copper text-porcelain-paper' : 'text-ink-muted hover:bg-porcelain hover:text-ink dark:text-white/65 dark:hover:bg-white/7 dark:hover:text-white'}`}
                    >
                      <span className="flex items-center gap-2.5"><Icon size={16} />{label}</span>
                      {to === '/admin/messages' && newMessages > 0 && <span className="rounded-full bg-rust px-1.5 py-0.5 text-[0.62rem] text-white">{newMessages}</span>}
                    </NavLink>
                  ))}
                </div>
              </div>
            ))}
          </nav>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-40 bg-espresso/35 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="lg:pl-72">
        <header className="sticky top-0 z-30 border-b border-porcelain-line bg-porcelain-paper/92 backdrop-blur dark:border-white/10 dark:bg-[#15110f]/90">
          <div className="flex min-h-[72px] items-center gap-4 px-4 sm:px-6">
            <button className="lg:hidden" onClick={() => setSidebarOpen(true)} aria-label="Open admin menu"><MenuIcon size={22} /></button>
            <div className="hidden flex-1 items-center gap-3 rounded-lg border border-porcelain-line bg-porcelain px-3 py-2.5 dark:border-white/10 dark:bg-white/5 md:flex">
              <SearchIcon size={17} className="text-ink-soft" />
              <input className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-soft dark:text-white" placeholder="Search products, orders, customers..." />
            </div>
            <Link to="/" className="inline-flex items-center gap-2 rounded-lg border border-porcelain-line px-3 py-2 text-sm font-medium hover:border-copper hover:text-copper dark:border-white/10">
              <ShoppingBagIcon size={16} />
              Visit Store
            </Link>
            <button onClick={() => setDark(prev => !prev)} className="rounded-lg border border-porcelain-line p-2.5 hover:border-copper dark:border-white/10" aria-label="Toggle admin theme">
              {dark ? <SunIcon size={17} /> : <MoonIcon size={17} />}
            </button>
            <Link to="/admin/notifications" className="relative rounded-lg border border-porcelain-line p-2.5 hover:border-copper dark:border-white/10" aria-label="Notifications">
              <BellIcon size={17} />
              {unread > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-rust px-1 text-[0.62rem] text-white">{unread}</span>}
            </Link>
            <div className="relative">
              <button onClick={() => setAccountOpen(prev => !prev)} className="flex items-center gap-2 rounded-lg border border-porcelain-line px-2.5 py-2 dark:border-white/10">
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-copper/10 text-sm font-semibold text-copper">{admin?.name.charAt(0)}</span>
                <span className="hidden text-left sm:block">
                  <span className="block text-sm font-semibold">{admin?.name}</span>
                  <span className="block text-xs text-ink-soft dark:text-white/45">{admin?.role}</span>
                </span>
                <ChevronDownIcon size={15} />
              </button>
              {accountOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl border border-porcelain-line bg-porcelain-paper p-2 shadow-card dark:border-white/10 dark:bg-[#211914]">
                  <Link to="/admin/users" className="block rounded-lg px-3 py-2 text-sm hover:bg-porcelain dark:hover:bg-white/7">Account settings</Link>
                  <button onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-rust hover:bg-rust/10">
                    <LogOutIcon size={15} /> Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 border-t border-porcelain-line px-4 py-2 text-xs text-ink-soft dark:border-white/10 dark:text-white/45 sm:px-6">
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={`${crumb}-${index}`}>
                {index > 0 && <span>/</span>}
                <span className={index === breadcrumbs.length - 1 ? 'text-ink dark:text-white' : ''}>{crumb}</span>
              </React.Fragment>
            ))}
          </div>
        </header>
        <main className="px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
