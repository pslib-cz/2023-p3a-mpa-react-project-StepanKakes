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

const [showLogo, setShowLogo] = useState(true);
const [windowWidth, setWindowWidth] = useState(window.innerWidth);

useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


return (
  <div className={styles['drivers-list-container']}>
  {windowWidth >= 1665 && (
    <button onClick={() => setShowLogo(!showLogo)}>Switch View</button>
  )}
      <ul className={styles['drivers-list']}>
    {driverPositions && driverPositions.map((position) => {
      const intervalInfo = intervalData
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .find(info => info.driver_number === position.driver_number);
      const driverDetail = driverDetails.find((detail: LiveDriverDetail) => detail.driver_number === position.driver_number);
      const teamName = driverDetail?.team_name.replace(/\s/g, '-');
      const imageUrl = `https://media.formula1.com/content/dam/fom-website/teams/2024/${teamName}-logo.png`;
      return (
        <li className={styles.driver} key={position.driver_number} onClick={() => setSelectedDriverNumber(position.driver_number)}>
          <p className={styles['driver__position']}>{position.position}</p>
          {windowWidth >= 1665 ? (
            showLogo ? (
              <>
                <img className={styles['driver__team-image']} src={imageUrl} alt="team logo" />
                <p className={styles['driver__name']}>{driverDetail?.full_name}</p>
              </>
            ) : (
              <>
                <div style={{ backgroundColor: '#'+driverDetail?.team_colour, width: '5px', height: '40px', borderRadius: '2px', justifySelf: 'center'}}></div>
                <p className={styles['driver__name']}>{driverDetail?.name_acronym}</p>
              </>
            )
          ) : (
            <>
              <div style={{ backgroundColor: '#'+driverDetail?.team_colour, width: '5px', height: '40px', borderRadius: '2px', justifySelf: 'center'}}></div>
              <p className={styles['driver__name']}>{driverDetail?.name_acronym}</p>
            </>
          )}
          <p className={styles['driver__interval']}>
          {position.position === 1 ? 'Interval' : '+' + (Number(intervalInfo?.interval)?.toFixed(3) ?? 'N/A')}
        </p>
        </li>
      );
    })}
  </ul>
  </div>
  
);
};

export default LiveDriversList;