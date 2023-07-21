import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { SlActionUndo } from 'react-icons/sl';
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
    // Invertir el valor de isSelected (seleccionado o no seleccionado)
    const newIsSelected = !isSelected;
    dispatch(setSelected({ objectId, isSelected: newIsSelected }));
  };

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

  if (!artistPaintings || artistPaintings.length === 0) {
    return <p>No paintings found for this artist.</p>;
  }

  return (
    <div>
      <Link to="/">
        <SlActionUndo className={styles.backicon} />
      </Link>
      <h1>Artist Paintings:</h1>
      <div>
        {artistPaintings.slice(0, 20).map((painting) => (
          <div key={painting.objectID}>
            <h1>{painting.objectID}</h1>
            <h2>{painting.title}</h2>
            <img src={painting.primaryImage} alt={painting.title} className={styles.images} />
            {/* Botón para cambiar el estado isSelected de la pintura */}
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
        ))}
      </div>
    </div>
  );
};

export default Paintings;
