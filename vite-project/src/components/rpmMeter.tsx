import React from 'react';
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
      <Speedometer value={carData?.rpm} fontFamily='f1' max={15000}>
        <Background />
        <Arc arcWidth={10} />
        <Needle baseOffset={-27} circleRadius={0} offset={18} color='#ff0000' />
        <Marks step={500} lineSize={12} />
        <DangerPath offset={-5} arcWidth={10} color='rgba(255, 0, 0, 0.40)' angle={63} />
        <Progress color='rgba(39, 178, 245, 0.60)' arcWidth={10} />
        <Indicator>
          {(value, textProps) => (
            <>
              <text
                {...textProps}
                fontSize={36}
                fill="#fff"
                x={250 / 2}
                y={130}
                textAnchor="middle"
                fontFamily='f1'
              >
                {formattedRpm}
              </text>
              <text
                {...textProps}
                fontSize={20} 
                fill="#fff"
                x={250 / 2}
                y={155} 
                textAnchor="middle"
                fontFamily='f1'
              >
                rpm
              </text>
            </>
          )}
        </Indicator>
      </Speedometer>
    </div>
  );
};

export default RpmMeter;
