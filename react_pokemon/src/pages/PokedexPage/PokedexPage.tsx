import classnames from 'classnames';
import React from 'react';
import { useRequestPokemonQueries, useRequestPokemonFormQuery } from '../../utils/api/hooks';
import styles from './PokedexPage.module.css';

export const PokedexPage = () => {
  const [offset, setOffset] = React.useState(6);
  const [selectedPokemonId, setSelectedPokemonId] = React.useState(1);
  const results = useRequestPokemonQueries({ offset });
  const isLoading = results.some((result) => result.isLoading);
  const { data } = useRequestPokemonFormQuery({ id: 1 });
  console.log('data', data);
  
  if (isLoading) return null;

  const pokemons = results.map((result: any) => result.data.data);
  const selectedPokemon = pokemons.find((pokemon) => selectedPokemonId === pokemon.id)!;
  console.log(selectedPokemon);
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.card}>
          <div className={styles.card_title}>
            <div className={styles.card_title_name}>{selectedPokemon.name}</div>
            <div>#00{selectedPokemon.id}</div>
          </div>
          <div className={styles.card_types}>
            {selectedPokemon.types.map(({ type }) => (
              <div className={styles.card_type}>{type.name}</div>
            ))}
          </div>
          <div>
            <img src={selectedPokemon.sprites.front_default ?? ''} alt="" />
          </div>
          <div className={styles.card_info}>
            <div>
              <div className={styles.card_info_title}>Stats</div>
              <ul>
                {selectedPokemon.stats.map((stat) => (
                  <li className={styles.card_info_item}>
                    {stat.stat.name} : {stat.base_stat}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <div className={styles.card_info_title}>Abilities</div>
              <ul>
                {selectedPokemon.abilities.map(({ ability }) => (
                  <li className={styles.card_info_item}>{ability.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <ul className={styles.list}>
          {pokemons.map((pokemon) => {
            const isActive = selectedPokemonId === pokemon.id;
            return (
              <li
                key={pokemon.id}
                tabIndex={0}
                role="option"
                aria-selected={isActive}
                onKeyPress={(event) => {
                  if (event.key === 'Enter') setSelectedPokemonId(pokemon.id);
                }}
                className={classnames(styles.pokemon_item, {
                  [styles.pokemon_item_active]: isActive,
                })}
                onClick={() => setSelectedPokemonId(pokemon.id)}>
                <img
                  className={styles.pokemon_item_image}
                  src={pokemon.sprites.front_default ?? ''}
                  alt="pokemon"
                />
                {pokemon.name}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
};
