import './App.css';
import './styles/variables.module.css';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
