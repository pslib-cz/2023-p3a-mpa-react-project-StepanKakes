import { useContext, useEffect, useState } from 'react';
import { SelectedDriverContext } from '../context/driverProvider';
import { LiveDriverDetail } from '../types';
import styles from '../styles/liveDriversList.module.css';
import { useDriverDataContext } from '../context/driverDataContext';
const LiveDriversList = () => {

const { setSelectedDriverNumber } = useContext(SelectedDriverContext);
const { driverPositions } = useDriverDataContext();
const { driverDetails } = useDriverDataContext();
const { intervalData } = useDriverDataContext();

const [showLogo, setShowLogo] = useState(true);
const [windowWidth, setWindowWidth] = useState(window.innerWidth);
const [showInterval, setShowInterval] = useState(true);


useEffect(() => {
  const handleResize = () => setWindowWidth(window.innerWidth);
  window.addEventListener('resize', handleResize);
  return () => window.removeEventListener('resize', handleResize);
}, []);


return (
  <div className={styles['drivers-list-container']}>
    {driverPositions === null ? (
      <div>Loading...</div>
    ) : (
    <>
    <div className={styles['buttons-container']}>
          {windowWidth >= 1665 && (
            <button
              className={styles['switch-button']}
              onClick={() => setShowLogo(!showLogo)}
            >
              <img
                src="./src/images/icons/mingcute_arrows-left-line.svg"
                alt="Switch View"
                style={!showLogo ? { transform: 'scaleX(-1)' } : {}} />
            </button>
          )}
          <label htmlFor="toggle" className={styles['toggle-label']}>
            <input
              className={styles['input']}
              id="toggle"
              type="checkbox"
              onChange={() => setShowInterval(!showInterval)}
              checked={!showInterval} />
            <div className={styles['toggle-wrapper']}>
              <span className={styles['selector']}></span>
            </div>
          </label>
        </div><ul className={styles['drivers-list']}>
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
                        <div style={{ backgroundColor: '#' + driverDetail?.team_colour, width: '5px', height: '40px', borderRadius: '2px', justifySelf: 'center' }}></div>
                        <p className={styles['driver__name']}>{driverDetail?.name_acronym}</p>
                      </>
                    )
                  ) : (
                    <>
                      <div style={{ backgroundColor: '#' + driverDetail?.team_colour, width: '5px', height: '40px', borderRadius: '2px', justifySelf: 'center' }}></div>
                      <p className={styles['driver__name']}>{driverDetail?.name_acronym}</p>
                    </>
                  )}
                  <p className={styles['driver__interval']}>
                    {showInterval
                      ? (position.position === 1 ? 'Interval' : '+' + (Number(intervalInfo?.interval)?.toFixed(3) ?? 'N/A'))
                      : (position.position === 1 ? 'Leader' : '+' + (Number(intervalInfo?.gap_to_leader)?.toFixed(3) ?? 'N/A'))}
                  </p>
                </li>
              );
            })}
          </ul>
          </>
    )}
  </div>
  
);
};

export default LiveDriversList;