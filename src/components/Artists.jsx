import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchArtistsByName } from '../redux/features/artists/artistsSlice';
import VanGogh from '../images/vangogh.jpg';

const Artists = () => {
  const dispatch = useDispatch();
  const artists = useSelector((state) => state.artists.artists);
  const isLoading = useSelector((state) => state.artists.isLoading);
  const error = useSelector((state) => state.artists.error);

  useEffect(() => {
    // Aquí realizamos el fetch con el nombre y apellido
    dispatch(fetchArtistsByName({ name: 'Vincent', lastname: 'Van Gogh' }));
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

  // Verificamos si artists está definido y contiene datos antes de usar Object.keys()
  if (!artists || Object.keys(artists).length === 0) {
    return <p>No hay artistas disponibles.</p>;
  }

  return (
    <div>
      {Object.keys(artists).map((lastName) => (
        <div key={lastName}>
          <h3>{`${lastName}`}</h3>
          <img src={VanGogh} alt="" />
          <h4>
            Paintings:
            {artists['Van Gogh'].length}
          </h4>
        </div>
      ))}
    </div>
  );
};

export default Artists;
