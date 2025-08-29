import React from 'react';
import styles from './ProductsCatalog.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { Wine } from '../../types/Wine';
import { useOutletContext } from 'react-router-dom';
import { Loader } from '../Loader/Loader';

const ProductsCatalog: React.FC = () => {
  const { wines } = useOutletContext<{
    wines: Wine[];
  }>();

  if (!wines || wines.length === 0) {
    return (
      <div className={styles.loader_container}>
        <Loader />
      </div>
    );
  }

  return (
    <div className={`${styles.catalog_container}`}>
      <h2 className={`${styles.catalog_title}`}>Our Products</h2>
      <div className={`${styles.catalog_items}`}>
        {wines.map((wine: Wine) => (
          <ProductCard key={wine.id} product={wine} onPage={false} />
        ))}
      </div>
    </div>
  );
};

export default ProductsCatalog;
