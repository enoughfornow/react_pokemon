import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PokemonsPage, PokedexPage } from './pages';
import { ROUTES } from './utils/constants';

import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
        <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
      </Routes>
    </BrowserRouter>
  );
};
