import React from 'react';

export default function Pokemon({ pokemon }) {
    return (
        <div key={pokemon.id}>
          <div ><b>{pokemon.name}</b></div>
          <div >          
            <h6 >Id: {pokemon.id}</h6>  
            <h6 >Height: {pokemon.height}</h6>  
            <h6 >Weight: {pokemon.weight}</h6>  
            <img src={pokemon.sprites.other['official-artwork']['front_default']} alt={pokemon.name} />
            {/* <img src={pokemon.sprites['back_default']} alt={pokemon.name} />                        */}
          </div>
        </div>
      )
}