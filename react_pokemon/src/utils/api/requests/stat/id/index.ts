import { api } from '../../../instance';
import { AxiosRequestConfig } from 'axios';

interface RequestStatParams {
  params: { id: number };
  config?: AxiosRequestConfig;
}

export const requestStat = ({ params, config }: RequestStatParams) => {
  return api.get<PokemonStat>(`stat/${params.id}`, { ...config });
};
