import React, { useEffect, useState } from 'react';
import { getMovies, Movie } from '../services/movieService';
import './Movies.css'; // Assure-toi d'importer un fichier CSS pour le style

interface MoviesProps {
  pageSize: number;  // Nombre de films à afficher par page (ex: 3)
}

const Movies: React.FC<MoviesProps> = ({ pageSize }) => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1); // par défaut, on suppose qu'il y a au moins une page

   useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        const response = await getMovies(page, pageSize);
        setMovies(response);
        setTotalPages(pageSize);
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des films');
        setLoading(false);
      }
    };
    fetchMovies();
  }, [page]);




  const handleNextPage = () => {
    if (page < totalPages - 1) {
      setPage(page + 1);
    }
  };

  const handlePrevPage = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Liste des films</h1>
      <table className="movies-table">
        <thead>
          <tr>
            <th>Titre</th>
          </tr>
        </thead>
        <tbody>
          {movies.length && movies.map((movie) => (
            <tr key={movie.id}>
              <td>{movie.title}</td>
            </tr>
          ))}
        </tbody>
      </table>


      {/* Pagination */}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Précédent
        </button>
        <span style={{ margin: '0 10px' }}>Page {page + 1} sur {totalPages}</span>
            {page < totalPages - 1 && (
            <button onClick={handleNextPage}>
            Suivant
            </button>
        )}
      </div>


    </div>
  );
}

export default Movies;
