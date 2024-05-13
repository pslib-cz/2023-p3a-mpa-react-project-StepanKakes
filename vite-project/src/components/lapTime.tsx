import { useContext } from 'react';
import { useDriverDataContext } from '../context/driverDataContext';
import { SelectedDriverContext } from '../context/driverProvider';
import styles from '../styles/lapTime.module.css';

const LapTime = () => {
const { selectedDriverNumber } = useContext(SelectedDriverContext);
  const { intervalData, lapData, nextRace} = useDriverDataContext();

  const selectedDriverIntervalData = intervalData.find(data => data.driver_number === selectedDriverNumber);
  const getColor = (segments: number[]) => {
  if (!segments || segments.length === 0) {
    return 'white';
  }

  const lastSegment = segments[segments.length - 1];
  switch (lastSegment) {
    case 2048:
      return 'yellow';
    case 2049:
      return 'green';
    case 2051:
      return 'purple';
    default:
      return 'transparent'; // default color
  }
};

const getFontColor = (segments: number[]) => {
  const color = getColor(segments);
  return color === 'transparent' ? 'white' : 'black';
};

const totalDuration = (lapData?.duration_sector_1 ?? 0) + (lapData?.duration_sector_2 ?? 0) + (lapData?.duration_sector_3 ?? 0);
const minutes = Math.floor(totalDuration / 60);
const seconds = Math.floor(totalDuration % 60);
const tenths = Math.floor((totalDuration * 10) % 10);
const formattedDuration = totalDuration > 0 ? `${minutes}:${seconds.toString().padStart(2, '0')}.${tenths}` : 'N/A';
  return (
    <div className={styles['timing-container']}>
      <p className={styles['laps']}>lap <span>{lapData?.lap_number}/{nextRace?.laps.total}</span></p>
      <table>
        <thead>
        <tr>
          <th>Lap time</th>
          <th>Interval</th>
          <th>Gap to Leader</th>
        </tr>
        </thead>
        <tbody>
        <tr>
          <td>{formattedDuration}</td>
          <td>{selectedDriverIntervalData?.interval?.toFixed(3) ?? 'N/A'}</td>
          <td>{selectedDriverIntervalData?.gap_to_leader?.toFixed(3) ?? 'N/A'}</td>
        </tr>
          </tbody>
      </table>
      <div className={styles['sector-times-container']}>
        <p style={{ color: getFontColor(lapData?.segments_sector_1 ?? []), backgroundColor: getColor(lapData?.segments_sector_1 ?? []) }}>S1</p>
        <p style={{ color: getFontColor(lapData?.segments_sector_2 ?? []), backgroundColor: getColor(lapData?.segments_sector_2 ?? []) }}>S2</p>
        <p style={{ color: getFontColor(lapData?.segments_sector_3 ?? []), backgroundColor: getColor(lapData?.segments_sector_3 ?? []) }}>S3</p>
      </div>
    </div>
  );
};

export default LapTime;