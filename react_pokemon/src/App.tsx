import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useQuery } from 'react-query';

import { PokemonsPage } from './pages';

import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<PokemonsPage />} />
      </Routes>
    </BrowserRouter>
  );
};
