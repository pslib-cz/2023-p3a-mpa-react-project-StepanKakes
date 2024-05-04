import { useContext, useEffect, useState } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import { LiveDriverDetail, DriverPosition } from '../types';
import styles from '../styles/liveDriversList.module.css';
import { useDriverDataContext } from '../context/driverDataContext';
const LiveDriversList = () => {

const { setSelectedDriverNumber } = useContext(SelectedDriverContext);
const { driverPositions } = useDriverDataContext();
const { driverDetails } = useDriverDataContext();
const { intervalData } = useDriverDataContext();

return (
  <ul className={styles['drivers-list']}>
    {driverPositions && driverPositions.map((position) => {
      const intervalInfo = intervalData.find(info => info.driver_number === position.driver_number);
      const driverDetail = driverDetails.find((detail: LiveDriverDetail) => detail.driver_number === position.driver_number);
      const teamName = driverDetail?.team_name.replace(/\s/g, '-');
      const imageUrl = `https://media.formula1.com/content/dam/fom-website/teams/2024/${teamName}-logo.png`;
      return (
        <li className={styles.driver} key={position.driver_number} onClick={() => setSelectedDriverNumber(position.driver_number)}>
          <p className={styles['driver__position']}>{position.position}</p>
          <img className={styles['driver__team-image']} src={imageUrl} alt="team-logo" />
          <p className={styles['driver__name']}>{driverDetail?.full_name}</p>
          <p className={styles['driver__interval']}>+2.321{intervalInfo?.interval}</p>
        </li>
      );
    })}
  </ul>
);
};

export default LiveDriversList;