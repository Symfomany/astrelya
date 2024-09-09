import React, { useEffect, useState } from 'react';
import { getMovies } from '../services/movieService';
import MoviesPropsInterface from '../services/MoviesPropsInterface';
import {  getActor } from '../services/actorService';
import { Actor } from '../services/ActorInterface';
import { Movie } from '../services/MoviesInterface';

import './Movies.scss'; 

/**
 * All Movies
 * @param pageSize 
 * @returns 
 */
const Movies: React.FC<MoviesPropsInterface> = ({ pageSize }) => {

  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [selectedPerson, setSelectedPerson] = useState<Actor | null>(null); 
  const [personLoading, setPersonLoading] = useState<boolean>(false); 


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
  }, [pageSize]);


  const handleActorClick = async (actorId: number) => {
    setPersonLoading(true);
    try {
      const personData = await getActor(actorId);
      setSelectedPerson(personData); // Charger l'acteur sélectionné
      setPersonLoading(false);
    } catch (error) {
      console.error("Erreur lors de la récupération des détails de l'acteur", error);
      setPersonLoading(false);
    }
  };



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
      
      {personLoading ? (
        <div>Chargement des détails de l'acteur...</div>
      ) : selectedPerson ? (
        <div>
          <h2>Détails de l'acteur</h2>
          <p>Prénom : {selectedPerson.firstname}</p>
          <p>Nom : {selectedPerson.lastname}</p>
        </div>
      ) : null}

      <table className="movies-table">
        <thead>
          <tr>
            <th>Titre</th>
          </tr>
        </thead>
        <tbody>
          {movies.length && movies.map((movie) => (
            <tr key={movie.id}>
              <td>
                <h3>{movie.title}</h3>
                 <hr />
                 <p>Genre: {movie.genres.map((e) => e)}</p>
                  <ul>
                    {movie.actors.map((actorId) => (
                      <li key={actorId}>
                        <button onClick={() => handleActorClick(actorId)}>
                          Voir les détails de l'acteur {actorId}
                        </button>
                      </li>
                    ))}
                  </ul>
               </td>
            </tr>
          ))}
        </tbody>
      </table>


   
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
