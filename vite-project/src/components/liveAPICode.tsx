import React, { useEffect, useState } from 'react';

interface RaceData {
  session_key: number;
  meeting_key: number;
  driver_number: number;
  date: string;
  position: number;
}

interface DriverDetails {
  session_key: number;
  meeting_key: number;
  broadcast_name: string;
  full_name: string;
  driver_number: number;
}

interface CarData {
  meeting_key: number;
  session_key: number;
  driver_number: number;
  date: string;
  rpm: number;
  speed: number;
  n_gear: number;
  throttle: number;
  drs: number;
  brake: number;
}

const LiveDataDashboard: React.FC = () => {
  const [raceData, setRaceData] = useState<RaceData[]>([]);
  const [driverDetails, setDriverDetails] = useState<DriverDetails | null>(null);
  const [carData, setCarData] = useState<CarData[]>([]);

  useEffect(() => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch('https://api.openf1.org/v1/position?meeting_key=latest');
        const newData: RaceData[] = await response.json();
        setRaceData(newData);
      } catch (error) {
        console.error('Error fetching updated race data:', error);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleDriverSelect = async (driverNumber: number) => {
    try {
      const response = await fetch(`https://api.openf1.org/v1/drivers?driver_number=${driverNumber}&session_key=latest`);
      const data: DriverDetails[] = await response.json();
      setDriverDetails(data[0]);

      const carDataResponse = await fetch(`https://api.openf1.org/v1/car_data?driver_number=${driverNumber}&session_key=latest`);
      const carData: CarData[] = await carDataResponse.json();
      setCarData(carData);
    } catch (error) {
      console.error('Error fetching driver details:', error);
    }
  };

  return (
    <div>
      {/* Render race data */}
      <h2>Race Data</h2>
      <ul>
        {raceData.map((data, index) => (
          <li key={index} onClick={() => handleDriverSelect(data.driver_number)}>
            {`Driver Number: ${data.driver_number}, Position: ${data.position}`}
          </li>
        ))}
      </ul>

      {/* Render selected driver details */}
      {driverDetails && (
        <div>
          <h2>Driver Details</h2>
          <p>{`Full Name: ${driverDetails.full_name}, Broadcast Name: ${driverDetails.broadcast_name}`}</p>

          {/* Render car data */}
          <h3>Car Data</h3>
          {carData.map((data, index) => (
            <div key={index}>
              <p>{`RPM: ${data.rpm}, Speed: ${data.speed}, Gear: ${data.n_gear}, Throttle: ${data.throttle}, Brake: ${data.brake}`}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default LiveDataDashboard;