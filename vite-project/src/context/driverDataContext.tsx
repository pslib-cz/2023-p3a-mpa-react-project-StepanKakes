import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { CarData, IntervalData, LapData } from '../types';
import { SelectedDriverContext } from './driverProvider';

interface DriverDataContextType {
  carData: CarData | null;
  lapData: LapData | null;
  intervalData: IntervalData | null;
  fetchDriverData: () => void;
}

const DriverDataContext = createContext<DriverDataContextType | undefined>(undefined);

export const useDriverDataContext = () => {
  const context = useContext(DriverDataContext);
  if (!context) {
    throw new Error('useDriverDataContext must be used within a DriverDataProvider');
  }
  return context;
};

export const DriverDataProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [carData, setCarData] = useState<CarData | null>(null);
  const [lapData, setLapData] = useState<LapData | null>(null);
  const [intervalData] = useState<IntervalData | null>(null);
  const [lastDateCarData, setLastDateCarData] = useState<string | null>(null);
  const [lastDateLaps, setLastDateLaps] = useState<string | null>(null);
  const [lastDateIntervals, setLastDateIntervals] = useState<string | null>(null);
  const { selectedDriverNumber } = useContext(SelectedDriverContext);

  const fetchDriverData = () => {
    let carDataUrl = `https://corsproxy.io/?https://api.openf1.org/v1/car_data?driver_number=${selectedDriverNumber}&session_key=latest`;
  let lapsUrl = `https://corsproxy.io/?https://api.openf1.org/v1/laps?session_key=latest&driver_number=${selectedDriverNumber}`;
  let intervalsUrl = `https://corsproxy.io/?https://api.openf1.org/v1/intervals?session_key=latest&driver_number=${selectedDriverNumber}`;
    console.log("selected dr number: "+selectedDriverNumber);
  if (lastDateCarData) {
    carDataUrl += `&date>=${lastDateCarData}`;
  }

  fetch(carDataUrl)
    .then(response => response.json())
    .then(data => {
      const latestData = data[data.length - 1]; // Get the last item in the array
      if (latestData) {
        console.log(latestData)
        setLastDateCarData(latestData.date);
        setCarData(latestData);
      }
    });

    fetch (lapsUrl)
    if (lastDateLaps) {
      lapsUrl += `&date>=${lastDateLaps}`;
    }

    fetch(lapsUrl)
      .then(response => response.json())
      .then(data => {
        const latestData = data[data.length - 1]; // Get the last item in the array
        if (latestData) {
          setLastDateLaps(latestData.date);
          setLapData(latestData);
        }
      });

  fetch(intervalsUrl)
  if (lastDateIntervals) {
    intervalsUrl += `&date>=${lastDateIntervals}`;
  }

  fetch(intervalsUrl)
    .then(response => response.json())
    .then(data => {
      const latestData = data[data.length - 1]; // Get the last item in the array
      if (latestData) {
        setLastDateIntervals(latestData.date);
        //setIntervalData(latestData);
      }
    });
  };

  useEffect(() => {
    fetchDriverData();
    const intervalId = setInterval(fetchDriverData, 10000);
    return () => clearInterval(intervalId);
  }, [selectedDriverNumber]); 
  

  const value: DriverDataContextType = {
    carData,
    lapData,
    intervalData,
    fetchDriverData,
  };

  return <DriverDataContext.Provider value={value}>{children}</DriverDataContext.Provider>;
};

