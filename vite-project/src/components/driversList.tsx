import React from 'react';
import { useEffect } from 'react';
import { DriverRanking } from '../types/index';
import styles from '../styles/driversList.module.css';
import { useDriversContext } from '../context/driverProvider';
import { generateTestDriverDetail, generateTestDrivers } from '../types';


const DriversList: React.FC = () => {
  const { drivers, setSelectedDriver, setDrivers } = useDriversContext();

  const fetchData = () => {
    const testDrivers = generateTestDrivers();
    setDrivers(testDrivers);
  };

  useEffect(() => {
    fetchData();
  }, []);


  const handleDriverClick = (driverId: number) => {
    const selectedDriverData = drivers.find(driver => driver.driver.id === driverId);
    if (selectedDriverData) {
      setSelectedDriver(generateTestDriverDetail()); // Use generateTestDriverDetail function 
    } else {
      console.error('Driver not found in test data');
    }
  };


  return (
    <div>
      <ul className={styles['drivers-list']}>
        {drivers.map(driver => (
          <li className={styles.driver} key={driver.driver.id} onClick={() => handleDriverClick(driver.driver.id)}>
            <p className={styles['driver__position']}>{String(driver.position)}</p>
            <p className={styles['driver__name']}>{driver.driver.name}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriversList;
