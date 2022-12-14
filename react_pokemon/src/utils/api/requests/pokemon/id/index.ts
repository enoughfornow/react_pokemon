import { api } from '../../../instance';
import { AxiosRequestConfig } from 'axios';

interface RequestPokemonParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestPokemon = ({ params, config }: RequestPokemonParams) => {
  return api.get<Pokemon>(`pokemon/${params.id}`, { ...config });
};
