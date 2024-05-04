import React, { useContext } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import { DriverPosition, LiveDriverDetail, IntervalData } from '../types';
import styles from '../styles/nearbyDriversList.module.css';
import { useDriverDataContext } from '../context/driverDataContext';

const NearbyDriversList = () => {
  const { selectedDriverNumber } = useContext(SelectedDriverContext);
  const { driverPositions, driverDetails, intervalData } = useDriverDataContext();

  if (!driverPositions) {
    return <p>Data are not available.</p>; 
  }

  const selectedIndex = driverPositions.findIndex(position => position.driver_number === selectedDriverNumber);
  const nearbyDrivers = driverPositions.slice(Math.max(0, selectedIndex - 1), selectedIndex + 2);

  return (
    <div  className={styles['drivers-table']}>
      <table>
      <thead>
        <tr>
          <th>pos</th>
          <th>driver</th>
          <th>gap to leader</th>
          <th>interval</th>
        </tr>
      </thead>
      <tbody>
  {nearbyDrivers.map(position => {
    const driverDetail = driverDetails.find((detail: LiveDriverDetail) => detail.driver_number === position.driver_number);
    const intervalInfo = intervalData.find(info => info.driver_number === position.driver_number);
    let intervalStyle = {};
    if (intervalInfo) {
      const intervalValue = intervalInfo.interval;
      if (intervalValue === null) {
        intervalStyle = { backgroundColor: 'yellow' };
      } 
      else if (intervalValue < 1.0) {
        intervalStyle = { backgroundColor: 'green' };
      } else if (intervalValue > 1.0 && intervalValue <= 5) {
        intervalStyle = { backgroundColor: 'gray' };
      } else if (intervalValue > 5) {
        intervalStyle = { backgroundColor: 'red' };
      }
    }
    return (
      <tr key={position.driver_number}>
        <td className={styles['position']}>{position.position}</td>
        <td>{driverDetail?.name_acronym || 'Unknown'}</td>
        <td>{intervalInfo?.gap_to_leader || 'N/A'}</td>
        <td style={intervalStyle}>{intervalInfo?.interval || 'N/A'}</td>
        
      </tr>
    );
  })}
</tbody>
    </table>
    </div>
    
  );
};

export default NearbyDriversList;
