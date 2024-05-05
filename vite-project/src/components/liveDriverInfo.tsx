import styles from '../styles/liveDriverInfo.module.css';
import PedalBar from './pedalBar';
import RpmMeter from './rpmMeter';
import SpeedMeter from './speedMeter';
import LapTime from './lapTime';
import NearbyDriversList from './nearbyDriversList';
import StintsTable from './stintsTable';
import LiveDriverPreview from './liveDriverPreview';
import LiveLocation from './liveLocation';
const LiveDriverInfo = () => {

  return (
    <div className={styles['live-driver-info-container']}>
      <LapTime/>
      <LiveDriverPreview/>
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