import React, { useState, useEffect } from 'react';
import axios from 'axios';


function App() {
  const url = "https://pokeapi.co/api/v2/pokemon";

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();

  useEffect(() => {
    fetch(url).then(res => res.json())
      .then((data) => {
        setLoading(false);
        setPokemon(data.results);
        console.log(data);
      }, (error) => {
        setLoading(false);
        setError(error);
      })
  }, [])


  if (error) {
    return <div>Error: {error.message}</div>
  } else if (loading) {
    return <div>Loading...</div>
  } else {
    return (
      <div>
        <div>
          {pokemon.map(p => (
            <div key={p.id}>{p.name}</div>
          ))}
        </div>
      </div>
    );
  }
}


export default App;