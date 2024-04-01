import React, { useContext, useEffect, useState } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import { CarData, IntervalData, LapData } from '../types';


const LiveDriverInfo = () => {
  const [carData, setCarData] = useState<CarData | null>(null);
  const [lapData, setLapData] = useState<LapData[]>([]);
  const [intervalData, setIntervalData] = useState<IntervalData[]>([]);
  const [lastDateCarData, setLastDateCarData] = useState<string | null>(null);
  const [lastDateLaps, setLastDateLaps] = useState<string | null>(null);
  const [lastDateIntervals, setLastDateIntervals] = useState<string | null>(null);
  const { selectedDriverNumber } = useContext(SelectedDriverContext);
  useEffect(() => {
    console.log('selectedDriverNumber', selectedDriverNumber);
    if (selectedDriverNumber === null) return;

    const fetchDriverData = () => {
      let url = `https://api.openf1.org/v1/car_data?driver_number=${selectedDriverNumber}&session_key=latest`;
      if (lastDateCarData) {
        url += `&date>=${lastDateCarData}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const latestData = data[data.length - 1]; // Get the last item in the array
          if (latestData) {
            console.log(latestData)
            setLastDateCarData(latestData.date);
            setCarData(latestData);
          }
        });
  
        fetch(`https://api.openf1.org/v1/laps?session_key=latest&driver_number=${selectedDriverNumber}`)
        if (lastDateLaps) {
          url += `&date>=${lastDateLaps}`;
        }
  
        fetch(url)
          .then(response => response.json())
          .then(data => {
            const latestData = data[data.length - 1]; // Get the last item in the array
            if (latestData) {
              setLastDateLaps(latestData.date);
              setCarData(latestData);
            }
          });
    
      fetch(`https://api.openf1.org/v1/intervals?session_key=latest&driver_number=${selectedDriverNumber}`)
      if (lastDateIntervals) {
        url += `&date>=${lastDateIntervals}`;
      }

      fetch(url)
        .then(response => response.json())
        .then(data => {
          const latestData = data[data.length - 1]; // Get the last item in the array
          if (latestData) {
            setLastDateIntervals(latestData.date);
            setCarData(latestData);
          }
        });
    };
  
    fetchDriverData();
    const intervalId = setInterval(fetchDriverData, 1000);
  
    return () => clearInterval(intervalId);
  }, [selectedDriverNumber]);

  if (selectedDriverNumber === null) return null;

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
    <div>
      <h2>Car Data</h2>
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
    </div>
  );
};

export default LiveDriverInfo;