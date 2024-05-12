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

const RpmMeter = () => {
  const { carData } = useDriverDataContext();
  const formattedRpm = carData?.rpm?.toLocaleString() || '';
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
    <div>
   <Speedometer value={carData?.rpm} fontFamily='f1' width={speedometerSize} max={15000}>
  <Background />
  <Arc arcWidth={10} />
  <Needle baseOffset={-27} circleRadius={0} offset={18} color='#ff0000' />
  <Marks step={500} lineSize={12} fontSize={0}/>
  <DangerPath offset={-5} arcWidth={10} color='rgba(255, 0, 0, 0.40)' angle={63} />
  <Progress color='rgba(39, 178, 245, 0.60)' arcWidth={10} />
  <Indicator>
    {() => (
      <g transform={`rotate(125, ${speedometerSize / 2}, ${speedometerSize / 2})`}> {/* Adjust this line */}
        <text
          fontSize={36}
          fill="#fff"
          x={speedometerSize / 2}
          y={speedometerSize * 0.58} // Adjust this value as needed
          textAnchor="middle"
          fontFamily='f1'
        >
          {formattedRpm}
        </text>
        <text
          fontSize={20} 
          fill="#fff"
          x={speedometerSize / 2}
          y={speedometerSize * 0.65} // Adjust this value as needed
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
