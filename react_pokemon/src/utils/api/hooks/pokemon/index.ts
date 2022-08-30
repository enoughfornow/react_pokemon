import { useInfiniteQuery, useQueries } from 'react-query';
import { requestPokemon, requestPokemons } from '../../requests';

interface UseRequestPokemonQueriesParams {
  offset: number;
}

export const useRequestPokemonsQueries = ({ offset }: UseRequestPokemonQueriesParams) =>
  useQueries<any>(
    Array.from({ length: offset }).map((_el, index) => {
      const pokemonId = index + 1;
      return {
        queryKey: ['pokemon', pokemonId],
        queryFn: () => requestPokemon({ params: { id: pokemonId } }),
      };
    }),
  );

const REQUEST_POKEMONS_LIMIT = 50;
export const useRequestPokemonInfiniteQuery = () =>
  useInfiniteQuery<any>(
    ['pokemon'],
    ({ pageParam = 0 }) =>
      requestPokemons({ params: { limit: REQUEST_POKEMONS_LIMIT, offset: pageParam } }),
    {
      getNextPageParam: (lastPokemonsData, allPokemonsData) => {
        const pokemonsCount = allPokemonsData.length * REQUEST_POKEMONS_LIMIT;
        const hasNextPage = pokemonsCount < lastPokemonsData.data.count;
        if (hasNextPage) return pokemonsCount;
      },
    },
  );
