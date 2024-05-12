import React from 'react';
import { useEffect, useState } from 'react';
import styles from '../styles/driversList.module.css';
import { useDriversContext } from '../context/driverProvider';

const DriversList: React.FC = () => {
  const { drivers, setSelectedDriver, setDrivers} = useDriversContext();

useEffect(() => {
  fetchDrivers();
}, []);

const fetchDrivers = () => {
  fetch('https://v1.formula-1.api-sports.io/rankings/drivers?season=2024', {
    headers: {
      'x-rapidapi-host': 'v1.formula-1.api-sports.io',
      'x-rapidapi-key': '430dc0b9be573baf65e915b9235b347f', 
    },
  })
    .then(response => response.json())
    .then(data => setDrivers(data.response))
    .catch(error => console.error('Error fetching drivers:', error));
};

const handleDriverClick = async (driverId: number) => {
  try {
    const response = await fetch(`https://v1.formula-1.api-sports.io/drivers?id=${driverId}`, {
      headers: {
        'x-rapidapi-host': 'v1.formula-1.api-sports.io',
        'x-rapidapi-key': '430dc0b9be573baf65e915b9235b347f', 
      },
    });
    const data = await response.json();
    console.log(data);
    setSelectedDriver(data.response[0]);
  } catch (error) {
    console.error('Error fetching driver details:', error);
  }
};


  return (
    
    <div>
      <ul className={styles['drivers-list']}>
        {drivers.map(driver => (
          <li className={styles.driver} key={driver.driver.id} onClick={() => handleDriverClick(driver.driver.id)}>
            <p className={styles['driver__position']}>{String(driver.position)}</p>
            <p className={styles['driver__name']}>{window.innerWidth <= 765 ? driver.driver.abbr : driver.driver.name}</p>
            <p className={styles['driver__points']}>{driver.points}pts</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DriversList;
