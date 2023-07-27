import React from 'react';
import { CiMicrophoneOn, CiSettings } from 'react-icons/ci';
import styles from '../styles/Home.module.css';

const Home = () => {
  const info = {
    line1: 'MET ART is a website for all fans of arts. It is a Single Page App (SPA) that allows users to find his favorite artist and watch their random art-related paintings.   All these paintings are available in the Metropolitan Museum of Art, New York.',
    line2: 'You can find three sections in our webpage. In Artists section you will be able to choose your favorite artist and in the myCollection section you can save your selected paintings.  I hope you enjoy our site!!!',
  };
  return (

    <div className="home">
      <header>
        <h2 className={styles.pagetitle}>met top artists</h2>
        <CiMicrophoneOn className={styles.mic} />
        <CiSettings className={styles.settings} />
      </header>

      <div className={styles.intro}>
        <h2 className={styles.welcome}>Welcome to our page!</h2>
        <p className={styles.description}>{info.line1}</p>
        <p className={styles.description}>{info.line2}</p>
      </div>
    </div>
  );
};
export default Home;
