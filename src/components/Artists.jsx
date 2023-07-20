/*
import React from 'react';
import styles from '../styles/Artists.module.css';

const Artists = () => (
  <div className={styles.rockets}>
    <div>
      <div className={styles.content}>
        <h4 className={styles.name}>Pablo Picasso</h4>
        <p className={styles.description}>
          <button type="button" className={styles.rocketreserved}>Added</button>

        </p>
        <button
          type="button"
          className={styles.cancelled}
        >
          Remove from My Collection
        </button>
        <button
          type="button"
          className={styles.reserve}
        >
          Add to My Collection
        </button>
      </div>
    </div>
  </div>
);

export default Artists;
*/

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtists } from '../redux/features/artists/artistsSlice';

const Artists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.artists);
  const isLoading = useSelector((state) => state.artists.isLoading);
  const error = useSelector((state) => state.artists.error);

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  const total = artists.length;

  return (
    <div>
      <h3>Artists</h3>
      <h2>
        Total:
        {total}
      </h2>
      <ul>
        {artists.map((artistId) => (
          <li key={artistId}>{artistId}</li>
        ))}
      </ul>
    </div>
  );
};

export default Artists;
