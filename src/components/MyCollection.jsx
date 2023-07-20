import React from 'react';
import styles from '../styles/MyCollection.module.css';

function MyCollection() {
  return (
    <section className={styles.profilecontainer}>
      <div className={styles.missions}>
        <h2 className={styles.missionstitle}>My Artists</h2>
        <ul className={styles.missionslist}>
          <li>
            My first favorite artists
          </li>
        </ul>
      </div>

      <div className={styles.rockets}>
        <h2 className={styles.rocketstitle}>My Paintings</h2>
        <ul className={styles.rocketslist}>
          <li>
            My first favorite painting
          </li>
        </ul>
      </div>
    </section>
  );
}

export default MyCollection;
