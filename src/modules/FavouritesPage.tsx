import { useOutletContext } from 'react-router-dom';
import Favourites from '../components/Favourites/Favourites';
import Header from '../components/Header/Header';

const FavouritesPage: React.FC = () => {
  const { width, setActiveAside } = useOutletContext<{
    width: number;
    setActiveAside: (arg: boolean) => void;
  }>();

  return (
    <>
      <Header width={width} setActiveAside={setActiveAside} />
      <Favourites />
    </>
  );
};

export default FavouritesPage;
