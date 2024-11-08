import React from 'react';
import './App.css';
import BookingList from './components/lista';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <BookingList /> {/* Renderiza o componente BookingList */}
      </header>
    </div>
  );
}

export default App;
