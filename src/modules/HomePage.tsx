import { useOutletContext } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';
import Main from '../components/Main/Main';
import NewProducts from '../components/NewProducts/NewProducts';
import PerfectPour from '../components/PerfectPour/PerfectPour';
import ProductsCatalog from '../components/ProductsCatalog/ProductsCatalog';

const HomePage: React.FC = () => {
  const { width, setActiveAside } = useOutletContext<{
    width: number;
    setActiveAside: (arg: boolean) => void;
  }>();

  return (
    <>
      <Header width={width} setActiveAside={setActiveAside} />
      <Main width={width} />
      <ProductsCatalog />
      <PerfectPour />
      <NewProducts />
      <Footer />
    </>
  );
};

export default HomePage;
