import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { StoreDataProvider } from './context/StoreDataContext';
import { AdminAuthProvider, useAdminAuth } from './context/AdminAuthContext';
import { ToastProvider } from './context/ToastContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { AdminShell } from './components/admin/AdminShell';
import { Home } from './pages/Home';
import { ProductList } from './pages/ProductList';
import { ProductDetails } from './pages/ProductDetails';
import { Cart } from './pages/Cart';
import { Favorites } from './pages/Favorites';
import { Checkout } from './pages/Checkout';
import { Profile } from './pages/Profile';
import { Auth } from './pages/Auth';
import { SearchResults } from './pages/SearchResults';
import { InfoPages } from './pages/InfoPages';
import { AdminLogin } from './pages/AdminLogin';
import { BlogList, BlogDetails } from './pages/Blog';
import {
  ActivityLogPage,
  AdminIndex,
  AdminUsersPage,
  BlogAdminPage,
  BrandsPage,
  BundlesPage,
  CategoriesPage,
  ContentAboutPage,
  ContentFaqPage,
  ContentHomePage,
  CouponsPage,
  CustomerDetailsPage,
  CustomersPage,
  DashboardPage,
  InventoryPage,
  MessagesPage,
  NewsletterPage,
  NotificationsPage,
  OrderDetailsPage,
  OrdersPage,
  ProductFormPage,
  ProductsPage,
  ReportsPage,
  ReviewsPage,
  SettingsPage,
} from './pages/admin/AdminPages';

const ProtectedAdminRoute = () => {
  const { isAuthenticated } = useAdminAuth();
  return isAuthenticated ? <AdminShell /> : <Navigate to="/admin/login" replace />;
};

const AppChrome = () => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');
  return (
    <div className="flex flex-col min-h-screen">
      {!isAdmin && <Header />}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<ProductList />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/account" element={<Profile />} />
          <Route path="/login" element={<Auth />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/blog" element={<BlogList />} />
          <Route path="/blog/:slug" element={<BlogDetails />} />
          <Route path="/about" element={<InfoPages />} />
          <Route path="/contact" element={<InfoPages />} />
          <Route path="/faq" element={<InfoPages />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<ProtectedAdminRoute />}>
            <Route index element={<AdminIndex />} />
            <Route path="dashboard" element={<DashboardPage />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/create" element={<ProductFormPage />} />
            <Route path="products/:id/edit" element={<ProductFormPage />} />
            <Route path="categories" element={<CategoriesPage />} />
            <Route path="brands" element={<BrandsPage />} />
            <Route path="inventory" element={<InventoryPage />} />
            <Route path="orders" element={<OrdersPage />} />
            <Route path="orders/:id" element={<OrderDetailsPage />} />
            <Route path="customers" element={<CustomersPage />} />
            <Route path="customers/:id" element={<CustomerDetailsPage />} />
            <Route path="reviews" element={<ReviewsPage />} />
            <Route path="coupons" element={<CouponsPage />} />
            <Route path="content/home" element={<ContentHomePage />} />
            <Route path="content/about" element={<ContentAboutPage />} />
            <Route path="content/faq" element={<ContentFaqPage />} />
            <Route path="bundles" element={<BundlesPage />} />
            <Route path="blog" element={<BlogAdminPage />} />
            <Route path="messages" element={<MessagesPage />} />
            <Route path="newsletter" element={<NewsletterPage />} />
            <Route path="notifications" element={<NotificationsPage />} />
            <Route path="reports" element={<ReportsPage />} />
            <Route path="settings" element={<SettingsPage />} />
            <Route path="users" element={<AdminUsersPage />} />
            <Route path="activity-log" element={<ActivityLogPage />} />
          </Route>
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
};

export function App() {
  return <StoreDataProvider>
      <ToastProvider>
        <AdminAuthProvider>
          <CartProvider>
            <FavoritesProvider>
              <BrowserRouter>
                <AppChrome />
              </BrowserRouter>
            </FavoritesProvider>
          </CartProvider>
        </AdminAuthProvider>
      </ToastProvider>
    </StoreDataProvider>;
}
