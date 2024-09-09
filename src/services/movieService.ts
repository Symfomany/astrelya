import axios from 'axios';
import { Movie } from './MoviesInterface';

const API_URL = `${process.env.REACT_APP_SERVER}/movies`;



export const getMovies = async (page:number = 0, size: number = 10000000): Promise<Movie[]>  => {
  try {
    const response = await axios.get(`${API_URL}?page=${page}&size=${size}`);
    
    if (response.data && Array.isArray(response.data.content)) {
    return response.data.content;
    } else {
      throw new Error('Format de réponse inattendu');
    }


  } catch (error) {
    console.error('Erreur lors de la récupération des films:', error);
    throw error;
  }
};
