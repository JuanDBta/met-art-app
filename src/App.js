import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Logo from './logo.svg';
import './App.css';
import NavBar from './components/NavBar';
import MyCollection from './components/MyCollection';
import Artists from './components/Artists';
import Paintings from './components/Paintings';
import Home from './components/Home';

function App() {
  return (
    <>
      <header className="App-header">
        <div className="logo-title">
          <img src={Logo} className="App-logo" alt="logo" />
          <h1 className="title gill">MET</h1>
        </div>
        <NavBar className="bar" />
      </header>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Artists" element={<Artists />} />
        <Route path="/Paintings/:artistLastName" element={<Paintings />} />
        <Route path="/MyCollection" element={<MyCollection />} />
      </Routes>
    </>

  );
}

export default App;
