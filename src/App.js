import React, { useState, useEffect } from 'react';
import Pokemons from './Components/Pokemons';
import Page from './Components/Page';
import axios from 'axios';


function App() {
  const url = "https://pokeapi.co/api/v2/pokemon/";

  const [pokemon, setPokemon] = useState([]);
  const [pokemonData, setPokemonData] = useState([]);

  const [currentURL, setCurrentURL] = useState(url);
  const [newURL, setNewURL] = useState();
  const [prevURL, setPrevURL] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    
    let cancel;
    axios.get(currentURL, {
      cancelToken: new axios.CancelToken(c => cancel = c)

    }).then(res => {
      console.log(res.data);
      const pokemonDataUrls = [];

      setLoading(false);
      setNewURL(res.data.next);
      setPrevURL(res.data.previous);
      setPokemon(res.data.results.map(p => p.name));

      pokemonDataUrls.push(res.data.results.map(u => u.url));

      setPokemonData(res.data.results.map(d => d.url));
    });
    return () => {
      cancel()
    }
  }, [currentURL]);

  function nextPage() {
    setCurrentURL(newURL);
  }

  function prevPage() {
    setCurrentURL(prevURL);
  }

  if (loading) {
    return "Loading ...";
  }

  return (
    <div>
      <Pokemons pokemon={ pokemon } pokemonData={ pokemonData }/>
      <Page nextPage={newURL ? nextPage : null} prevPage={prevURL ? prevPage : null }/>
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