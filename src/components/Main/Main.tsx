import React, { useEffect, useState } from 'react';
import styles from './Main.module.scss';
import { Wine } from '../../types/Wine';
import { Loader } from '../Loader/Loader';
import { useOutletContext } from 'react-router-dom';
import { useFavourites } from '../Favourites/FavouritesContext';
import classNames from 'classnames';

type Props = {
  width: number;
};

const Main: React.FC<Props> = ({ width }) => {
  const { wines } = useOutletContext<{ wines: Wine[] }>();
  const [expensiveItem, setExpensiveItem] = useState<Wine>();
  const { toggleFavourite, favourites } = useFavourites();
  const isLiked = favourites.some(fav => fav.id === expensiveItem?.id);

  useEffect(() => {
    if (wines && wines.length > 0) {
      const expItem = wines.find(elem => elem.price === 300);

      setExpensiveItem(expItem);
    }
  }, [wines]);

  const handleAddToFav = () => {
    if (expensiveItem) {
      toggleFavourite(expensiveItem);
    }
  };

  if (!wines || wines.length === 0) {
    return (
      <div className={styles.loader_container}>
        <Loader />
      </div>
    );
  }

  return (
    <main className={`${styles.main_container}`}>
      {width >= 1200 && <span className={`${styles.main_light}`}></span>}
      {width >= 1200 && <span className={`${styles.main_light_2}`}></span>}
      <div className={`${styles.main_header}`}>
        <h1 className={`${styles.main_title}`}>Wine dreams come true</h1>
        <div className={`${styles.main_subtitle_wrapper}`}>
          <span className={`${styles.main_subtitle}`}>
            Wine Library Legendary
          </span>
        </div>
      </div>
      <div className={`${styles.main_image_container}`}>
        <img
          src='./img/wines/wine_image_main.png'
          alt='Wine Image'
          className={`${styles.main_image}`}
        />
      </div>
      <div className={`${styles.main_info_container}`}>
        <p className={`${styles.main_description}`}>
          {expensiveItem?.description}
        </p>
        <div className={`${styles.main_price_and_button_wrapper}`}>
          <p className={`${styles.main_price}`}>${expensiveItem?.price}</p>
          <button
            className={classNames(`${styles.main_button}`, {
              [styles.liked]: isLiked,
            })}
            onClick={handleAddToFav}
          >
            {!isLiked ? 'Add to Favourites' : 'Added to Favourites'}
          </button>
        </div>
      </div>
    </main>
  );
};

export default Main;
