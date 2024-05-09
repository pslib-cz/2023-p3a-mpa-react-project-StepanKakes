import { useDriverDataContext } from '../context/driverDataContext';
import Speedometer, {
  Background,
  Arc,
  Needle,
  Progress,
  Marks,
  Indicator,
  DangerPath,
} from 'react-speedometer';

import styles from './speedometer.module.css';

const RpmMeter = () => {
  const { carData } = useDriverDataContext();
  const formattedRpm = carData?.rpm?.toLocaleString() || '';
  return (
    <div className={styles['speedometer-container']}>
      <Speedometer value={carData?.rpm} fontFamily='f1' width={300} max={15000}>
  <Background />
  <Arc arcWidth={10} />
  <Needle baseOffset={-27} circleRadius={0} offset={18} color='#ff0000' />
  <Marks step={500} lineSize={12} fontSize={0}/>
  <DangerPath offset={-5} arcWidth={10} color='rgba(255, 0, 0, 0.40)' angle={63} />
  <Progress color='rgba(39, 178, 245, 0.60)' arcWidth={10} />
  <Indicator>
    {() => (
      <g transform="rotate(125, 150, 150)"> {/* Add this line */}
        <text
          fontSize={36}
          fill="#fff"
          x={150}
          y={175}
          textAnchor="middle"
          fontFamily='f1'
        >
          {formattedRpm}
        </text>
        <text
          fontSize={20} 
          fill="#fff"
          x={150}
          y={195} 
          textAnchor="middle"
          fontFamily='f1'
        >
          rpm
        </text>
      </g>
    )}
  </Indicator>
</Speedometer>
    </div>
  );
};

export default RpmMeter;
