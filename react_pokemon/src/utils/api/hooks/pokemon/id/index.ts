import { useQuery } from 'react-query';
import { requestPokemon } from '../../../requests';

interface UseRequestPokemonQueryParams {
  id: number;
}

export const useRequestPokemonQuery = ({ id }: UseRequestPokemonQueryParams) =>
  useQuery<any>(['pokemon', id], () => requestPokemon({ params: { id } }));
