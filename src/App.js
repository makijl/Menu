import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import ListaDePlatillos from './components/ListaDePlatillos';
import Login from './components/Login';
import './App.css'

function App() {
  return (
    <>
    <BrowserRouter>
      <div className="App">
        <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/acceder" element={<Login />} />
            <Route path="/lista-de-platillos" element={<ListaDePlatillos />} />
        </Routes>
      </div>
    </BrowserRouter>
    </>
  );
}

export default App;
