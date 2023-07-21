import React from 'react';
import { useSelector } from 'react-redux';
import styles from '../styles/MyCollection.module.css';

function MyCollection() {
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

  return (
    <section className={styles.collectioncontainer}>
      <div className={styles.paintings}>
        <h2 className={styles.paintingstitle}>My Paintings</h2>
        {selectedPaintings.map((artist) => (
          <div key={artist.lastname}>
            <h3>{artist.lastname}</h3>
            <ul className={styles.paintingslist}>
              {artist.paintings.map((painting) => (
                <li key={painting.objectID}>
                  <h4>{painting.title}</h4>
                  <img src={painting.primaryImage} alt={painting.title} className={styles.paintingImage} />
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
