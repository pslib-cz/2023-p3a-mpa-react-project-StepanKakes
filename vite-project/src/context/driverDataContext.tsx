import React, { createContext, useContext, useEffect, useState, PropsWithChildren } from 'react';
import { CarData, IntervalData, LapData, DriverPosition, LiveDriverDetail, StintData, Races, Race } from '../types';
import { SelectedDriverContext } from './driverProvider';

interface DriverDataContextType {
  carData: CarData | null;
  lapData: LapData | null;
  intervalData: IntervalData[];
  driverDetails: LiveDriverDetail[];
  driverPositions: DriverPosition[] | null;
  stintData: StintData[] | null;
  nextRace: Race | null;

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
  const [intervalData, setIntervalData] = useState<IntervalData[]>([]);
  const [stintData, setStintData] = useState<StintData[]>([]);
  const [lastDateCarData, setLastDateCarData] = useState<string | null>(null);
  const [lastDateLaps, setLastDateLaps] = useState<string | null>(null);
  const [lastDateIntervals, setLastDateIntervals] = useState<string | null>(null);
  const { selectedDriverNumber } = useContext(SelectedDriverContext);
  const [driverPositions, setDriverPositions] = useState<DriverPosition[]>([]);
  const [driverDetails, setDriverDetails] = useState<LiveDriverDetail[]>([]);
  const [lastDate, setLastDate] = useState<string | null>(null);
  const [racesData, setRacesData] = useState<Races>([]);
  const [nextRace, setNextRace] = useState<Race | null>(null);
 /* const [lastDateLocations, setLastDateLocations] = useState<string | null>(null);
  const [locationData, setLocationlData] = useState<Location[]>([]);*/
  useEffect(() => {
    fetchRacesData();
  }, []);
  if (nextRace?.status !== 'Live'){
    useEffect(() => {
      fetchCarData();
      fetchLapsData();
      fetchIntervalsData();
      fetchStintsData();
  
      const carDataIntervalId = setInterval(fetchCarData, 1000);
      const lapsIntervalId = setInterval(fetchLapsData, 30000);
      const intervalsIntervalId = setInterval(fetchIntervalsData, 4000);
      const stintsIntervalId = setInterval(fetchIntervalsData, 60000);
     // const locationIntervalId = setInterval(fetchLocationsData, 4000);
  
      return () => {
        clearInterval(carDataIntervalId);
        clearInterval(lapsIntervalId);
        clearInterval(intervalsIntervalId);
        clearInterval(stintsIntervalId);
        //clearInterval(locationIntervalId);
      };
    }, [selectedDriverNumber]);
    
    
  
    
    
   
    useEffect(() => {
      const fetchDriverData = async () => {
        try {
          const currentPositions = [...driverPositions]; // Save current positions
          let url = `https://api.openf1.org/v1/position?session_key=latest`;
          if (lastDate) {
            url += `&date%3E=${lastDate}`;
          }
    
          const positionResponse = await fetch(url);
          const positionData = await positionResponse.json();
    
          const latestData = positionData.reduce((acc: DriverPosition[], current: DriverPosition) => {
            if (!current.position) return acc;
    
            const existingIndex = acc.findIndex(item => item.driver_number === current.driver_number);
            if (existingIndex > -1) {
              const existingItem = acc[existingIndex];
              if (new Date(existingItem.date) < new Date(current.date)) {
                acc[existingIndex] = current;
              }
            } else {
              acc.push(current);
            }
            return acc;
          }, currentPositions); // Use currentPositions as initial value
    
          if (latestData.length > 0) {
            const latestDate = latestData[latestData.length - 1].date;
            setLastDate(latestDate);
          }
    
          latestData.sort((a: DriverPosition, b: DriverPosition) => a.position - b.position);
          setDriverPositions(latestData);
          console.log(latestData);
    
          const driverDetailsResponse = await fetch('https://corsproxy.io/?https://api.openf1.org/v1/drivers?session_key=latest');
          const driverDetailsData = await driverDetailsResponse.json();
          setDriverDetails(driverDetailsData);
        } catch (error) {
          console.error('Error:', error);
        }
      };
    
      const intervalId = setInterval(fetchDriverData, 3000);
    
      return () => clearInterval(intervalId);
    }, []);
  
  }

