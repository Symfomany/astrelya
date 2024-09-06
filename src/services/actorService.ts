import axios from 'axios';

const API_URL = `${process.env.REACT_APP_SERVER}/persons`;

// Interface pour le type Movie
export interface Actor {
  id: number;
  lastname: string;
  firstname: string[],
}

// Fonction pour récupérer les films
export const getActors = async (page:number = 0, size: number = 10000000): Promise<Actor[]> => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);

    if (response.data && Array.isArray(response.data.content)) {
    return response.data.content;
    } else {
      throw new Error('Format de réponse inattendu');
    }

  } catch (error) {
    console.error('Erreur lors de la récupération des actors:', error);
    throw error;
  }
};
