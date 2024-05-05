import { useEffect, useState } from 'react';
import { Location } from '../types';
import styles from '../styles/liveLocation.module.css';
import { useDriverDataContext } from '../context/driverDataContext';
const LiveLocation = () => {
  const { locationData } = useDriverDataContext();

  return (
    <div style={{ position: "relative"}}>
    <img className={styles["map-img"]} src="./src/images/miami-track.svg" alt="" />
    {locationData?.map((location, index) => (
      <div key={index} style={{ position: "absolute", top: location.y/31 + 213, left: location.x/29.7 + 195, width: "10px", height: "10px", backgroundColor: "red", borderRadius: "50%"}}/>
    ))}
    </div>
  );
};

export default LiveLocation;