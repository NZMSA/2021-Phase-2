import React from 'react';
import './App.css';
import { Header } from './stories/Header/Header';
import { Footer } from './stories/Footer/Footer';

function App() {
  const token = (window.location.href.match(/\?code=(.*)/)) && (window.location.href.match(/\?code=(.*)/) ?? [1]);
  return (
    <div className="App">
      <Header />
      <Footer />
    </div>
  );
}

export default App;
