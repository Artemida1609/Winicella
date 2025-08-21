import React from 'react';

// export const ProductDetails = React.lazy(
//   () => import('../components/ProductDetails/ProductDetails'),
// );
const ProductsCatalog = React.lazy(
  () => import('../components/ProductsCatalog/ProductsCatalog'),
);
const PerfectPour = React.lazy(
  () => import('../components/PerfectPour/PerfectPour'),
);
const NewProducts = React.lazy(
  () => import('../components/NewProducts/NewProducts'),
);
const Favourites = React.lazy(
  () => import('../components/Favourites/Favourites'),
);
const Header = React.lazy(() => import('../components/Header/Header'));
const Footer = React.lazy(() => import('../components/Footer/Footer'));
const Main = React.lazy(() => import('../components/Main/Main'));
const HomePage = React.lazy(() => import('../modules/HomePage'));

export const LazyComponents = {
  // ProductDetails,
  ProductsCatalog,
  PerfectPour,
  NewProducts,
  Favourites,
  Header,
  Footer,
  Main,
  HomePage,
};
