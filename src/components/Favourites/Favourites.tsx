import ProductCard from '../ProductCard/ProductCard';
import { useFavourites } from './FavouritesContext';
import styles from './Favourites.module.scss';
import { useNavigate } from 'react-router-dom';

const Favourites: React.FC = () => {
  const { favourites } = useFavourites();
  const navigate = useNavigate();

  const handleScrollToTop = () => window.scrollTo(0, 0);

  const handleBackButtonClick = () => {
    navigate('../');
  };

  return (
    <>
      <section className={`${styles.favourites_container}`}>
        <div
          className={styles.details_back_button}
          onClick={handleBackButtonClick}
        >
          <img
            src='./img/icons/dark-theme-arrow.svg'
            alt='arrow left'
            className={styles.details_back_button_icon}
          />
          <span className={styles.details_back_button_text}>Back</span>
        </div>
        <h1 className={`${styles.favourites_title}`}>Favourites</h1>
        <p className={`${styles.favourites_count}`}>
          {favourites.length} items
        </p>
        <div className={`${styles.favourites_list}`}>
          {favourites.map(fav => {
            return <ProductCard key={fav.id} product={fav} onPage={false} />;
          })}
        </div>
      </section>
      <footer className={`${styles.favourites_footer}`}>
        <div className={`${styles.favourites_footer_logo}`}>
          <img
            src='./img/logo/vinicella_logo.png'
            alt='Vinicella Logo'
            className={`${styles.favourites_footer_logo_img}`}
          />
        </div>
        <p className={`${styles.favourites_footer_text}`}>© 2025 Winicella</p>
        <div className={`${styles.favourites_footer_back_to_top_cont}`}>
          <p className={`${styles.favourites_footer_back_to_top_text}`}>
            Back to Top
          </p>
          <button
            className={`${styles.favourites_footer_button}`}
            onClick={handleScrollToTop}
          >
            <img
              src='./img/icons/dark-theme-arrow.svg'
              alt='arrow up'
              className={`${styles.favourites_footer_button_icon}`}
            />
          </button>
        </div>
      </footer>
    </>
  );
};

export default Favourites;
