import React, { useContext, useEffect, useState } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import { CarData, IntervalData, LapData } from '../types';
import { useDriverDataContext } from '../context/driverDataContext';

const LiveDriverInfo = () => {
  const { carData, lapData, intervalData } = useDriverDataContext();
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
      <p >Lap Duration: {lapData.lap_duration}, Lap Number: {lapData.lap_number}</p>
      )}

      <h2>Interval Data</h2>
      {intervalData && (
        <p >Gap to Leader: {intervalData.gap_to_leader}, Interval: {intervalData.interval}</p>
      )}
    </div>
  );
};

export default LiveDriverInfo;