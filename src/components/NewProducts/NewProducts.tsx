import React from 'react';
import styles from './NewProducts.module.scss';

const NewProducts: React.FC = () => {
  return (
    <div className={`${styles.new_products_container}`}>
      <img
        src='./img/wines/collection_of_wines_bg.png'
        alt='Wines image'
        className={`${styles.new_products_bg_image}`}
      />
      <h2 className={`${styles.new_products_title}`}>
        2025
        <br />
        New Products
        <br />
        Come Soon!
      </h2>
    </div>
  );
};

export default NewProducts;
