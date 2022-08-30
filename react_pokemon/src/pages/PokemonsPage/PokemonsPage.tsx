import React from 'react';
import { useInView } from 'react-intersection-observer';

import { getPokemonId } from '../../utils/helpers/getPokemonId';
import { useRequestPokemonInfiniteQuery } from '../../utils/api/hooks/pokemon';

import styles from './PokemonsPage.module.css';
import { useRequestPokemonQuery } from '../../utils/api/hooks/pokemon/id';

interface PokemonInfoProps {
  id: Pokemon['id'];
}

export const PokemonInfo: React.FC<PokemonInfoProps> = ({ id }) => {
  const { data, isLoading } = useRequestPokemonQuery({ params: { id } });

  if (isLoading || !data) return null;

  return <div>sdfsdf</div>;
};

export const PokemonsPage: React.FC = () => {
  const [pokemonId, setPokemonId] = React.useState<Pokemon['id'] | null>(null);
  const { ref, inView } = useInView();

  const { data, fetchNextPage, isLoading } = useRequestPokemonInfiniteQuery();

  React.useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

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
              onMouseEnter={() => setPokemonId(id)}
              onMouseLeave={() => setPokemonId(null)}
              className={styles.pokemon_container}>
              <div key={index} className={styles.pokemon}>
                <div className={styles.pokemon_name}>{pokemon.name}</div>
                <div className={styles.pokemon_number}>{getPokemonId(id)}</div>
              </div>
              {pokemonId === id && (
                <div className={styles.pokemon_info}>
                  <PokemonInfo id = {pokemonId}/>
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
