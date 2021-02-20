import React from 'react'

export default function Pokemons({ pokemonData }) {
    return (
        <div>
            {pokemonData.map(p => (
                <div key={p}>{p.name}</div>
            ))}
        </div>
    )
}
