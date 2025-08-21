import React from 'react';
import styles from './SideBar.module.scss';
import { Link } from 'react-router-dom';
// import Header from '../Header/Header';

type Props = {
  setActiveAside: (arg: boolean) => void;
};

const SideBar: React.FC<Props> = ({ setActiveAside }) => {
  return (
    <>
      <div className={styles.main_container}>
        <nav className={`${styles.nav_container}`}>
          <div className={`${styles.nav_logo}`}>
            <img
              src='./img/logo/vinicella_logo.png'
              alt='Vinicella Logo'
              className={`${styles.nav_logo_img}`}
            />
            <p className={`${styles.nav_logo_text}`}>Vinicella</p>
          </div>

          <div className={`${styles.nav_close_icon_container}`}>
            <button
              className={`${styles.nav_close_icon_button}`}
              onClick={() => {
                setActiveAside(false);
              }}
            >
              <img
                src='./img/icons/close-icon-dark-theme.svg'
                alt='close icon'
                className={`${styles.nav_close_icon}`}
              />
            </button>
          </div>
        </nav>

        <div className={styles.links_container}>
          <Link to={'/'} className={styles.link}>
            <p
              onClick={() => setActiveAside(false)}
              className={styles.link_text}
            >
              Home
            </p>
          </Link>
          <Link to={'/catalog'} className={styles.link}>
            <p
              onClick={() => setActiveAside(false)}
              className={styles.link_text}
            >
              Catalog
            </p>
          </Link>
          <Link to={'/favourites'} className={styles.link}>
            <p
              onClick={() => setActiveAside(false)}
              className={styles.link_text}
            >
              Favourites
            </p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default SideBar;
