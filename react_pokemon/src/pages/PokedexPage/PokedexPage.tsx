import React from 'react';
import { useRequestPokemonQueries } from '../../utils/api/hooks/pokemon';
import styles from './PokedexPage.module.css';

export const PokedexPage = () => {
  const [offset, setOffset] = React.useState(20);
  const results = useRequestPokemonQueries({ offset });
  const isLoading = results.some((result) => result.isLoading);

  if (isLoading) return null;

  const pokemons = results.map((result: any) => result.data.data);

  return (
    <div className={styles.page_container}>
      <div className={styles.content_container}>
        <div>cart</div>
        <ul className={styles.list_container}>
          {pokemons.map((pokemon) => (
            <li className={styles.pokemon_item}>
              <img
                className={styles.pokemon_item_image}
                src={pokemon.sprites.front_default ?? ''}
                alt="pokemon"
              />
              {pokemon.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
