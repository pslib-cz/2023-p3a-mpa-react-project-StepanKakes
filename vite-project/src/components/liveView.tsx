import React, { useState } from 'react';
import LiveDriverInfo from "./liveDriverInfo";
import LiveDriversList from "./liveDriversList";
import RaceTimer from "./raceTimer";
import { useDriverDataContext } from "../context/driverDataContext";
import { useContext } from "react";
import { SelectedDriverContext } from "../context/driverProvider";

const LiveView = () => {
  const { nextRace } = useDriverDataContext();
  const { selectedDriverNumber } = useContext(SelectedDriverContext);
  const [showList, setShowList] = useState(true);

  const toggleList = () => {
    setShowList(!showList);
  };

  return (
    <>
      {nextRace?.status !== "Live" ? (
        <>
          {showList && <LiveDriversList />}
          {selectedDriverNumber !== null && <LiveDriverInfo />}
        </>
      ) : (
        <RaceTimer />
      )}
    </>
  );
};

export default LiveView;