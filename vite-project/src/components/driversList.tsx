import React from 'react';
import { DriverRanking } from '../types/index';
import styles from '../styles/driversList.module.css';

interface Props {
  drivers: DriverRanking[];
  onDriverClick: (driverId: number) => void;
}

const DriversList: React.FC<Props> = ({ drivers, onDriverClick }) => {
  return (
    <div>
      <ul className={styles['drivers-list']}>
        {drivers.map(driver => (
          <li className={styles.driver} key={driver.driver.id} onClick={() => onDriverClick(driver.driver.id)}>
            <p className={styles['driver__position']}>{String(driver.position)}</p>
            <p className={styles['driver__name']}>{driver.driver.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriversList;
