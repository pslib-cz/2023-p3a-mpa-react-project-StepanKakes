import React, { useState, useEffect } from 'react';
import DriversList from './components/driversList';
import DriverInfo from './components/driverInfo';
import { DriverRanking, DriverDetail } from './types';
import { generateTestDrivers, generateTestDriverDetail } from './types'; 
import { RaceData, DriverDetails, CarData, LapData, IntervalData } from './types/index';
import './App.css';
import LiveDriversList from './components/liveDriversList';
import LiveDriverInfo from './components/liveDriverInfo';
import { SelectedDriverContext } from './context/driverProvider';


/*
const App: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null);

  useEffect(() => {
    // Načtěte data ze serveru a uložte je do stavu aplikace
    fetchDrivers();
  }, []);

  const fetchDrivers = () => {
    fetch('https://v1.formula-1.api-sports.io/rankings/drivers?season=2024', {
      headers: {
        'x-rapidapi-host': 'v1.formula-1.api-sports.io',
        'x-rapidapi-key': 'dd987d0ed8edaac7489b199eb3347e02', // Vložte svůj API klíč
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
        'x-rapidapi-key': 'dd987d0ed8edaac7489b199eb3347e02', // Vložte svůj API klíč
      },
    })
      .then(response => response.json())
      .then(data => setSelectedDriver(data.response[0]))
      .catch(error => console.error('Error fetching driver details:', error));
  };
*/

const App: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null); 
  const [selectedDriverNumber, setSelectedDriverNumber] = useState<number | null>(null);
  const [raceData, setRaceData] = useState<RaceData[]>([]);
  const [driverDetails, setDriverDetails] = useState<DriverDetails []>([]);
  

  const fetchData = () => {
    const testDrivers = generateTestDrivers();
    setDrivers(testDrivers);
  };

  useEffect(() => {
    fetchData();
    fetchDriverDetails();
  }, []);


    const fetchDriverDetails = () => {
    fetch('https://api.openf1.org/v1/drivers', {
    })
      .then(response => response.json())
      .then(data => setDriverDetails(data.response))
      .catch(error => console.error('Error fetching drivers:', error));
  };
    
    useEffect(() => {
      const interval = setInterval(async () => {
        try {
          const response = await fetch('https://api.openf1.org/v1/position?meeting_key=latest');
          const newData: RaceData[] = await response.json();
          setRaceData(newData);
        } catch (error) {
          console.error('Error fetching updated race data:', error);
        }
      }, 1000);
      return () => clearInterval(interval);
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
    <SelectedDriverContext.Provider value={{ selectedDriverNumber, setSelectedDriverNumber }}>
      <div className="container">
        <LiveDriversList />
        <LiveDriverInfo />
      </div>
      
    </SelectedDriverContext.Provider>
  );
};

export default App;