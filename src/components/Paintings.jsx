import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSelector } from 'reselect';
import { fetchArtistPaintings } from '../redux/features/paintings/paintingsSlice';
import styles from '../styles/Paintings.module.css';

const selectArtists = createSelector(
  (state) => state.artists.artists,
  (artists) => artists.slice(0, 5),
);

const Paintings = () => {
  const dispatch = useDispatch();
  const slicedArtists = useSelector(selectArtists);
  const artistPaintings = useSelector((state) => state.paintings.artistPaintings);
  const isLoading = useSelector((state) => state.paintings.isLoading);
  const error = useSelector((state) => state.paintings.error);

  useEffect(() => {
    slicedArtists.forEach((artistId) => {
      dispatch(fetchArtistPaintings(artistId));
    });
  }, [dispatch, slicedArtists]);

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

  return (
    <div>
      <h1>Artist Paintings:</h1>
      <ul>
        {slicedArtists.map((artistId) => (
          <li key={artistId}>{artistId}</li>
        ))}
      </ul>

      <div>
        {artistPaintings.map((obj) => (
          <div key={obj.objectID}>
            <h1>{obj.objectID}</h1>
            <h2>{obj.title}</h2>
            <img src={obj.primaryImage} alt={obj.title} className={styles.img} />
            {/* Render other data properties */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paintings;
