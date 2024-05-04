import React from 'react';
import { useContext } from 'react';
import { useDriverDataContext } from '../context/driverDataContext';
import { SelectedDriverContext } from '../context/driverProvider';
import styles from './lapTime.module.css';

const LapTime = () => {
const { selectedDriverNumber } = useContext(SelectedDriverContext);
  const { intervalData, lapData} = useDriverDataContext();

  const selectedDriverIntervalData = intervalData.find(data => data.driver_number === selectedDriverNumber);

  return (
    <div className={styles['timing-container']}>
      <table>
        <thead>
        <tr>
          <th>Interval</th>
          <th>Gap to Leader</th>
          <th>Last lap</th>
        </tr>
        </thead>
        <tbody>
        <tr>
            <td>{selectedDriverIntervalData?.interval || 'N/A'}</td>
            <td>{selectedDriverIntervalData?.gap_to_leader || 'N/A'}</td>
            <td>{lapData?.lap_duration || 'N/A'}</td>
        </tr>
        </tbody>
      </table>
    </div>
  );
};

export default LapTime;