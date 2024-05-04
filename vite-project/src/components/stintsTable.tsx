import React from 'react';
import { useDriverDataContext } from '../context/driverDataContext';
import styles from './stintsTable.module.css';
const StintsTable = () => {
  const { stintData } = useDriverDataContext();

  const tyreColors: { [key: string]: string } = {
    MEDIUM: '#e5cc4e',
    SOFT: '#e61c25',
    HARD: '#FFFFFF',
    INTERMEDIATE: '#10629f',
    WET: '#12639f',
  };

  const color = (stint: { compound: string }) => tyreColors[stint.compound] || 'black';
  return (
    <div className={styles['stints-table-container']}>
      <table>
      <thead>
        <tr>
          <th>stint</th>
          <th>start Lap</th>
          <th>end Lap</th>
          <th>tyre age</th>
          <th>tyre</th>
        </tr>
      </thead>
      <tbody>
        {stintData && stintData.map((stint, index) => (
          <tr key={index}>
            <td className={styles['stint-number']}>{stint.stint_number}</td>
            <td>{stint.lap_start}</td>
            <td>{stint.lap_end}</td>
            <td className={styles['tyre-age']}>{stint.lap_end-stint.lap_start+stint.tyre_age_at_start}laps</td>
            <td className={styles['tyre']}>{stint.compound.charAt(0)} <svg width="38" viewBox="0 0 37 35" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M23.5079 1.93599C27.2013 3.14078 30.3437 5.62391 32.3697 8.93873C34.3958 12.2536 35.1726 16.1825 34.5604 20.019C33.9483 23.8554 31.9873 27.3475 29.0302 29.8672C27.3963 31.2594 25.5175 32.3043 23.5079 32.9598M13.4239 1.92433C9.72767 3.12058 6.57958 5.59643 4.54586 8.90656C2.51214 12.2167 1.72625 16.1439 2.32956 19.9817C2.93286 23.8195 4.88576 27.3162 7.837 29.8427C9.4871 31.2553 11.3888 32.3128 13.4239 32.9715"
            stroke={color(stint)}  strokeWidth="4"/>
            </svg></td>
            

          </tr>
        ))}

      </tbody>
    </table>
    </div>
    
  );
};

export default StintsTable;