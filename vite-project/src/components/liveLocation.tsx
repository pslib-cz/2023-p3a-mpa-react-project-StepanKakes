import React, { useEffect, useState } from 'react';

const LiveLocation = () => {
  const [locations, setLocations] = useState([]);

  useEffect(() => {
    const fetchLocations = async () => {
      const response = await fetch('https://api.openf1.org/v1/location');
      const data = await response.json();
      setLocations(data);
    };

    fetchLocations();
    const intervalId = setInterval(fetchLocations, 5000); // Fetch every 5 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <svg width="500" height="500">
      <circle cx="250" cy="250" r="200" stroke="black" strokeWidth="3" fill="transparent" />
      {locations.map((location, index) => {
        const angle = (locations.length) * 2 * Math.PI;
        const x = 250 + 200 * Math.cos(angle);
        const y = 250 + 200 * Math.sin(angle);
        return <circle key={index} cx={x} cy={y} r="10" fill="red" />;
      })}
    </svg>
  );
};

export default LiveLocation;