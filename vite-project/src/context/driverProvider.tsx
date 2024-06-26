import React from 'react';
import  { createContext, useContext } from 'react';
import { DriverRanking, DriverDetail } from '../types/index';

interface SelectedDriverContextProps {
  selectedDriverNumber: number | null;
  setSelectedDriverNumber: (driverNumber: number) => void;
}

export const SelectedDriverContext = React.createContext<SelectedDriverContextProps>({
  selectedDriverNumber: null,
  setSelectedDriverNumber: () => {},
});

export const DriversContext = createContext<{
  selectedDriverColor: string | null;
  setSelectedDriverColor: React.Dispatch<React.SetStateAction<string | null>>;
  drivers: DriverRanking[];
  setDrivers: React.Dispatch<React.SetStateAction<DriverRanking[]>>;
  selectedDriver: DriverDetail | null;
  setSelectedDriver: React.Dispatch<React.SetStateAction<DriverDetail | null>>;
}>({
  selectedDriverColor: null,
  setSelectedDriverColor: () => {},
  drivers: [],
  setDrivers: () => {},
  selectedDriver: null,
  setSelectedDriver: () => {},
});

export const useDriversContext = () => useContext(DriversContext);

