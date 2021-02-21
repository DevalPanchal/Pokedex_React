import React from 'react'

export default function PokemonList({ pokemon }) {
    return (
        <div>
            <img src={pokemon.sprites}></img>
            <h1>{ pokemon.name }</h1>
            <h3>{ pokemon.weight }</h3>
            <h3>{ pokemon.height }</h3>
        </div>
    )
}
