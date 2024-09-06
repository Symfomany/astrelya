import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { getActors } from '../services/actorService';

// Interface pour le type Person (acteur)
export interface Person {
  id: number;
  lastname: string;
  firstname: string[],
}


// Fonction pour récupérer les acteurs/personnes avec pagination
const API_PERSONS_URL = `${process.env.REACT_APP_SERVER}/persons`;

export const getPersons = async (page: number = 0, size: number = 10): Promise<Person[]> => {
  try {
    const response = await axios.get<{ content: Person[] }>(`${API_PERSONS_URL}?page=${page}&size=${size}`);

    if (response.data && Array.isArray(response.data.content)) {
      return response.data.content;
    } else {
      throw new Error('Format de réponse inattendu');
    }
  } catch (error: any) {
    console.error('Erreur lors de la récupération des personnes:', error.message || error);
    throw error;
  }
};

const Actors: React.FC = () => {
  const [persons, setPersons] = useState<Person[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(1); // par défaut, on suppose qu'il y a au moins une page
  const pageSize = 10;

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      try {
        const response = await getActors(page, pageSize);
        setPersons(response);
        setTotalPages(10);  // Nombre total de pages si fourni par l'API
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
