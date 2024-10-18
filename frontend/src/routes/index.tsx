import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from '../SignIn';
import Home from '../Home';
import { useAuth } from '../hooks/auth';
import SignUp from '../SignUp';

const Rotas: React.FC = () => {
  const { user } = useAuth();

  function RequireAuth({ children, redirectTo }: any) {
    let isAuthenticated = user !== undefined ? true : false;
    return isAuthenticated ? children : <Navigate to={redirectTo} />;
  }
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/home"
          element={
            <RequireAuth redirectTo="/">
              <Home />
            </RequireAuth>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default Rotas;
