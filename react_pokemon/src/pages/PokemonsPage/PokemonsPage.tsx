import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';

import { getPokemonId } from '../../utils/helpers/getPokemonId';
import { useRequestPokemonInfiniteQuery } from '../../utils/api/hooks/pokemon';
import { useRequestPokemonQuery } from '../../utils/api/hooks/pokemon/id';

import styles from './PokemonsPage.module.css';

// export const useDebounce = (value: any, delay: number) => {
//   const [debouncedValue, setDebouncedValue] = React.useState(value);
//   React.useEffect(() => {
//     if (!value) {
//       return setDebouncedValue(value);
//     }
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);
//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value]);
//   return debouncedValue;
// };

interface PokemonInfoProps {
  id: Pokemon['id'];
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ id }) => {
  const { data, isLoading } = useRequestPokemonQuery({ params: { id } });

  if (isLoading || !data) return null;
  const pokemon = data.data;
  return (
    <div className={styles.pokemon_info_container}>
      <div className={styles.pokemon_info_image}>
        <img src={pokemon.sprites.front_default ?? ''} alt="" />
      </div>
      <div className={styles.pokemon_info_types}>
        {pokemon.types.map(({ type }) => (
          <div className={styles.pokemon_info_type}>{type.name}</div>
        ))}
      </div>
      <div className={styles.info}>
        <div>
          <div className={styles.info_title}>Stats</div>
          <ul>
            {pokemon.stats.map((stat) => (
              <li className={styles.info_item}>
                {stat.stat.name} : {stat.base_stat}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className={styles.info_title}>Abilities</div>
          <ul>
            {pokemon.abilities.map(({ ability }) => (
              <li className={styles.info_item}>{ability.name}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export const PokemonsPage: React.FC = () => {
  const navigate = useNavigate();
  const [pokemonId, setPokemonId] = React.useState<Pokemon['id'] | null>(null);
  const { ref, inView } = useInView();
  const { data, fetchNextPage, isLoading, hasNextPage } = useRequestPokemonInfiniteQuery();
  const [isPending, startTransition] = React.useTransition();
  // const debouncedPokemonId = useDebounce(pokemonId, 1000);
  console.log('@@@@@hasNextPage: ', hasNextPage)
  React.useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, data]);

  if (isLoading || !data) return null;

  const pokemons = data.pages.reduce(
    (pokemons: NamedAPIResource[], { data }: any) => [...pokemons, ...data.results],
    [],
  );

  return (
    <div className="container">
      <div className={styles.pokemons_container}>
        {pokemons.map((pokemon: any, index: number) => {
          const id = index + 1;
          return (
            <div
              role="button"
              tabIndex={0}
              onKeyPress={(event) => {
                if (event.key === 'Enter') {
                  if (pokemonId === id) {
                    return navigate(`/pokemon/${id}`);
                  }
                  setPokemonId(id);
                }
              }}
              onClick={() => {
                if (pokemonId === id) {
                  return navigate(`/pokemon/${id}`);
                }
                setPokemonId(id);
              }}
              // onMouseEnter={() => setPokemonId(id)}
              // onMouseLeave={() => setPokemonId(null)}
              className={styles.pokemon_container}>
              <div key={index} className={styles.pokemon}>
                <div className={styles.pokemon_name}>{pokemon.name}</div>
                <div className={styles.pokemon_number}>{getPokemonId(id)}</div>
              </div>
              {pokemonId === id && (
                <div className={styles.pokemon_info}>
                  <PokemonInfo id={pokemonId} />
                </div>
              )}
            </div>
          );
        })}
        <div ref={ref} />
      </div>
    </div>
  );
};
