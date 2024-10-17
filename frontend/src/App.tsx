import './App.css';
import { AuthProvider } from './hooks/auth';
import 'rsuite/dist/rsuite.min.css';

import Rotas from './routes';

function App() {
  return (
    <>
      <AuthProvider>
        <Rotas />
      </AuthProvider>
    </>
  );
}

export default App;
