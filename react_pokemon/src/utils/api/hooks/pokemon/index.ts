import { useQueries } from 'react-query';
import { requestPokemon } from '../../requests';

interface UseRequestPokemonQueriesParams {
  offset: number;
}

export const useRequestPokemonQueries = ({ offset }: UseRequestPokemonQueriesParams) =>
  useQueries<any>(
    Array.from({ length: offset }).map((_el, index) => {
      const pokemonId = index + 1;
      return {
        queryKey: ['pokemon', index],
        queryFn: () => requestPokemon({ params: { id: pokemonId } }),
      };
    }),
  );
