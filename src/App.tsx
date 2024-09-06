import React from 'react';
import './App.css';
import Actors from './components/Actors';
import Movies from './components/Movies';


const App: React.FC = () => {

  return (
    <div>
      <Movies pageSize={3} />
      <Actors  />
    </div>
  );
}

export default App;
