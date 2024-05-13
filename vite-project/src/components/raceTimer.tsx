import { useState, useEffect } from 'react';
import { useDriverDataContext } from "../context/driverDataContext";
import styles from '../styles/raceTimer.module.css';
const RaceTimer = () => {
  const { nextRace } = useDriverDataContext();
  const [timeLeft, setTimeLeft] = useState<number>();

useEffect(() => {
    const countdown = setInterval(() => {
        const now = new Date().getTime();
        const raceDate = nextRace?.date ? new Date(nextRace.date).getTime() : 0;
        const distance = raceDate - now;

        setTimeLeft(Math.max(distance, 0));

        if (distance < 0) {
            clearInterval(countdown);
        }
    }, 1000);

    return () => clearInterval(countdown);
}, [nextRace]);

const seconds = Math.floor((timeLeft || 0) / 1000 % 60).toString().padStart(2, '0');
const minutes = Math.floor((timeLeft || 0) / (1000 * 60) % 60).toString().padStart(2, '0');
const hours = Math.floor((timeLeft || 0) / (1000 * 60 * 60) % 24).toString().padStart(2, '0');
const days = Math.floor((timeLeft || 0) / (1000 * 60 * 60 * 24)).toString().padStart(2, '0');

  return (
    <div className={styles['timer-container']}>
      <div className={styles['timer-header']}>
      <h2><strong>{nextRace?.competition.name}</strong></h2>
      <h3>{nextRace?.type}</h3>
      </div>
      <div className={styles['time-container']}>
      <div className={styles['timer-item']}>
    <span className={styles['timer-number']}>{days}</span>
    <span className={styles['timer-label']}>days</span>
  </div>
  <div className={styles['timer-item']}>
    <span className={styles['timer-number']}>{hours}</span>
    <span className={styles['timer-label']}>hrs</span>
  </div>
  <div className={styles['timer-item']}>
    <span className={styles['timer-number']}>{minutes}</span>
    <span className={styles['timer-label']}>mins</span>
  </div>
  <div className={styles['timer-item']}>
    <span className={styles['timer-number']}>{seconds}</span>
    <span className={styles['timer-label']}>sec</span>
  </div>
</div>
      </div>
  
  );
};
export default RaceTimer;