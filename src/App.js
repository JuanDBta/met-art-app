import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { RiFlickrFill, RiFlickrLine } from 'react-icons/ri';
import { CiWifiOn, CiBatteryFull, CiBluetooth } from 'react-icons/ci';
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
          <RiFlickrFill className="icon1" />
          <RiFlickrLine className="icon2" />
          <p className="signal gill">BELL</p>
          <CiWifiOn className="icon3" />
          <img src={Logo} className="App-logo" alt="logo" />
          <h1 className="title gill">MET</h1>
        </div>
        <NavBar />
        <CiBluetooth className="bluetooth" />
        <p className="level">100%</p>
        <CiBatteryFull className="battery" />
      </header>
      <Routes>
        <Route path="/" element={<Artists />} />
        <Route path="/Paintings/:artistLastName" element={<Paintings />} />
        <Route path="/MyCollection" element={<MyCollection />} />
      </Routes>
    </>

  );
}

export default App;
