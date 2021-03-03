import React, { useState, useEffect } from 'react';
//import Pokemons from './Components/Pokemons';
import Pagination from './Components/Pagination';


function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();
  const [error, setError] = useState(null);

  let pokemonDetails = [];

  useEffect(() => {
    setLoading(true);
    fetchPokemonList(currentPageUrl);
    getPokemonData();
  }, [currentPageUrl])

  async function fetchPokemonList(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();
      
      if (data) {
        setLoading(false);
        setPokemon(data.results);
        const { previous, next } = data;
        setPreviousPageUrl(previous);
        setNextPageUrl(next);
      }
      
    } catch (err) {
      setError(error);
    }
  }

  async function fetchPokemonData(id) {
    try {

      let response = await fetch(currentPageUrl + `${id}`);
      let data = await response.json();

      const name = data.name;
      const height = data.height;
      const weight = data.weight;

      console.log(name);
      console.log(height);
      console.log(weight);

      return data;
    } catch (err) {
      console.error(err);
    }
  }

  function getPokemonData() {
    
    for (let i = 1; i <= 20; i++) {
      fetchPokemonData(i);
    }
  }

  

  function goToNextPage() {
    if (nextPageUrl) {
      setCurrentPageUrl(nextPageUrl);
    }
  }
  function goToPreviousPage() {
    if (previousPageUrl) {
      setCurrentPageUrl(previousPageUrl);
    }
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

export default App;



//useEffect(() => {
  //   setLoading(true);
  //   fetchPokemonList(url);
  //   // axios.get(currentPageUrl)
  //   // .then(res => {
      
  //   //   setLoading(false);
  //   //   setNextPageUrl(res.data.next);
  //   //   setPreviousPageUrl(res.data.previous);
  //   //   setPokemon(res.data.results);

  //   //   // pokemon.map(p => {
  //   //   //   axios.get(p.url)
  //   //   //   .then(pokeData => {
  //   //   //     var details = pokemonData;
  //   //   //     details.push(pokeData);
  //   //   //     pokemonData(details);
  //   //   //   })
  //   //   // })
  //   // })
  //   // .catch(err => {
  //   //   setLoading(false);
  //   //   setError(err);
  //   // })
  // }, [currentPageUrl]);