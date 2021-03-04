import React, { useState, useEffect } from 'react';

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    try {
      async function fetchPokemonData(url) {
        let response = await fetch(url);
        let data = await response.json();

        setPokemon(data.results);
        getEachPokemon();
      }
      fetchPokemonData(currentUrl);
    } catch (err) {
      console.error(err);
    }
    
  }, [currentUrl]);

  function getEachPokemon() {
    pokemon.forEach(poke => {
      console.log(poke)
    });
  }

  
  return (
    <div>
      {pokemon.map(p => (
        <div key={p.name}>{p.name}</div>
      ))}
    </div>
  );
}

export default App;