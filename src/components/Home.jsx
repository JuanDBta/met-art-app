import React from 'react';
import { CiMicrophoneOn, CiSettings } from 'react-icons/ci';
import styles from '../styles/Home.module.css';

const Home = () => {
  const info = {
    line1: 'Math magicians is a website for all fans of mathematics. It is a Single Page App (SPA) that allows users to make simple calculations and read a random art-related quote.',
    line2: 'You can find three sections in our webpage.  This is our welcome section.  In Calculator section you will be able to make simple calculations and in the Quote section you can find an inspirational quote to share some wisdom with you.  I hope you enjoy our site!!!',
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
