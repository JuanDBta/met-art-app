import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistsByName } from '../redux/features/artists/artistsSlice';
import selectedArtists from './selectedArtists';
import styles from '../styles/Artists.module.css';
import VanGogh from '../images/vangogh.jpg';
import Renoir from '../images/Pierre-auguste-Renoir-Self-Portrait-2-.jpeg';
import Klimt from '../images/el-beso-klimt.jpg';
import Monet from '../images/Claude_Monet_-_Self_Portrait_with_a_Beret_-_1886-665x800.jpg';
import Cezanne from '../images/selbstbildnis_cezanne_E.jpg';

const Artists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.artists);
  const isLoading = useSelector((state) => state.artists.isLoading);
  const error = useSelector((state) => state.artists.error);

  useEffect(() => {
    selectedArtists.forEach((artist) => {
      dispatch(fetchArtistsByName({ name: artist.name, lastname: artist.lastname }));
    });
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

  return (
    <div>
      {selectedArtists.map((artist) => (
        <div key={artist.lastname}>
          <h3>{`${artist.name} ${artist.lastname}`}</h3>
          <Link to="/Paintings">
            {artist.lastname === 'Van Gogh' && <img src={VanGogh} alt="" className={styles.artistimage} />}
            {artist.lastname === 'Renoir' && <img src={Renoir} alt="" className={styles.artistimage} />}
            {artist.lastname === 'Klimt' && <img src={Klimt} alt="" className={styles.artistimage} />}
            {artist.lastname === 'Monet' && <img src={Monet} alt="" className={styles.artistimage} />}
            {artist.lastname === 'Cezanne' && <img src={Cezanne} alt="" className={styles.artistimage} />}
          </Link>
          <h4>
            Paintings:
            {artists[artist.lastname]?.length || 0}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Artists;
