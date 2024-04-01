import React from 'react';

interface SelectedDriverContextProps {
  selectedDriverNumber: number | null;
  setSelectedDriverNumber: (driverNumber: number) => void;
}

export const SelectedDriverContext = React.createContext<SelectedDriverContextProps>({
  selectedDriverNumber: null,
  setSelectedDriverNumber: () => {},
});