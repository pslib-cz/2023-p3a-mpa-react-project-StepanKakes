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
import { useEffect, useState } from 'react';

const SpeedMeter = () => {
  const { carData } = useDriverDataContext();
  const [speedometerSize, setSpeedometerSize] = useState(300);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 1445) {
        setSpeedometerSize(250);
      } else {
        setSpeedometerSize(300);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize(); // Call the function initially to set the size based on the current viewport width

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className={styles['speedometer-container']}>
      <Speedometer value={carData?.speed} fontFamily='f1' width={speedometerSize} max={400}>
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
                x={speedometerSize / 2}
                y={speedometerSize * 0.57}
                textAnchor="middle"
                fontFamily='f1'
              >
                {value}
              </text>
              <text
                {...textProps}
                fontSize={20} 
                fill="#fff"
                x={speedometerSize / 2}
                y={speedometerSize * 0.65}
                textAnchor="middle"
                fontFamily='f1'
              >
                km/h
              </text>
              <text
                {...textProps}
                fontSize={24} 
                fill="#fff"
                x={speedometerSize / 2}
                y={speedometerSize * 0.8}
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
