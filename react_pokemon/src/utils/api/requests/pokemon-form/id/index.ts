import { api } from '../../../instance';
import { AxiosRequestConfig } from 'axios';

interface RequestPokemonFormParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestPokemonForm = ({ params, config }: RequestPokemonFormParams) => {
  return api.get<Pokemon>(`pokemon/${params.id}`, { ...config });
};
