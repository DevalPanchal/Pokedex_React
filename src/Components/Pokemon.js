import React from 'react';

export default function Pokemon({ pokemon }) {
  return (
    <div>
      {pokemon.map((poke, index) => (
        <div key={index}>{poke.name}</div>
      ))}
    </div>
  );
}