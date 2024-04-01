import React, { useContext, useEffect, useState } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import styles from '../styles/liveDriversList.module.css'
import { DriverDetail, DriverPosition } from '../types';


const LiveDriversList: React.FC = () => {
  const { setSelectedDriverNumber } = useContext(SelectedDriverContext);
  const [driverPositions, setDriverPositions] = useState<DriverPosition[]>([]);
  const [driverDetails, setDriverDetails] = useState<DriverDetail[]>([]);
  const [lastDate, setLastDate] = useState<string | null>(null);
  
  useEffect(() => {
    const fetchDriverData = () => {
      const currentPositions = [...driverPositions]; // Save current positions

      let url = `https://api.openf1.org/v1/position?meeting_key=latest`;
      if (lastDate) {
        url += `&date%3E=${lastDate}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const latestData = data.reduce((acc: DriverPosition[], current: DriverPosition) => {
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
        });

      fetch('https://api.openf1.org/v1/drivers?session_key=latest')
        .then(response => response.json())
        .then(data => setDriverDetails(data));
    };

    fetchDriverData();
    const intervalId = setInterval(fetchDriverData, 1000);

    return () => clearInterval(intervalId);
  }, [lastDate, driverPositions]);
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