  const fetchCarData = () => {
    let carDataUrl = `https://api.openf1.org/v1/car_data?driver_number=${selectedDriverNumber}&session_key=latest`;
    if (lastDateCarData) {
      carDataUrl += `&date>=${lastDateCarData}`;
    }

    fetch(carDataUrl)
      .then(response => response.json())
      .then(data => {
        const latestData = data[data.length - 1];
        if (latestData) {
          setLastDateCarData(latestData.date);
          setCarData(latestData);
        }
      });
  };

  const fetchLapsData = () => {
    let lapsUrl = `https://api.openf1.org/v1/laps?session_key=latest&driver_number=${selectedDriverNumber}`;
    if (lastDateLaps) {
      lapsUrl += `&date>=${lastDateLaps}`;
    }

    fetch(lapsUrl)
      .then(response => response.json())
      .then(data => {
        console.log("fetching laps data " + lapsUrl);
        const latestData = data[data.length - 1];
        if (latestData) {
          setLastDateLaps(latestData.date);
          setLapData(latestData);
          console.log("lap data: " + JSON.stringify(latestData, null, 2));
        }
      });
  };

  const fetchIntervalsData = () => {
    let intervalsUrl = `https://api.openf1.org/v1/intervals?session_key=latest`;
    console.log('lastDateIntervals:', lastDateIntervals);
    if (lastDateIntervals) {
      intervalsUrl += `&date>=${lastDateIntervals}`;
    }
    
    fetch(intervalsUrl)
  .then(response => response.json())
  .then(data => {
    console.log("fetching intervals data " + intervalsUrl);
    if (data && data.length > 0) {
      const lastObject = data[data.length - 1];
      const dateWithoutTimeZone = lastObject.date.split('+')[0];
      setLastDateIntervals(dateWithoutTimeZone);
      setIntervalData(data);
      console.log("lastDate: " + dateWithoutTimeZone);
    //  console.log("interval data: " + JSON.stringify(intervalData, null, 2));
    }
  });
  };
  /*
  const fetchLocationsData = async () => {
    const newLocations: Location[] = [];
  
    for (const driverPosition of driverPositions) {
      let locationsUrl = `https://corsproxy.io/?https://api.openf1.org/v1/location?session_key=latest&driver_number=${driverPosition.driver_number}`;
      if (lastDateLocations) {
        locationsUrl += `&date>=${lastDateLocations}`;
      }
  
      const response = await fetch(locationsUrl);
      const data = await response.json();
      console.log("fetching locations data for driver", driverPosition.driver_number);
  
      if (data) {
        setLastDateLocations(data.date);
        newLocations.push(data);
      }
    }
  
    setLocationlData(newLocations);
    console.log("locationData: "+locationData);
  };
  */


  const fetchStintsData = () => {
    let stintsUrl = `https://api.openf1.org/v1/stints?session_key=latest&driver_number=${selectedDriverNumber}`;

    fetch(stintsUrl)
      .then(response => response.json())
      .then(data => {
        const latestData = data;
        if (latestData) {
          setStintData(latestData);
        }
      });
  };

  const fetchRacesData = () => {
    fetch('https://v1.formula-1.api-sports.io/races?season=2024', {
      headers: {
        'x-rapidapi-host': 'v1.formula-1.api-sports.io',
        'x-rapidapi-key': '430dc0b9be573baf65e915b9235b347f',
      },
    })
      .then(response => response.json())
      .then(data => {
        setRacesData(data.response);
        findNextRace(data.response);
      })
      .catch(error => console.error('Error fetching races:', error));
  };

  const findNextRace = (races: Races) => {
    const now = new Date();
    const upcomingRaces = races.filter(race => {
      const raceDate = new Date(race.date);
      return race.status === 'Scheduled' && raceDate > now;
    }).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const liveRace = races.find(race => race.status === 'Live');

    setNextRace(liveRace || upcomingRaces[0] || null);
  };

  const value: DriverDataContextType = {
    carData,
    lapData,
    intervalData,
    driverDetails,
    driverPositions,
    stintData,
    nextRace,
   // locationData,
  };

  return <DriverDataContext.Provider value={value}>{children}</DriverDataContext.Provider>;
};

