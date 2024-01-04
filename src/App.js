import React, { useState } from 'react';
import axios from 'axios';

const MovieSearchApp = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    try {
      // Faites la requête à l'API TMDb avec la clé d'API et la requête de l'utilisateur
      const response = await axios.get(
        `http://api.themoviedb.org/3/search/movie?api_key=f33cd318f5135dba306176c13104506a&query=${query}`
      );

      // Mettez à jour le state avec les résultats de la recherche
      setMovies(response.data.results);
      setError(null); // Réinitialisez l'erreur s'il y en avait une
    } catch (error) {
      // Gérez les erreurs en mettant à jour le state d'erreur
      setError('Une erreur s\'est produite lors de la recherche.');
      setMovies([]); // Réinitialisez les résultats en cas d'erreur
    }
  };

  return (
    <div>
      <h1>Recherche de films</h1>
      <div>
        {/* Champ texte pour la recherche */}
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Entrez le titre du film"
        />
        {/* Bouton de recherche */}
        <button onClick={handleSearch}>Rechercher</button>
      </div>
      <div>
        {/* Affichage des résultats */}
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MovieSearchApp;
