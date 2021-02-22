import React, { useState, useEffect } from 'react';
import Pokemons from './Components/Pokemons';
import Pagination from './Components/Pagination';
import axios from 'axios';


function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios.get(currentPageUrl)
    .then(res => {
      setLoading(false);
      setNextPageUrl(res.data.next);
      setPreviousPageUrl(res.data.previous);
      setPokemon(res.data.results);
    }).catch(err => {
      setLoading(false);
      setError(err);
    })
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }
  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

  if (loading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: { error.message }</div>
  }

  return (
    <div>
      {pokemon.map(pokemons => (
        <div key={pokemons.name}>{pokemons.name}</div>
      ))}
      <Pagination goToPreviousPage={previousPageUrl ? goToPreviousPage : null} goToNextPage={nextPageUrl ? goToNextPage : null} />
    </div>
  );
}
// const [pokemon, setPokemon] = useState([]);
//   const [pokemonData, setPokemonData] = useState([]);

//   async function getPokemon() {
//     const array = [];
//     try {
//       const url = "https://pokeapi.co/api/v2/pokemon/";
//       const res = await axios.get(url);
//       console.log(res.data);
//     } catch (error) {
//       console.error(error);
//     }
//   }

export default App;