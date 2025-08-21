/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable jsx-a11y/label-has-for */
import React from 'react';
import styles from './ProductCard.module.scss';
import { Wine } from '../../types/Wine';
import { useFavourites } from '../Favourites/FavouritesContext';
import { Link } from 'react-router-dom';
import classNames from 'classnames';

type Props = {
  product: Wine;
  onPage: boolean;
};

const ProductCard: React.FC<Props> = ({ product, onPage }) => {
  const activeLikeBtn = './img/icons/card-selected-like.svg';
  const inactiveLikeBtn = './img/icons/card-default-like.svg';
  const { favourites, toggleFavourite } = useFavourites();
  const isLiked = favourites.some(fav => fav.id === product.id);

  const handleLikeClick = () => {
    toggleFavourite(product);
  };

  return (
    <div
      className={classNames({
        [styles.product_card]: true,
        [styles.on_page]: onPage,
      })}
    >
      <h2 className={`${styles.product_title}`}>{product.title}</h2>
      <Link to={`/product/${product.id}`}>
        <img
          src='./img/wines/wine_image_main.png'
          alt='Wine Image'
          className={`${styles.product_image}`}
        />
      </Link>
      <Link
        className={`${styles.product_description}`}
        to={`/product/${product.id}`}
      >
        {String(product.description)}
      </Link>
      <div className={`${styles.product_price_container}`}>
        <span className={`${styles.product_price}`}>{product.price}$</span>
        <button
          className={`${styles.product_like_button}`}
          onClick={handleLikeClick}
        >
          <img
            src={isLiked ? activeLikeBtn : inactiveLikeBtn}
            alt='Heart emoji'
            className={`${styles.product_like_icon}`}
          />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
