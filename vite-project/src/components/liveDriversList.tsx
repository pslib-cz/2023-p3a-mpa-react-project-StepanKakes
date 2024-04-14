import React, { useContext, useEffect, useState } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import { DriverDetail, DriverPosition } from '../types';
import styles from '../styles/liveDriversList.module.css';

const LiveDriversList = () => {

const { setSelectedDriverNumber } = useContext(SelectedDriverContext);
  const [driverPositions, setDriverPositions] = useState<DriverPosition[]>([]);
  const [driverDetails, setDriverDetails] = useState<DriverDetail[]>([]);
  const [lastDate, setLastDate] = useState<string | null>(null);
 
  useEffect(() => {
    const fetchDriverData = async () => {
      try {
        const currentPositions = [...driverPositions]; // Save current positions
        let url = `https://corsproxy.io/?https://api.openf1.org/v1/position?session_key=latest`;
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
  
    const intervalId = setInterval(fetchDriverData, 2000);
  
    return () => clearInterval(intervalId);
  }, []);

  const handleDriverClick = (driverNumber: number) => {
    setSelectedDriverNumber(driverNumber);
  };
 
  return (
    <ul className={styles['drivers-list']}>
      {driverPositions.map((position) => {
        const driverDetail = driverDetails.find(detail => detail.driver_number === position.driver_number);
        return (
          <li className={styles.driver} key={position.driver_number} onClick={() => setSelectedDriverNumber(position.driver_number)}>
            <p className={styles['driver__position']}>{position.position}</p>
            <p className={styles['driver__name']}>{driverDetail?.full_name}</p>
          </li>
        );
      })}
    </ul>
  );
};

export default LiveDriversList;