import React from 'react';
import logo from './logo.svg';
import './App.css';
import BlackJack from './components/BlackJack';
import { hit, stay, start } from './components/CasinoAPI';

function App() {
  const funcs = {
    hit,
    stay,
    startGame: start,
  };
  return (
    <div className="App">
      <BlackJack {...funcs} />
    </div>
  );
}

export default App;
