import React from 'react';
import Actors from './components/Actors';
import Movies from './components/Movies';
import LastMovies from './components/LastMovies';

import './App.scss';

/**
 * Main App in TS
 * @returns 
 */
const App: React.FC = () => {

  return (
    <div>
      <h3>3 derniers films</h3>
      <LastMovies />
       <h3>Tous les films</h3>
      <Movies pageSize={3} />
        <h3>Tous les acteurs</h3>
      <Actors  />
    </div>
  );
}

export default App;
