import React from 'react';
import Movies from './Movies';

/**
 * Component 3 last Movies
 * @returns 
 */
const LastMovies: React.FC = () => {

    const nbMovies: number = 3;

   return <Movies pageSize={nbMovies} />;

};

export default LastMovies;

