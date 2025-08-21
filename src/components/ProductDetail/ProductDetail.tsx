import { useNavigate, useOutletContext } from 'react-router-dom';
import { Wine } from '../../types/Wine';
import Header from '../Header/Header';
import styles from './ProductDetail.module.scss';
import { useFavourites } from '../Favourites/FavouritesContext';
import { useState } from 'react';
import classNames from 'classnames';
import ProductCard from '../ProductCard/ProductCard';
import Footer from '../Footer/Footer';

type Props = {
  product: Wine;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  const activeLikeBtn = './img/icons/card-selected-like.svg';
  const inactiveLikeBtn = './img/icons/card-default-like.svg';

  const { width, wines, setActiveAside } = useOutletContext<{
    width: number;
    wines: Wine[];
    setActiveAside: (arg: boolean) => void;
  }>();

  const { favourites, toggleFavourite } = useFavourites();
  const navigate = useNavigate();

  const isLiked = favourites.some(item => item.id === product.id);
  const similarProducts = wines.filter(
    item => item.id !== product.id && item.wine_type === product.wine_type,
  );
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLikeClick = () => {
    toggleFavourite(product);
  };

  const handleMoreInfoClick = () => {
    setIsExpanded(!isExpanded);
  };

  const handleBackButtonClick = () => {
    navigate('../');
  };

  return (
    <>
      <Header width={width} setActiveAside={setActiveAside} />
      <section className={styles.details_main_container}>
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
        <div className={styles.details_title_container}>
          <h1 className={styles.details_title}>{product.title}</h1>

          <div className={styles.details_img_and_info_cover}>
            <img
              src={'./img/wines/wine_image_main.png'}
              alt={product.title}
              className={styles.details_image}
            />
            <div className={styles.details_info_cover}>
              <div className={`${styles.product_price_container}`}>
                <span className={`${styles.product_price}`}>
                  {product.price}$
                </span>
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

              <div className={`${styles.main_info_container}`}>
                {[
                  { label: 'Wine Type:', value: `${product.wine_type}` },
                  { label: 'Country:', value: `${product.country}` },
                  { label: 'Capacity:', value: `${product.capacity} ml` },
                  { label: 'ABV:', value: `${product.abv} %` },
                ].map((item, index) => (
                  <div key={index} className={styles.main_info_sub_container}>
                    {item.label && (
                      <p className={styles.main_info_label}>{item.label}</p>
                    )}
                    <p className={styles.main_info_value}>{item.value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <p className={`${styles.about_text}`}>About</p>

          <p className={`${styles.description}`}>{product.description}</p>

          <div className={styles.more_info_container}>
            <div
              className={styles.more_info_trigger}
              onClick={handleMoreInfoClick}
            >
              <p className={`${styles.more_info}`}>More Info</p>
              <img
                src='./img/icons/dark-theme-arrow.svg'
                alt='arrow down'
                className={styles.arrow_down}
              />
            </div>
            <div className={styles.more_info_content}>
              {[
                { label: 'Vintage:', value: product.vintage },
                { label: 'Region:', value: `${product.region}` },
                { label: 'Grape:', value: `${product.grape}` },
                {
                  label: 'Characteristics:',
                  value: `${product.characteristics}`,
                },
                { label: 'Style:', value: `${product.style}` },
              ].map((item, index) => (
                <div
                  key={index}
                  className={classNames(styles.more_info_description, {
                    [styles.expanded]: isExpanded,
                  })}
                >
                  <p className={styles.main_info_label}>{item.label}</p>
                  <p className={styles.main_info_value}>{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className={styles.similar_products_container}>
          <h1 className={styles.similar_products_title}>You may also like</h1>
          <div className={styles.similar_products_list}>
            {similarProducts.map(item => (
              <ProductCard key={item.id} product={item} onPage={false} />
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default ProductDetail;
