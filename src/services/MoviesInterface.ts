/**
 * MovieInterface
 */
export interface Movie {
  id: number;
  title: string;
  actors: number[],
  directors: number[],
  genres: string[],
  year: number
}