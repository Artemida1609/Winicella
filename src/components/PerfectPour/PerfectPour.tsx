import React from 'react';
import styles from './PerfectPour.module.scss';

const PerfectPour: React.FC = () => {
  return (
    <div className={`${styles.perfect_pour_container}`}>
      {/* <div className={styles.perfect_pour_background}></div> */}
      <img
        src='./img/wines/wine_image_main.png'
        alt='Wine Image'
        className={`${styles.perfect_pour_image}`}
      />
      <span className={`${styles.perfect_pour_image_overlay}`}></span>
      <div className={`${styles.perfect_pour_text_container}`}>
        <h2 className={`${styles.perfect_pour_title}`}>
          Find your perfect pour
        </h2>
        <p className={`${styles.perfect_pour_description}`}>
          Experience the perfect pour with our premium wine selection.
        </p>
      </div>
    </div>
  );
};

export default PerfectPour;
