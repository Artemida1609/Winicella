import { useOutletContext } from 'react-router-dom';
import Header from '../components/Header/Header';
import CatalogItems from '../components/CatalogItems/CatalogItems';

const CatalogPage: React.FC = () => {
  const { width, disabledIds, setDisabledIds, setActiveAside } =
    useOutletContext<{
      width: number;
      disabledIds: number[];
      setDisabledIds: (ids: number[]) => void;
      setActiveAside: (ids: boolean) => void;
    }>();

  return (
    <>
      <Header width={width} setActiveAside={setActiveAside} />
      <CatalogItems disabledIds={disabledIds} setDisabledIds={setDisabledIds} />
    </>
  );
};

export default CatalogPage;
