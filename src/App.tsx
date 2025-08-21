import React, { useEffect, useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Wine } from './types/Wine';
import { getAllWines } from './services/productsApi';
import SideBar from './components/SideBar/SideBar';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [activeAside, setActiveAside] = useState<boolean>(false);
  const [wines, setWines] = useState<Wine[]>([]);
  const [disabledIds, setDisabledIds] = useState<number[]>([0, 2, 5]);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    getAllWines().then(data => {
      setWines(data);
    });
  }, []);

  return (
    <>
      <main className='App'>
        <div
          className={classNames('SideBar', {
            activeAside: activeAside,
            inactiveAside: !activeAside,
          })}
        >
          <SideBar setActiveAside={setActiveAside} />
        </div>
        <Outlet
          context={{
            width,
            wines,
            setWines,
            disabledIds,
            setDisabledIds,
            setActiveAside,
          }}
        />
      </main>
    </>
  );
};
