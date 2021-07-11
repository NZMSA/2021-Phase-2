import React from 'react';
import './App.css';
import { Header } from './stories/Header/Header';

function App() {
  const token = (window.location.href.match(/\?code=(.*)/)) && (window.location.href.match(/\?code=(.*)/) ?? [1]);
  return (
    <div className="App">
      <Header />
      {`${token}`}
    </div>
  );
}

export default App;
