import { useContext } from 'react';
import { LiveDriverDetail } from '../types';
import { SelectedDriverContext } from '../context/driverProvider';
import { useDriverDataContext } from '../context/driverDataContext';
import styles from '../styles/liveDriverPreview.module.css';
const LiveDriverPreview = () => {
const { selectedDriverNumber } = useContext(SelectedDriverContext);
const { driverDetails } = useDriverDataContext();

const selectedDriverDetail = driverDetails.find((detail: LiveDriverDetail) => detail.driver_number === selectedDriverNumber);
const [firstName, surname] = selectedDriverDetail?.full_name.split(' ') ?? [];
const firstThreeLetters = selectedDriverDetail?.full_name.slice(0, 3);
const firstLetter = firstName?.charAt(0);


  return (
    <div className={styles['ldp-container']}>
      <img className={styles['driver-image']} src={`https://media.formula1.com/d_driver_fallback_image.png/content/dam/fom-website/drivers/${firstLetter}/${firstThreeLetters}${selectedDriverDetail?.name_acronym}01_${firstName}_${surname}/${firstThreeLetters}${selectedDriverDetail?.name_acronym}01.png`} alt={selectedDriverDetail?.full_name}/>
        <img className={styles['driver-number-image']} src={`https://media.formula1.com/d_default_fallback_image.png/content/dam/fom-website/2018-redesign-assets/drivers/number-logos/${firstThreeLetters}${selectedDriverDetail?.name_acronym}01.png`} alt={`${selectedDriverDetail?.full_name}-number`} />
      <h2 className={styles["driver-name"]}>{selectedDriverDetail?.full_name}</h2>
    </div>
  );
};

export default LiveDriverPreview;