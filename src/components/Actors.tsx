import React, { useEffect, useState } from 'react';
import { getActors } from '../services/actorService';
import { Actor } from '../services/ActorInterface';



const Actors: React.FC = () => {
  const [persons, setPersons] = useState<Actor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1); 
  const pageSize = 10;

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      try {
        const response = await getActors(page, pageSize);
        setPersons(response);
        setTotalPages(10);  
        setLoading(false);
      } catch (err) {
        setError('Erreur lors de la récupération des acteurs');
        setLoading(false);
      }
    };

    fetchPersons();
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

  return (
    <div>
      <h2>Liste des acteurs/personnes</h2>
      {loading ? (
        <div>Chargement des acteurs...</div>
      ) : error ? (
        <div>{error}</div>
      ) : (
        <ul>
          {persons.map((person) => (
            <li key={person.id}>
              <strong>{person.lastname}</strong> -  {person.firstname}
            </li>
          ))}
        </ul>
      )}
      <div style={{ marginTop: '20px' }}>
        <button onClick={handlePrevPage} disabled={page === 0}>
          Précédent
        </button>
        <span style={{ margin: '0 10px' }}>Page {page + 1} sur {totalPages}</span>
        <button onClick={handleNextPage} disabled={page >= totalPages - 1}>
          Suivant
        </button>
      </div>
    </div>
  );
};

export default Actors;
