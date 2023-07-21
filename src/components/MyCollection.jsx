import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

  const handleRemovePainting = (lastname, objectId) => {
    // Cambiar el estado isSelected a false cuando se hace clic en el botón "Remove"
    dispatch(setSelected({ objectId, isSelected: false }));
    // Y cualquier otra lógica que desees realizar al quitar una pintura de MyCollection
    // ...
  };

  return (
    <section className={styles.collectioncontainer}>
      <div className={styles.paintings}>
        <h2 className={styles.paintingstitle}>My Paintings</h2>
        {selectedPaintings.map((artist) => (
          <div key={artist.lastname}>
            <ul className={styles.paintingslist}>
              {artist.paintings.map((painting) => (
                <li key={painting.objectID}>
                  <h3>{artist.lastname}</h3>
                  <h4>{painting.title}</h4>
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
