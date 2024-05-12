import React, { useState } from 'react';
import './App.css';
import LiveView from './components/liveView';
import { DriversContext, SelectedDriverContext } from './context/driverProvider';
import { DriverDataProvider } from './context/driverDataContext';
import DriverInfo from './components/driverInfo';
import DriversList from './components/driversList';
import { DriverDetail, DriverRanking } from './types';
export const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('live');

  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null);
  const [selectedDriverNumber, setSelectedDriverNumber] = useState<number | null>(null);
  const [selectedDriverColor, setSelectedDriverColor] = useState<string | null>(null);

  return (
    <>
      <header>
        <a onClick={() => setSelectedTab('live')}>Live</a>
        <a onClick={() => setSelectedTab('drivers')}>Drivers</a>
      </header>
      <div className="liveview-container">
        {selectedTab === 'live' && (
          <>
          <SelectedDriverContext.Provider value={{ selectedDriverNumber, setSelectedDriverNumber }}>
            <DriverDataProvider>
                <LiveView/>
            </DriverDataProvider>
          </SelectedDriverContext.Provider>
          </>
        )}
        </div>
        <div className='drivers-container'>
        {selectedTab === 'drivers' && (
             <DriversContext.Provider value={{ selectedDriver, setSelectedDriver, drivers, setDrivers, selectedDriverColor, setSelectedDriverColor }}>
              <DriversList/>
              <DriverInfo/>
          </DriversContext.Provider>
        )}
        </div>
        
        
      
    </>
  );
};

export default App;
