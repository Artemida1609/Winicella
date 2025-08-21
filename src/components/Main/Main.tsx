import React from 'react';
import styles from './Main.module.scss';

type Props = {
  width: number;
};

const Main: React.FC<Props> = ({ width }) => {
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
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Magnam
          beatae, necessitatibus quo exercitationem iure qui molestiae deleniti
          deserunt, rerum tempore id, itaque modi officia! Necessitatibus vero
          hic ad nulla officia.
        </p>
        <div className={`${styles.main_price_and_button_wrapper}`}>
          <p className={`${styles.main_price}`}>$450</p>
          <button className={`${styles.main_button}`}>Add to Favourites</button>
        </div>
      </div>
    </main>
  );
};

export default Main;
