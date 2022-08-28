import { useQuery } from 'react-query';
import { requestStat } from '../../../requests';

interface UseRequestStatQueryParams {
  id: number;
}

export const useRequestStatQuery = ({ id }: UseRequestStatQueryParams) =>
  useQuery<any>(['stat', id], () => requestStat({ params: { id } }));