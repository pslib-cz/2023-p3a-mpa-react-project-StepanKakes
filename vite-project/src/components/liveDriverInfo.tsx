import styles from '../styles/liveDriverInfo.module.css';
import PedalBar from './pedalBar';
import RpmMeter from './rpmMeter';
import SpeedMeter from './speedMeter';
import LapTime from './lapTime';
import NearbyDriversList from './nearbyDriversList';
import StintsTable from './stintsTable';
const LiveDriverInfo = () => {


  /*
  {carData && (
        <div>
          <p>Date: {carData.date}</p>
          <p>RPM: {carData.rpm}</p>
          <p>Speed: {carData.speed}</p>
          <p>Gear: {carData.n_gear}</p>
          <p>Throttle: {carData.throttle}</p>
          <p>DRS: {carData.drs}</p>
          <p>Brake: {carData.brake}</p>
        </div>
      )}

      <h2>Lap Data</h2>
      {lapData && (
        <p>Lap Duration: {lapData.lap_duration}, Lap Number: {lapData.lap_number}</p>
      )}

      <h2>Interval Data</h2>
      {intervalData !== null && intervalData.map((data, index) => (
        <p key={index}>Gap to Leader: {data.gap_to_leader}, Interval: {data.interval}</p>
      ))}
  */

  return (
    <div className={styles['live-driver-info-container']}>
      <LapTime/>
      <SpeedMeter/>
      <PedalBar pedalType="brake" />
      <PedalBar pedalType="throttle" />
      <RpmMeter/>
      <StintsTable/>
      <NearbyDriversList/>
    </div>
  );
};

export default LiveDriverInfo;