import React from 'react';


interface PokemonProps {
  pokemon: any;
}

export const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    <div>
      <div className="flex  flex-col justify-center shadow p-10 w-96">
        <img className="w-full h-72" src={pokemon.sprites.front_default ?? ''} alt="pokemon img" />
        <h2 className=" w-full text-left capitalize font-semibold text-2xl">{pokemon.name}</h2>
      </div>
    </div>
  );
};
