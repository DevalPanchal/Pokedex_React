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

  

  return (
    <div>
      {/* <Pokemon pokemon={ pokemon } /> */}
      {pokemonData.map(p => (
        <div key={ p.name }>{ p.name }</div>
      ))}
    </div>
  );
}

export default App;
