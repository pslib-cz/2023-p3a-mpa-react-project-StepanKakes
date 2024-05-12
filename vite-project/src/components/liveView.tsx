
import LiveDriverInfo from "./liveDriverInfo";
import LiveDriversList from "./liveDriversList";
import RaceTimer from "./raceTimer";
import { useDriverDataContext } from "../context/driverDataContext";
import { useContext } from "react";
import { SelectedDriverContext } from "../context/driverProvider";
import styles from "../styles/liveView.module.css";
const LiveView = () => {
  const { nextRace, driverPositions } = useDriverDataContext();
  const { selectedDriverNumber } = useContext(SelectedDriverContext);
  const isLoading = !driverPositions || driverPositions.length === 0;


  return (
    <>
      {nextRace?.status === "Live" && isLoading ? (
        <span className={styles["loader"]}></span>
      ) : nextRace?.status === "Live" ? (
        <>
          <LiveDriversList />
          {selectedDriverNumber !== null && <LiveDriverInfo />}
        </>
      ) : (
        <RaceTimer />
      )}
    </>
  );
};

export default LiveView;