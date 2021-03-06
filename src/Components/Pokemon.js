import React from 'react';

function handlePokemonClick(e) {
    if (!e.target) {
      return;
    }

    let pokemonFetchName = e.target.textContent;
    return pokemonFetchName;
}

export default function Pokemon({ pokemon }) {
    return (
        <div>
            {pokemon.map(p => (
                <div key={p.name} onClick={handlePokemonClick}>{p.name}</div>
            ))}
        </div>
    )
}