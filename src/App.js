import React, { useState, useEffect } from "react";
import Pokemon from './Components/Pokemon';

function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState([]);
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    try {
      async function fetchPokemonList(url) {
        let response = await fetch(url);
        let data = await response.json();

        setPokemon(data.results);
        
      }
      fetchPokemonList(currentUrl);
      
    } catch (err) {
      console.error(err);
    }
    
  }, [currentUrl]);

  async function fetchPokemonData() {
    try {
      let response = await fetch(url);
      let data = response.json();



    } catch (error) {
      console.error(error);
    }
  }



  return (
    <div>
      <Pokemon pokemon={ pokemon } />
    </div>
  );
}

export default App;
