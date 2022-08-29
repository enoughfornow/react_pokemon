import React from 'react';
import { useParams } from 'react-router-dom';
import { useRequestPokemonQuery } from '../../utils/api/hooks';

import styles from './PokemonPage.module.css';

export const PokemonPage: React.FC = () => {
  const [isGood, setIsGood] = React.useState(false);
  const params = useParams();
  const { data, isLoading } = useRequestPokemonQuery({
    params: { id: +(params.pokemonId as string) },
    config: {
      onSuccess: (data) => {
        setIsGood(true)
      },
      onError: (error) => {},
    },
  });

  return (
    <div>
      {!isLoading && <div>{isGood ? 'good' : 'bad'}</div>}

      {data?.data.name}
    </div>
  );
};
