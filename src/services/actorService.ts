import axios from 'axios';
import { API_URL } from '../config';
import { Actor } from './ActorInterface';


const API_PERSONS_URL = `${API_URL}/persons`;


/**
 * Get One actor
 * @param id 
 * @returns Person
 */
export const getActor = async (id: number): Promise<Actor> => {
  try {
    const response = await axios.get<Actor>(`${API_PERSONS_URL}/${id}`);

    if (response.data) {

      return response.data;
    } else {
      throw new Error('Format de réponse inattendu');
    }
  } catch (error: any) {
    console.error('Erreur lors de la récupération des personnes:', error.message || error);
    throw error;
  }
};

/**
 * Get All Actors by page API
 * @param page 
 * @param size 
 * @returns 
 */
export const getActors = async (page:number = 0, size: number = 10000000): Promise<Actor[]> => {
  try {
    const response = await axios.get(`${API_PERSONS_URL}?page=${page}&size=${size}`);

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
