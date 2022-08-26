import { api } from '../../../instance';
import { AxiosRequestConfig } from 'axios';

interface RequestPokemonParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestPokemon = ({ params, config }: RequestPokemonParams) => {
  return api.get(`pokemon/${params.id}`, { ...config });
};
