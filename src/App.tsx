import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { FavoritesProvider } from './context/FavoritesContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
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
export function App() {
  return <CartProvider>
      <FavoritesProvider>
        <BrowserRouter>
          <div className="flex flex-col min-h-screen">
            <Header />
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
                <Route path="/about" element={<InfoPages />} />
                <Route path="/contact" element={<InfoPages />} />
                <Route path="/faq" element={<InfoPages />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </BrowserRouter>
      </FavoritesProvider>
    </CartProvider>;
}