import { api } from '../../instance';
import { AxiosRequestConfig } from 'axios';

interface RequestPokemonParams {
  params: { limit: number; offset: number };
  config?: AxiosRequestConfig;
}

export const requestPokemons = ({ params, config }: RequestPokemonParams) => {
  return api.get<NamedAPIResourceList>(`pokemon`, { params, ...config });
};
