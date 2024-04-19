import React from 'react';
import { useDriverDataContext } from '../context/driverDataContext';
import { PedalBarProps } from '../types/index';
import styles from './pedalBar.module.css';

const PedalBar: React.FC<PedalBarProps> = ({ pedalType }) => { 
  const { carData } = useDriverDataContext();
  const rawPedalValue = pedalType === 'brake' ? carData?.brake : carData?.throttle;
  const pedalValue = rawPedalValue ? (rawPedalValue > 100 ? 100 : rawPedalValue) : 0;
  console.log("pedalValue: " + pedalValue);
  return (
    <div className={styles['bar']}>
      <div className={styles['bar-container']}>
          <ul>
            <li>100</li>
            <li>75</li>
            <li>50</li>
            <li>25</li>
            <li>0</li>
          </ul>
          <div className={styles['bar-body']}>
            <span className={styles['bar-inner']} style={{ height: `${pedalValue}%` }}/>
          <div/>
        </div>
        <p style={{bottom: `${pedalValue}%`}}>{pedalValue}</p>
      </div>
      <p>{pedalType}</p>
    </div>
  );
};


export default PedalBar;
