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

const SpeedMeter = () => {
  const { carData } = useDriverDataContext();

  return (
    <div className={styles['speedometer-container']}>
      <Speedometer value={carData?.speed} fontFamily='f1' max={400}>
        <Background />
        <Arc arcWidth={10} />
        <Needle baseOffset={-27} circleRadius={0} offset={18} color='#ff0000' />
        <Marks step={25} lineSize={12} />
        <DangerPath offset={-5} arcWidth={10} color='rgba(255, 0, 0, 0.40)' angle={63} />
        <Progress color='rgba(39, 178, 245, 0.60)' arcWidth={10} />
        <Indicator>
          {(value, textProps) => (
            <>
              <text
                {...textProps}
                fontSize={60}
                fill="#fff"
                x={250 / 2}
                y={140}
                textAnchor="middle"
                fontFamily='f1'
              >
                {value}
              </text>
              <text
                {...textProps}
                fontSize={20} 
                fill="#fff"
                x={250 / 2}
                y={165} 
                textAnchor="middle"
                fontFamily='f1'
              >
                km/h
              </text>
              <text
                {...textProps}
                fontSize={24} 
                fill="#fff"
                x={250 / 2}
                y={210} 
                textAnchor="middle"
                fontFamily='f1'
              >
                 {carData?.n_gear}
              </text>
            </>
          )}
        </Indicator>
      </Speedometer>
    </div>
  );
};

export default SpeedMeter;
