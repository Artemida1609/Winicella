import React, { useEffect, useState } from 'react';
import './App.scss';
import { Outlet } from 'react-router-dom';
import { Wine } from './types/Wine';
import { getAllWines } from './services/productsApi';
import SideBar from './components/SideBar/SideBar';
import classNames from 'classnames';
import Register from './components/Register/Register';

export const App: React.FC = () => {
  const [width, setWidth] = useState<number>(window.innerWidth);
  const [activeAside, setActiveAside] = useState<boolean>(false);
  const [wines, setWines] = useState<Wine[]>([]);
  const [disabledIds, setDisabledIds] = useState<number[]>([0, 2, 5]);
  const [activeRegModal, setActiveRegModal] = useState<boolean>(false);

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

  useEffect(() => {
    if (activeRegModal) {
      document.body.classList.add('no-scroll');
      document.documentElement.classList.add('no-scroll'); // html
    } else {
      document.body.classList.remove('no-scroll');
      document.documentElement.classList.remove('no-scroll');
    }
  }, [activeRegModal]);

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
        <div
          className={classNames('RegModal', {
            activeRegModal: activeRegModal,
            inactiveRegModal: !activeRegModal,
          })}
        >
          <Register setActiveRegModal={setActiveRegModal} />
        </div>
        <Outlet
          context={{
            width,
            wines,
            setWines,
            disabledIds,
            setDisabledIds,
            setActiveAside,
            setActiveRegModal,
          }}
        />
      </main>
    </>
  );
};
