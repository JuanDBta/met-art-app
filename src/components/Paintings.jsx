import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { CiMicrophoneOn, CiSettings } from 'react-icons/ci';
import { FiChevronLeft } from 'react-icons/fi';
import { fetchArtistPaintings, setSelected } from '../redux/features/paintings/paintingsSlice';
import styles from '../styles/Paintings.module.css';

const Paintings = () => {
  const dispatch = useDispatch();
  const { artistLastName } = useParams();
  const objectIDs = useSelector((state) => state.artists.artists[artistLastName]);
  const artistPaintings = useSelector((state) => state.paintings.data[artistLastName]);
  const isLoading = useSelector((state) => state.paintings.isLoading);
  const error = useSelector((state) => state.paintings.error);

  useEffect(() => {
    if (!artistPaintings) {
      if (objectIDs && objectIDs.length > 0) {
        objectIDs.forEach((objectId) => {
          dispatch(fetchArtistPaintings({ objectId, lastname: artistLastName }));
        });
      }
    }
  }, [dispatch, artistPaintings, objectIDs, artistLastName]);

  const handleSelectPainting = (objectId, isSelected) => {
    const newIsSelected = !isSelected;
    dispatch(setSelected({ objectId, isSelected: newIsSelected }));
  };

  if (isLoading) {
    return <p className={styles.loading}>Loading...</p>;
  }

  if (error) {
    return (
      <p>
        Error:
        {error}
      </p>
    );
  }

  if (!artistPaintings || artistPaintings.length === 0) {
    return <p>No paintings found for this artist.</p>;
  }

  return (
    <div>
      <header>
        <Link to="/Artists">
          <FiChevronLeft className={styles.backicon} />
        </Link>
        <h2 className={styles.pagetitle}>artist paintings</h2>
        <CiMicrophoneOn className={styles.mic} />
        <CiSettings className={styles.settings} />
      </header>
      <div className={styles.paintingscontainer}>
        {artistPaintings.slice(0, 20).map((painting) => (
          <div key={painting.objectID} className={styles.paintingcard}>
            <img src={painting.primaryImage} alt={painting.title} className={styles.images} />
            <div className={styles.info}>
              <h2 className={styles.id}>{painting.objectID}</h2>
              <h3 className={styles.paintingname}>
                {painting.title}
                {painting.isSelected && (
                <button type="button" className={styles.paintingselected}>Selected</button>
                )}
              </h3>
              <h3 className={styles.medium}>{painting.medium}</h3>
              <h3 className={styles.date}>{painting.objectDate}</h3>

              {painting.isSelected ? (
                <button
                  type="button"
                  className={styles.removed}
                  onClick={() => handleSelectPainting(painting.objectID, painting.isSelected)}
                >
                  Remove from My Collection
                </button>
              ) : (
                <button
                  type="button"
                  className={styles.selected}
                  onClick={() => handleSelectPainting(painting.objectID, painting.isSelected)}
                >
                  Add to My Collection
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Paintings;
