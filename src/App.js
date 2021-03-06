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
        //setPokemonUrlList(data.results.map(p => p.url));
      }
      fetchPokemonList(currentUrl);
      pokemon.forEach(poke => {
        fetchPokemonData(poke.url);
      });
      //fetchPokemonData(pokemon.map(p => p.url));
    } catch (err) {
      console.error(err);
    }
    
  }, [currentUrl]);

  async function fetchPokemonData(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      setPokemonData(data.results.map(p => p));
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  
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
