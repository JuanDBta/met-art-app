import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import MyCollection from './components/MyCollection';
import Artists from './components/Artists';
import Paintings from './components/Paintings';

function App() {
  return (
    <>
      <header className="App-header">
        <div className="logo-title">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1 className="title">MET TOP TEN ARTISTS</h1>
        </div>
        <NavBar />
      </header>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/Paintings" element={<Paintings />} />
        <Route path="/MyCollection" element={<MyCollection />} />
      </Routes>
    </>

  );
}

export default App;
