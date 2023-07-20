import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { SlActionUndo } from 'react-icons/sl';
import { fetchArtistPaintings } from '../redux/features/paintings/paintingsSlice';
import styles from '../styles/Paintings.module.css';

const Paintings = () => {
  const dispatch = useDispatch();
  const vanGoghObjectIDs = useSelector((state) => state.artists.artists['Van Gogh']);
  const artistPaintings = useSelector((state) => state.paintings.artistPaintings);
  const isLoading = useSelector((state) => state.paintings.isLoading);
  const error = useSelector((state) => state.paintings.error);

  // Realiza el fetch para cada uno de los IDs en vanGoghObjectIDs
  useEffect(() => {
    vanGoghObjectIDs.forEach((objectId) => {
      dispatch(fetchArtistPaintings(objectId));
    });
  }, [dispatch, vanGoghObjectIDs]);

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
      <a href="/" className={styles.backicon}>
        <SlActionUndo className={styles.backicon} />
      </a>
      <h1>Artist Paintings:</h1>
      <div>
        {artistPaintings.slice(0, 5).map((obj) => (
          <div key={obj.objectID}>
            <h1>{obj.objectID}</h1>
            <h2>{obj.title}</h2>
            <img src={obj.primaryImage} alt={obj.title} className={styles.images} />
            {/* Render other data properties */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paintings;
