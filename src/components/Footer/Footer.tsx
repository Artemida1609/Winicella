import React from 'react';
import styles from './Footer.module.scss';

const Footer: React.FC = () => {
  return (
    <footer className={`${styles.footer}`}>
      <div className={`${styles.footer_content}`}>
        <div className={`${styles.footer_info_container}`}>
          <h2 className={`${styles.footer_title}`}>Vinicella</h2>
          <p className={`${styles.footer_description}`}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Reprehenderit vitae quidem a? Recusandae in ipsa inventore
            reprehenderit ea debitis alias consequatur, officia aut temporibus,
            nihil minus, consectetur hic enim esse.
          </p>
        </div>
        <div className={`${styles.footer_info_container}`}>
          <h2 className={`${styles.footer_title}`}>Contact Us</h2>
          <h3 className={`${styles.footer_subtitle}`}>Email</h3>
          <p className={`${styles.footer_description}`}>info@vinicella.com</p>
          <h3 className={`${styles.footer_subtitle}`}>Phone</h3>
          <p className={`${styles.footer_description}`}>+1 (555) 123-4567</p>
          <h3 className={`${styles.footer_subtitle}`}>Address</h3>
          <p className={`${styles.footer_description}`}>
            123 Vinicella St, Wine City, WC 12345
          </p>
        </div>
      </div>
      <div className={`${styles.footer_bottom}`}>
        <p>&copy; 2025 Vinicella. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
