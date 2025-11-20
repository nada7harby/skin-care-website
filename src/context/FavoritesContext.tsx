import React, { useEffect, useState, createContext, useContext } from 'react';
import { Product } from './CartContext';
interface FavoritesContextType {
  favorites: Product[];
  addToFavorites: (product: Product) => void;
  removeFromFavorites: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
  getFavoritesCount: () => number;
}
const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);
export const FavoritesProvider: React.FC<{
  children: React.ReactNode;
}> = ({
  children
}) => {
  const [favorites, setFavorites] = useState<Product[]>([]);
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favorites');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
  }, []);
  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);
  const addToFavorites = (product: Product) => {
    setFavorites(prev => {
      if (prev.find(p => p.id === product.id)) {
        return prev;
      }
      return [...prev, product];
    });
  };
  const removeFromFavorites = (productId: number) => {
    setFavorites(prev => prev.filter(p => p.id !== productId));
  };
  const isFavorite = (productId: number) => {
    return favorites.some(p => p.id === productId);
  };
  const getFavoritesCount = () => {
    return favorites.length;
  };
  return <FavoritesContext.Provider value={{
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    getFavoritesCount
  }}>
      {children}
    </FavoritesContext.Provider>;
};
export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};