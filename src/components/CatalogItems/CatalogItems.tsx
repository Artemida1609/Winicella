import { useNavigate, useSearchParams } from 'react-router-dom';
import { Wine } from '../../types/Wine';
import styles from './CatalogItems.module.scss';
import ProductCard from '../ProductCard/ProductCard';
import { DropDown } from '../DropDown/DropDown';
import classNames from 'classnames';
import {
  itemsOnPageData,
  sortByData,
  wineCapacity,
  wineCountries,
  wineTypes,
  wineVintage,
} from '../../utils/SortCategory';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { getAllWines } from '../../services/productsApi';
import { ButtonDirection } from '../../enums/ButtonDirection';
import { Button } from '../Button/Button';
import sortByCategory from '../../utils/SortByCategory';
import Tooltip from '@mui/material/Tooltip';
import { Loader } from '../Loader/Loader';

type Props = {
  setDisabledIds: (arg: number[]) => void;
  disabledIds: number[];
};

const CatalogItems: React.FC<Props> = ({ setDisabledIds, disabledIds }) => {
  const navigate = useNavigate();
  const [activeData, setActiveData] = useState<Wine[]>([]);
  const [activeSortDiv, setActiveSortDiv] = useState(false);
  const [buttonsCount, setButtonsCount] = useState<string[]>(['1']);

  const [searchParams, setSearchParams] = useSearchParams();
  const [itemsCount, setItemsCount] = useState<string>(
    searchParams.get('count') || '',
  );
  const [sortBy, setSortBy] = useState<string>(
    searchParams.get('sortBy') || '',
  );
  const [pageNum, setPageNum] = useState<string>(
    searchParams.get('pageNum') || '1',
  );

  const filteredData = useMemo(() => {
    let result = [...activeData];

    const capacities = searchParams.getAll('capacities');
    const vintages = searchParams.getAll('vintage');
    const countries = searchParams.getAll('countries');
    const types = searchParams.getAll('types');

    if (capacities.length > 0) {
      result = result.filter(
        w => w.capacity != null && capacities.includes(w.capacity.toString()),
      );
    }

    if (vintages.length > 0) {
      result = result.filter(
        w => w.vintage != null && vintages.includes(w.vintage.toString()),
      );
    }

    if (countries.length > 0) {
      result = result.filter(w => w.country && countries.includes(w.country));
    }

    if (types.length > 0) {
      result = result.filter(w => w.wine_type && types.includes(w.wine_type));
    }

    return result;
  }, [activeData, searchParams]);

  const handleBackButtonClick = () => {
    navigate('../');
  };

  const sortByCount = () => {
    if (itemsCount) {
      if (itemsCount === 'All') {
        return [0, activeData.length];
      }

      return [
        Number(itemsCount) * (Number(pageNum) - 1),
        Number(itemsCount) * Number(pageNum),
      ];
    } else {
      return [0, activeData.length];
    }
  };

  const handlePageChange = (number: string) => {
    setPageNum(number);
  };

  const activeParams = useMemo(() => {
    const params: string[] = [];

    searchParams.forEach(value => params.push(value));

    return params;
  }, [searchParams]);

  const handleCategoryParams = (category: string, value: string) => {
    const newParams = new URLSearchParams(searchParams.toString());
    const currentValues = newParams.getAll(category);

    if (currentValues.includes(value)) {
      const filtered = currentValues.filter(v => v !== value);

      newParams.delete(category);
      filtered.forEach(v => newParams.append(category, v));
    } else {
      newParams.append(category, value);
    }

    setSearchParams(newParams);
  };

  const handleMoreSorting = () => {
    if (activeSortDiv) {
      setActiveSortDiv(false);
    } else {
      setActiveSortDiv(true);
    }
  };

  const handleButtonState = useCallback(() => {
    let newDisabledIds = [...disabledIds];

    if (pageNum === '1') {
      newDisabledIds.push(5);
    } else if (pageNum !== '1') {
      newDisabledIds = newDisabledIds.filter(id => id !== 5);
    }

    if (pageNum === buttonsCount[buttonsCount.length - 1]) {
      newDisabledIds.push(6);
    } else if (pageNum !== buttonsCount[buttonsCount.length - 1]) {
      newDisabledIds = newDisabledIds.filter(id => id !== 6);
    }

    if (JSON.stringify(newDisabledIds) !== JSON.stringify(disabledIds)) {
      setDisabledIds(newDisabledIds);
    }
  }, [disabledIds, setDisabledIds, buttonsCount, pageNum]);

  const handlePageChangeLeft = () => {
    setPageNum((Number(pageNum) - 1).toString());
  };

  const handleButtonClassName = (number: string) => {
    return classNames([styles.page_num], {
      [styles.selected_page]: pageNum === number,
    });
  };

  const handlePageChangeRight = () => {
    setPageNum((Number(pageNum) + 1).toString());
  };

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [pageNum]);

  useEffect(() => {
    setTimeout(() => handleButtonState(), 1000);
  }, [pageNum, buttonsCount, disabledIds, handleButtonState]);

  // url params
  useEffect(() => {
    const newParams = new URLSearchParams(searchParams.toString());

    if (itemsCount) {
      newParams.set('count', itemsCount);
    } else {
      newParams.delete('count');
    }

    if (sortBy) {
      newParams.set('sortBy', sortBy);
    } else {
      newParams.delete('sortBy');
    }

    if (pageNum) {
      if (pageNum !== '1') {
        newParams.set('pageNum', pageNum);
      }
    } else {
      newParams.delete('pageNum');
    }

    if (newParams.toString() !== searchParams.toString()) {
      setSearchParams(newParams);
    }
  }, [itemsCount, sortBy, pageNum, setSearchParams, searchParams]);

  // buttons count
  useEffect(() => {
    let numOfButtons;

    if (itemsCount) {
      if (itemsCount === 'All') {
        numOfButtons = 1;
      } else {
        numOfButtons = Math.ceil(filteredData.length / Number(itemsCount));
      }
    } else {
      numOfButtons = 1;
    }

    const result = Array.from({ length: numOfButtons }, (_, i) =>
      (i + 1).toString(),
    );

    setButtonsCount(result);
  }, [itemsCount, sortBy, filteredData]);

  useEffect(() => {
    getAllWines()
      .then(data => {
        setActiveData(data);
      })
      .catch(e => {
        throw new Error(e);
      });
  }, []);

  if (!activeData || activeData.length === 0) {
    return (
      <div className={styles.loader_container}>
        <Loader />
      </div>
    );
  }

  return (
    <section className={styles.catalog_items_container}>
      <div className={styles.back_button} onClick={handleBackButtonClick}>
        <img
          src='./img/icons/dark-theme-arrow.svg'
          alt='arrow left'
          className={styles.back_button_icon}
        />
        <span className={styles.back_button_text}>Back</span>
      </div>
      <div className={styles.products_container}>
        <h1 className={styles.products_title}>Catalog</h1>
        <div className={`${styles.main_select_container}`}>
          <div className={`${styles.select_container}`}>
            <p className={classNames(`${styles.select_parag}`)}>Sort by</p>
            <DropDown
              id={'0'}
              data={sortByData}
              setSort={setSortBy}
              searchParams={searchParams}
            />
          </div>
          <div className={`${styles.select_container}`}>
            <p className={`${styles.select_parag}`}>Items on page</p>
            <DropDown
              id={'1'}
              data={itemsOnPageData}
              setSort={setItemsCount}
              searchParams={searchParams}
            />
          </div>
          <Tooltip title={'more sorting'}>
            <button
              className={styles.more_sorting_wrapper}
              onClick={handleMoreSorting}
            >
              <img
                src='./img/icons/dark-theme-arrow.svg'
                alt='more sorting arrow'
                className={styles.more_sorting_icon}
              />
            </button>
          </Tooltip>
        </div>

        {activeSortDiv && (
          <div className={styles.sort_main_cont}>
            {[
              { label: 'capacities', data: wineCapacity },
              { label: 'vintage', data: wineVintage },
              { label: 'countries', data: wineCountries },
              { label: 'types', data: wineTypes },
            ].map(({ label, data }) => (
              <div key={label} className={styles.sort_category_cont}>
                <span className={styles.sort_category_label}>{label}:</span>
                {data.map(item => (
                  <span
                    key={item}
                    className={classNames(styles.sort_category_item, {
                      [styles.activeParam]: activeParams.includes(
                        item.toString(),
                      ),
                    })}
                    onClick={() => handleCategoryParams(label, item.toString())}
                  >
                    {item.toString()}
                  </span>
                ))}
              </div>
            ))}
          </div>
        )}

        <div className={styles.products_list}>
          {sortByCategory({ sortBy, activeData: filteredData })
            .slice(sortByCount()[0], sortByCount()[1])
            .map(item => (
              <ProductCard key={item.id} product={item} onPage={true} />
            ))}
        </div>
      </div>

      <section className={`${styles.button_container}`}>
        {buttonsCount.length > 0 && buttonsCount[0] !== '0' && (
          <Button
            direction={ButtonDirection.left}
            onClick={handlePageChangeLeft}
            buttonId={5}
            disabledIds={disabledIds}
          />
        )}

        <div className={`${styles.page_num_container}`}>
          {buttonsCount.map((button, id) => {
            return (
              <button
                className={handleButtonClassName(button)}
                onClick={() => handlePageChange(button)}
                key={id}
              >
                {button}
              </button>
            );
          })}
        </div>
        {buttonsCount.length > 0 && buttonsCount[0] !== '0' && (
          <Button
            direction={ButtonDirection.right}
            onClick={handlePageChangeRight}
            buttonId={6}
            disabledIds={disabledIds}
          />
        )}
      </section>
    </section>
  );
};

export default CatalogItems;
