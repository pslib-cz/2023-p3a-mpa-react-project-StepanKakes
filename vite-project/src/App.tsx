import React, { useState, useEffect } from 'react';
import { DriverRanking, DriverDetail } from './types';
import './App.css';
import LiveDriversList from './components/liveDriversList';
import LiveDriverInfo from './components/liveDriverInfo';
import { SelectedDriverContext } from './context/driverProvider';
import { DriversContext } from './context/driverProvider';
import DriverInfo from './components/driverInfo';
import DriverList from './components/driversList';
import LiveLocation from './components/liveLocation';
import { DriverDataProvider } from './context/driverDataContext';
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

  <DriversContext.Provider  value={{ drivers, setDrivers, selectedDriver, setSelectedDriver }}>
    <div className="container">
      <DriverList/>
      <DriverInfo/>
    </div>
  </DriversContext.Provider>
*/

export const App: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null);
  const [selectedDriverNumber, setSelectedDriverNumber] = useState<number | null>(null);

  return (
    <SelectedDriverContext.Provider value={{ selectedDriverNumber, setSelectedDriverNumber }}>
      <DriverDataProvider>
        <div className="container">
          <LiveDriversList />
          <LiveDriverInfo />
        </div>
      </DriverDataProvider>
    </SelectedDriverContext.Provider>
  );
};

export default App;