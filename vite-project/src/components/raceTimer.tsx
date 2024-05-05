import { useState, useEffect } from 'react';
import { useDriverDataContext } from "../context/driverDataContext";

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

  const seconds = Math.floor((timeLeft || 0) / 1000 % 60);
  const minutes = Math.floor((timeLeft || 0) / (1000 * 60) % 60);
  const hours = Math.floor((timeLeft || 0) / (1000 * 60 * 60) % 24);
  const days = Math.floor((timeLeft || 0) / (1000 * 60 * 60 * 24));

  return (
    <div>
      {days}d {hours}h {minutes}m {seconds}s
    </div>
  );
};
export default RaceTimer;