/* eslint-disable */
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import classNames from 'classnames';

type Props = {
  width: number;
  setActiveAside: (arg: boolean) => void;
};

const Header: React.FC<Props> = ({ width, setActiveAside }) => {
  const handleActiveLink = ({ isActive }: { isActive: boolean }) => {
    return classNames(`${styles.header_nav_item}`, {
      [styles.header_nav_item_active]: isActive,
    });
  };

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
            {/* <NavLink to='/' className={handleActiveLink}>
              CONTACT
            </NavLink> */}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
