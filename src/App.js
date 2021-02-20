import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Page from './Components/Page';


function App() {
  const url = "https://pokeapi.co/api/v2/pokemon";

  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [pokemon, setPokemon] = useState([]);
  const [currentPageUrl, setCurrentPageUrl] = useState(url);
  const [nextPageUrl, setNextPageUrl] = useState();
  const [previousPageUrl, setPreviousPageUrl] = useState();

  useEffect(() => {
    setLoading(true);
    let cancel;
    axios.get(currentPageUrl, {
      cancelToken: new axios.CancelToken(c => cancel = c)
    })
    fetch(url).then(res => res.json())
      .then((data) => {
        setLoading(false);

        setPokemon(data.results);
        setNextPageUrl(data.next);
        setPreviousPageUrl(data.previous);
        
        console.log(data);
      }, (error) => {
        setLoading(false);
        setError(error);
      });
      return () => {
        cancel();
      }
  }, [currentPageUrl]);

  function goToNextPage() {
    setCurrentPageUrl(nextPageUrl);
  }

  function goToPreviousPage() {
    setCurrentPageUrl(previousPageUrl);
  }

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
        <Page goToNextPage={ nextPageUrl ? goToNextPage : null } goToPreviousPage={ previousPageUrl ? goToPreviousPage : null } />
      </div>
    );
  }
}

export default App;