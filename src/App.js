import React, { useState, useEffect } from "react";
import Pokemon from './Components/Pokemon';

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(url);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    try {
      async function fetchPokemonList(url) {
        let response = await fetch(url);
        let data = await response.json();

        setPokemon(data.results);
        return data;
      }
      fetchPokemonList(currentUrl);

    } catch (err) {
      console.error(err);
    }
  }, [currentUrl]);

  async function fetchPokemonData() {
    // 1. map over [pokemon]
    // 2.   fetch pokemon's url
    // 3.   make a temporary array
    // 4.   push fetched data to array
    // 5.   [setPokemonData] to the array
    // 6. complete
  }

  return (
    <div>
      {/* <Pokemon pokemon={ pokemon } /> */}
      {pokemon.map(p => (
        <div key={ p.name }>{ p.name }</div>
      ))}
    </div>
  );
}

export default App;
