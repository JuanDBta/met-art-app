import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { CiMicrophoneOn, CiSettings } from 'react-icons/ci';
import { fetchArtistsByName } from '../redux/features/artists/artistsSlice';
import selectedArtists from './selectedArtists';
import styles from '../styles/Artists.module.css';
import VanGogh from '../images/vangogh.jpg';
import Renoir from '../images/Pierre-auguste-Renoir-Self-Portrait-2-.jpeg';
import Klimt from '../images/el-beso-klimt.jpg';
import Degas from '../images/degas.jpg';
import Cezanne from '../images/selbstbildnis_cezanne_E.jpg';
import Gauguin from '../images/Paul_Gauguin_111.jpg';

const Artists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.artists);
  const isLoading = useSelector((state) => state.artists.isLoading);
  const error = useSelector((state) => state.artists.error);

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    selectedArtists.forEach((artist) => {
      dispatch(fetchArtistsByName({ lastname: artist.lastname }));
    });
  }, [dispatch]);

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

  const filteredArtists = selectedArtists.filter((artist) => artist.lastname.toLowerCase().includes(searchTerm.toLowerCase()));//eslint-disable-line

  return (
    <div className={styles.artistscontainer}>
      <header>
        <h2 className={styles.pagetitle}>top artists nineteenth century</h2>
        <CiMicrophoneOn className={styles.mic} />
        <CiSettings className={styles.settings} />
      </header>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search artist by name..."
        className={styles.search}
      />
      <div className={styles.artistsection}>
        <div className={styles.gridContainer}>
          {filteredArtists.map((artist) => (
            <div key={artist.lastname} className={styles.artistsquare}>
              <Link to={`/paintings/${artist.lastname}`} className={styles.artistcard}>
                {artist.lastname === 'Van Gogh' && <img src={VanGogh} alt="" className={styles.artistimage} />}
                {artist.lastname === 'Renoir' && <img src={Renoir} alt="" className={styles.artistimage} />}
                {artist.lastname === 'Klimt' && <img src={Klimt} alt="" className={styles.artistimage} />}
                {artist.lastname === 'Degas' && <img src={Degas} alt="" className={styles.artistimage} />}
                {artist.lastname === 'Cezanne' && <img src={Cezanne} alt="" className={styles.artistimage} />}
                {artist.lastname === 'Gauguin' && <img src={Gauguin} alt="" className={styles.artistimage} />}
              </Link>
              <div className={styles.artistinfo}>
                <h3 className={styles.artistname}>{`${artist.name} ${artist.lastname}`}</h3>
                <h4 className={styles.statsnumber}>
                  {artists[artist.lastname]?.length || 0}
                  <p className={styles.stats}>paintings</p>
                </h4>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Artists;
