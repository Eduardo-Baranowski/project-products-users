import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import SignIn from '../SignIn';

const Rotas: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
