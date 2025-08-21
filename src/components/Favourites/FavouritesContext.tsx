import React, { ReactNode, useEffect, useState } from 'react';
import { Wine } from '../../types/Wine';

type FavouritesProps = {
  favourites: Wine[];
  toggleFavourite: (arg: Wine) => void;
};

const FavouritesContext = React.createContext<FavouritesProps | undefined>(
  undefined,
);

export const FavouritesProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [favourites, setFavourites] = useState<Wine[]>(() => {
    const sortedFavourites = localStorage.getItem('favourites');

    return sortedFavourites ? JSON.parse(sortedFavourites) : [];
  });

  useEffect(() => {
    localStorage.setItem('favourites', JSON.stringify(favourites));
  }, [favourites]);

  const toggleFavourite = (product: Wine) => {
    setFavourites(prevFavourites => {
      const isFavourite = prevFavourites.some(prev => prev.id === product.id);

      if (isFavourite) {
        return prevFavourites.filter(fav => fav.id !== product.id);
      }

      return [...prevFavourites, product];
    });
  };

  return (
    <FavouritesContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouritesContext.Provider>
  );
};

export const useFavourites = () => {
  const context = React.useContext(FavouritesContext);

  if (!context) {
    throw new Error('useFavourites must be used within a FavoritesProvider');
  }

  return context;
};
