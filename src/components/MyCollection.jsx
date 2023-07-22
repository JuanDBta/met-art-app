import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CiMicrophoneOn, CiSettings } from 'react-icons/ci';
import { setSelected } from '../redux/features/paintings/paintingsSlice';
import styles from '../styles/MyCollection.module.css';

function MyCollection() {
  const dispatch = useDispatch();

  const selectedPaintings = useSelector((state) => {
    const selected = [];
    const artistLastnames = Object.keys(state.paintings.data);
    artistLastnames.forEach((lastname) => {
      const paintings = state.paintings.data[lastname];
      const selectedPaintingsForArtist = paintings.filter((painting) => painting.isSelected);
      selected.push({ lastname, paintings: selectedPaintingsForArtist });
    });
    return selected;
  });

  const memoizedSelectedPaintings = useMemo(() => selectedPaintings, [selectedPaintings]);

  const handleRemovePainting = (lastname, objectId) => {
    dispatch(setSelected({ objectId, isSelected: false }));
  };

  return (
    <section className={styles.collectioncontainer}>
      <header className={styles.headercollection}>
        <h2 className={styles.paintingstitle}>my paintings</h2>
        <CiMicrophoneOn className={styles.mic} />
        <CiSettings className={styles.settings} />
      </header>
      <div className={styles.paintings}>
        {memoizedSelectedPaintings.map((artist) => (
          <div key={artist.lastname}>
            <ul className={styles.paintingslist}>
              {artist.paintings.map((painting) => (
                <li key={painting.objectID} className={styles.paintingscollection}>
                  <h3 className={styles.name}>{artist.lastname}</h3>
                  <h4 className={styles.title}>{painting.title}</h4>
                  <img
                    src={painting.primaryImage}
                    alt={painting.title}
                    className={styles.paintingImage}
                  />
                  <button
                    type="button"
                    className={styles.removeButton}
                    onClick={() => handleRemovePainting(artist.lastname, painting.objectID)}
                  >
                    Remove
                  </button>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export default MyCollection;
