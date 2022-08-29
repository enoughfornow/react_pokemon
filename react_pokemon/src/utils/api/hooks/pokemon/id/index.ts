import { useQuery } from 'react-query';
import { requestPokemon } from '../../../requests';

interface UseRequestPokemonQueryParams {
  id: number;
}

export const useRequestPokemonQuery = ({
  params,
  config,
}: RequestQueryParams<UseRequestPokemonQueryParams>) =>
  useQuery<any>(['pokemon', params.id], () => requestPokemon({ params }), config);
