import { useOutletContext, useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import { Wine } from '../types/Wine';
import { useEffect, useState } from 'react';
import { Loader } from '../components/Loader/Loader';

const DetailsPage: React.FC = () => {
  const { wines } = useOutletContext<{ wines: Wine[] }>();
  const { productId: productIdFromUrl } = useParams();
  const [product, setProduct] = useState<Wine | null>(null);

  useEffect(() => {
    if (wines.length && productIdFromUrl) {
      const foundProduct = wines.find(
        wine => Number(wine.id) === Number(productIdFromUrl),
      );

      setProduct(foundProduct || null);
    }
  }, [wines, productIdFromUrl]);

  if (!wines.length) {
    return (
      <div>
        <Loader />
      </div>
    );
  }

  return (
    <>
      {product && (
        <div>
          <ProductDetail product={product} />
        </div>
      )}
    </>
  );
};

export default DetailsPage;
