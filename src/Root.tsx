import { App } from './App';
import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './modules/HomePage';
import { Suspense } from 'react';
import { FavouritesProvider } from './components/Favourites/FavouritesContext';
import DetailsPage from './modules/DetailsPage';
import CatalogPage from './modules/CatalogPage';
import FavouritesPage from './modules/FavouritesPage';
import { Loader } from './components/Loader/Loader';
// import Register from './components/Register/Register';

export const Root: React.FC = () => {
  return (
    <FavouritesProvider>
      <Router>
        <Routes>
          <Route path='/' element={<App />}>
            <Route
              index
              element={
                <Suspense fallback={<Loader />}>
                  <HomePage />
                </Suspense>
              }
            />
            <Route
              path='favourites'
              element={
                <Suspense fallback={<Loader />}>
                  <FavouritesPage />
                </Suspense>
              }
            />
            <Route
              path='product/:productId'
              element={
                <Suspense fallback={<Loader />}>
                  <DetailsPage />
                </Suspense>
              }
            />
            <Route
              path='catalog'
              element={
                <Suspense fallback={<Loader />}>
                  <CatalogPage />
                </Suspense>
              }
            />
            {/* <Route
              path='register'
              element={
                <Suspense fallback={<Loader />}>
                  <Register />
                </Suspense>
              }
            /> */}
          </Route>
        </Routes>
      </Router>
    </FavouritesProvider>
  );
};
