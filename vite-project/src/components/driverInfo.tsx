import React from 'react';
import { DriverDetail, DriverRanking } from '../types/index';
import styles from '../styles/driverInfo.module.css';

interface Props {
  driver: DriverDetail | null;
  drivers: DriverRanking[];
}

const DriverInfo: React.FC<Props> = ({ driver, drivers }) => {
  if (!driver) {
    return <div>No driver selected</div>;
  }
  const [firstName, surname] = driver.name.split(' ');
  const firstThreeLetters = driver.name.slice(0, 3);
  const firstLetter = firstName.charAt(0);


  const today = new Date();
  const birthDate = new Date(driver.birthdate);
  const diffTime = Math.abs(today.getTime() - birthDate.getTime());
  const diffYears = Math.floor(diffTime / (1000 * 60 * 60 * 24 * 365.25)); 
  const driverRanking = drivers.find(d => d.driver.id === driver.id);
  

  function getOrdinalSuffix(position: number) {
    let j = position % 10,
        k = position % 100;
    if (j == 1 && k != 11) {
        return position + "st";
    }
    if (j == 2 && k != 12) {
        return position + "nd";
    }
    if (j == 3 && k != 13) {
        return position + "rd";
    }
    return position + "th";
}

  return (
    <div className={styles['driver-stats-container']}>
      <div className={styles['driver-container']}>
        <div className={styles['driver-name-container']}>
          <div className={styles['driver-name-flag']}>
          <h2 className={styles['driver-name']}>{firstName}</h2>
          <img className={styles['driver-flag']} src={`https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/flags/${driver.country.name}.jpg`} alt={driver.name}/>
          </div>
          <h2 className={styles['driver-surname']}>{surname}</h2>
          <p className={styles['driver-team']}>{driver.teams[0].team.name}</p>
        </div>
        <div className={styles['image-container']}>
          <img className={styles['driver-image']} src={`https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${firstLetter}/${firstThreeLetters}${driver.abbr}01_${firstName}_${surname}/${firstThreeLetters}${driver.abbr}01.png`} alt={driver.name}/>
          <img className={styles['driver-number-image']} src={`https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/${firstThreeLetters}${driver.abbr}01.png`} alt={`${driver.name}-number`} />
        </div>
      </div>
      <div className={styles['driver-info']}>
          <div className={styles['driver-career-info']}>
              <div>
              {driverRanking && <p>#{driverRanking.position.toString().padStart(2, '0')}</p>}
                <p>POS</p>
              </div>
              <div>
                {driverRanking && <p>{driverRanking.points}</p>}
                <p>PTS</p>
              </div>
              <div>
                <p>{diffYears}</p>
                <p>Age</p>
              </div>
          </div>
          <div className={styles['driver-races-info']}>
                <div>
                  <p>{driver.grands_prix_entered}</p>
                  <p>GP's</p>
                </div>
                <div>
                  <p>{driver.podiums}</p>
                  <p>podiums</p>
                </div>
                <div>
                  <p>{getOrdinalSuffix(driver.highest_race_finish.position)} <span className={styles['hrf-number']}>(x{driver.highest_race_finish.number})</span></p>
                  <p>highest race finnish</p>
                </div>
                <div>
                  <p>{driver.world_championships}</p>
                  <p>WC</p>
                </div>
              </div>
            </div>
          </div>
  );
};

export default DriverInfo;
