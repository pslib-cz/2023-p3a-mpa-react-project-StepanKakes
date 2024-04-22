import React, { useState } from 'react';
import { DriverRanking, DriverDetail } from './types';
import './App.css';
import LiveDriversList from './components/liveDriversList';
import LiveDriverInfo from './components/liveDriverInfo';
import { DriversContext, SelectedDriverContext } from './context/driverProvider';
import { DriverDataProvider } from './context/driverDataContext';
import DriverInfo from './components/driverInfo';
import DriversList from './components/driversList';


export const App: React.FC = () => {
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null);
  const [selectedDriverNumber, setSelectedDriverNumber] = useState<number | null>(null);

  const [selectedTab, setSelectedTab] = useState('live');

  return (
    <div>
      <button onClick={() => setSelectedTab('live')}>Live</button>
      <button onClick={() => setSelectedTab('drivers')}>Drivers</button>
      <div className="container">
        {selectedTab === 'live' && (
          <SelectedDriverContext.Provider value={{ selectedDriverNumber, setSelectedDriverNumber }}>
            <DriverDataProvider>
              <div className="container">
                <LiveDriversList />
                <LiveDriverInfo />
              </div>
            </DriverDataProvider>
          </SelectedDriverContext.Provider>
        )}
        {selectedTab === 'drivers' && (
          <DriversContext.Provider value={{ selectedDriver, setSelectedDriver, drivers, setDrivers }}>
          <div className="container">
            <DriversList/>
            <DriverInfo/>
          </div>
          </DriversContext.Provider>
        )}
      </div>
    </div>
  );
};

export default App;