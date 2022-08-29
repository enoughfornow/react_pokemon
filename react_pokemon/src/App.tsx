import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { PokemonsPage, PokedexPage, PokemonPage } from './pages';
import { ROUTES } from './utils/constants';
import { Layout } from './features/layout';

import './App.css';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
        <Route path={ROUTES.POKEMONS} element={<PokemonsPage />} />
        <Route path={ROUTES.POKEMON} element={<PokemonPage />} />
        <Route path={ROUTES.POKEDEX} element={<PokedexPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
