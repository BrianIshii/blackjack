import React from 'react';
import logo from './logo.svg';
import './App.css';
import BlackJack from './components/BlackJack';
import { hit, stay, createTable, playHand, reset, bet } from './components/CasinoAPI';

function App() {
  const funcs = {
    createTable,
    bet,
    playHand,
    hit,
    stay,
    reset,
  };
  return (
    <div className="App">
      <BlackJack {...funcs} />
    </div>
  );
}

export default App;
