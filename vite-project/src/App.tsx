import React, { useContext, useState } from 'react';
import './App.css';
import LiveDriversList from './components/liveDriversList';
import LiveDriverInfo from './components/liveDriverInfo';
import { DriversContext, SelectedDriverContext } from './context/driverProvider';
import { DriverDataProvider, useDriverDataContext } from './context/driverDataContext';
import DriverInfo from './components/driverInfo';
import DriversList from './components/driversList';
import { DriverDetail, DriverRanking } from './types';
import circularTexture from './images/circular-texture.png';
export const App: React.FC = () => {
  const [selectedTab, setSelectedTab] = useState('live');

  const { driverDetails } = useDriverDataContext();
  const [drivers, setDrivers] = useState<DriverRanking[]>([]);
  const [selectedDriver, setSelectedDriver] = useState<DriverDetail | null>(null);
  const [selectedDriverNumber, setSelectedDriverNumber] = useState<number | null>(null);
  const [selectedDriverColor, setSelectedDriverColor] = useState<string | null>(null);

  const currentDriverDetails = driverDetails?.find(driver => driver.driver_number === selectedDriverNumber);
  const teamColor = currentDriverDetails?.team_colour || 'defaultColor'; // defaultColor is a placeholder

  return (
    <div className="page-wrapper">
      <button onClick={() => setSelectedTab('live')}>Live</button>
      <button onClick={() => setSelectedTab('drivers')}>Drivers</button>
      <div>
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
             <DriversContext.Provider value={{ selectedDriver, setSelectedDriver, drivers, setDrivers, selectedDriverColor, setSelectedDriverColor }}>
            <div className="container">
              <DriversList/>
              <DriverInfo/>
            </div>
          </DriversContext.Provider>
        )}
        
      </div>
      <div className='circle-container circle-right'>
                  <div className="circle-1" style={{ background: `linear-gradient(#${teamColor} 0%, black 100%)` }}></div>
                  <img className="circle-texture texture-right" src={circularTexture} alt='texture'/>
                </div>
                
                <div className='circle-container circle-left'>
                  <div className="circle-2" style={{ background: `linear-gradient(#${teamColor} 0%, black 100%)` }}></div>
                  <img className="circle-texture texture-left" src={circularTexture} alt='texture'/>
                </div>
    </div>
  );
};

export default App;
