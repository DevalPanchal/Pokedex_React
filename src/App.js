import React, { useState, useEffect } from "react";
import Pokemon from "./Components/Pokemon";
import "./stylesheet/style.css";

const url = "https://pokeapi.co/api/v2/pokemon/";
const cachePokemon = {};

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState("");
  const [previousPageUrl, setpreviousPageUrl] = useState("");
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    fetchPokemon(currentPageUrl);
  }, [currentPageUrl]);

  async function fetchPokemon(url) {
    try {
      setLoading(false);
      let response = await fetch(url);
      let data = await response.json();
  
      if (data) {
        setPokemon(data.results);
        setNextPageUrl(data.next);
        setpreviousPageUrl(data.previous);
      }
    } catch (error) {
      console.error(error);
    }
  }

  

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) return <h1>loading...</h1>;

  return (
    <div>
      <Pokemon pokemon={ pokemon } />
      {previousPageUrl && <button onClick={goToPreviousPage}>previous</button>}
      {nextPageUrl && <button onClick={goToNextPage}>next</button>}
    </div>
  );
}

export default App;