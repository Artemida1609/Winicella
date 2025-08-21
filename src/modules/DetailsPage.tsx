import { useOutletContext, useParams } from 'react-router-dom';
import ProductDetail from '../components/ProductDetail/ProductDetail';
import { Wine } from '../types/Wine';
import { useEffect, useState } from 'react';

const DetailsPage: React.FC = () => {
  // const location = useLocation();
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
    return <div>Loading...</div>;
  }

  if (!product) {
    return <div>Product not found</div>;
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
