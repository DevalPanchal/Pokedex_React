import React from 'react';

export default function Pokemon({ pokemonList }) {
    return (
        <div key={pokemonList.id}>
            <div>{pokemonList.name}</div>
            <div>{pokemonList.id}</div>
            <div>{pokemonList.height}</div>
        </div>
    )
}