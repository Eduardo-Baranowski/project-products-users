import React, { createContext, useCallback, useState, useContext } from 'react';
import api from '../services/api';

interface UserState {
  cpf: string;
  id: string;
}

interface AuthState {
  token: string;
  user: UserState;
}

interface SignInCredentials {
  cpf: string;
  password: string;
}

interface AuthContextData {
  user: UserState;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider = ({ children }: any) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@txai:token');
    const user = localStorage.getItem('@txai:user');

    if (token && user) {
      api.defaults.headers.common.Authorization = `${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });
  const signIn = useCallback(async ({ cpf, password }: SignInCredentials) => {
    const response = await api.post('auth', {
      cpf,
      password,
    });
    const { access_token, user } = response.data;

    localStorage.setItem('@txai:token', `bearer ${access_token}`);
    localStorage.setItem('@txai:user', JSON.stringify(user));

    api.defaults.headers.common.Authorization = `${access_token}`;
    setData({ token: access_token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@txai:token');
    localStorage.removeItem('@txai:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within and AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
