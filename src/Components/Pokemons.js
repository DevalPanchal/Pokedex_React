import React from 'react'

export default function Pokemons({ pokemon, pokemonData }) {
    return (
        <div>
            {pokemon.map(p => (
                <div key={p}>{p}</div>
            ))}
            
        </div>
    )
}
