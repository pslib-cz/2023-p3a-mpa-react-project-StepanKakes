import React from 'react';
import { useEffect } from 'react';
import { DriverRanking } from '../types/index';
import styles from '../styles/driversList.module.css';
import { useDriversContext } from '../context/driverProvider';
import { generateTestDriverDetail, generateTestDrivers } from '../types';


const DriversList: React.FC = () => {
  const { drivers, setSelectedDriver, setDrivers } = useDriversContext();

  /*
const App: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null);

  

  const handleDriverClick = (driverId: number) => {
    fetch(`https://v1.formula-1.api-sports.io/drivers?id=${driverId}`, {
      headers: {
        'x-rapidapi-host': 'v1.formula-1.api-sports.io',
        'x-rapidapi-key': 'dd987d0ed8edaac7489b199eb3347e02', // Vložte svůj API klíč
      },
    })
      .then(response => response.json())
      .then(data => setSelectedDriver(data.response[0]))
      .catch(error => console.error('Error fetching driver details:', error));
  };

  <DriversContext.Provider  value={{ drivers, setDrivers, selectedDriver, setSelectedDriver }}>
    <div className="container">
      <DriverList/>
      <DriverInfo/>
    </div>
  </DriversContext.Provider>
*/

useEffect(() => {
  // Načtěte data ze serveru a uložte je do stavu aplikace
  fetchDrivers();
}, []);

const fetchDrivers = () => {
  fetch('https://v1.formula-1.api-sports.io/rankings/drivers?season=2024', {
    headers: {
      'x-rapidapi-host': 'v1.formula-1.api-sports.io',
      'x-rapidapi-key': '430dc0b9be573baf65e915b9235b347f', // Vložte svůj API klíč
    },
  })
    .then(response => response.json())
    .then(data => setDrivers(data.response))
    .catch(error => console.error('Error fetching drivers:', error));
};

const handleDriverClick = (driverId: number) => {
  fetch(`https://v1.formula-1.api-sports.io/drivers?id=${driverId}`, {
    headers: {
      'x-rapidapi-host': 'v1.formula-1.api-sports.io',
      'x-rapidapi-key': '430dc0b9be573baf65e915b9235b347f', // Vložte svůj API klíč
    },
  })
    .then(response => response.json())
    .then(data => setSelectedDriver(data.response[0]))
    .catch(error => console.error('Error fetching driver details:', error));
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
