import { useQuery } from 'react-query';
import { requestPokemonForm } from '../../../requests';

interface UseRequestPokemonFormQueryParams {
  id: number;
  config?: any;
}

export const useRequestPokemonFormQuery = ({ id }: UseRequestPokemonFormQueryParams) =>
  useQuery<any>(['pokemon-form', id], () => requestPokemonForm({ params: { id } }));
