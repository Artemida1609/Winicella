import { App } from './App';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './modules/HomePage';
import { Suspense } from 'react';
import { FavouritesProvider } from './components/Favourites/FavouritesContext';
import DetailsPage from './modules/DetailsPage';
import CatalogPage from './modules/CatalogPage';
import FavouritesPage from './modules/FavouritesPage';

export const Root: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route
              index
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path='favourites'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FavouritesPage />
                </Suspense>
              }
            />
            <Route
              path='product/:productId'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <DetailsPage />
                </Suspense>
              }
            />
            <Route
              path='catalog'
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <CatalogPage />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};
