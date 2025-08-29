/* eslint-disable */
import { NavLink, useOutletContext } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';
// import Register from '../Register/Register';
// import { useState } from 'react';

type Props = {
  width: number;
  setActiveAside: (arg: boolean) => void;

};

const Header: React.FC<Props> = ({ width, setActiveAside }) => {
  const { setActiveRegModal, isRegistered, setIsRegistered, isLoggedIn, setIsLoggedIn } = useOutletContext<{
    setActiveRegModal: (arg: boolean) => void;
    isRegistered: boolean;
    setIsRegistered: (arg: boolean) => void;
    isLoggedIn: boolean;
    setIsLoggedIn: (arg: boolean) => void;
  }>();
  const handleActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.header_nav_item}`, {
      [styles.header_nav_item_active]: isActive,
    });
  };

  const handleRegisterLink = () => {
    setActiveRegModal(true);
  };

  const handleLogout = () => {
    setIsRegistered(false);
    setIsLoggedIn(false);
  }

  return (
    <>
      {width < 640 && (
        <div className={`${styles.header_container}`}>
          <div className={`${styles.header_logo}`}>
            <img
              src='./img/logo/vinicella_logo.png'
              alt='Vinicella Logo'
              className={`${styles.header_logo_img}`}
            />
            <p className={`${styles.header_logo_text}`}>Vinicella</p>
          </div>
          <div className={`${styles.header_burger_menu_container}`}>
            <button
              className={`${styles.header_burger_menu_button}`}
              onClick={() => setActiveAside(true)}
            >
              <img
                src='./img/icons/burger-menu-dark-theme.svg'
                alt='burger menu icon'
                className={`${styles.header_burger_menu_icon}`}
              />
            </button>
          </div>
        </div>
      )}
      {width >= 640 && (
        <div className={`${styles.header_container}`}>
          <div className={`${styles.header_logo}`}>
            <img
              src='./img/logo/vinicella_logo.png'
              alt='Vinicella Logo'
              className={`${styles.header_logo_img}`}
            />
            <p className={`${styles.header_logo_text}`}>Vinicella</p>
          </div>
          <div className={`${styles.header_navbar}`}>
            <NavLink to='/' className={handleActiveLink}>
              HOME
            </NavLink>
            <NavLink to='/catalog' className={handleActiveLink}>
              CATALOG
            </NavLink>
            <NavLink to='/favourites' className={handleActiveLink}>
              FAVOURITES
            </NavLink>
            {!isRegistered && !isLoggedIn && (
              <a className={styles.profile_icon} onClick={handleRegisterLink}>
                <img src='./img/icons/profile-icon.png' alt='profile icon' />
              </a>
            )}
            {isRegistered && isLoggedIn && (
              <p className={styles.logout_btn} onClick={handleLogout}>Logout</p>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
