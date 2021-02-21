import React, { Component } from 'react';
import axios from 'axios';

const url = "https://pokeapi.co/api/v2/pokemon";  

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemon: [],
      pokemonData: [],
      currentPageUrl: url,
      nextPageUrl: '',
      previousPageUrl: ''
    }
    //this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // fetch data from the url
    fetch(url)
    // get the data in json form
    .then(res => res.json())
    .then(data => {
      // set the individual pokemon state to data.results
      this.setState( { 
        pokemon: data.results, 
        nextPageUrl: data.next, 
        previousPageUrl: data.previous 
      }, () => {
        // loop through each pokemon
        this.state.pokemon.map((p) => {
          // fetch the url associated in their object
          fetch(p.url)
          // get the data in json form
          .then(res => res.json())
          .then(pokeData => {
            // make a temporary variable of array data type
            var details = this.state.pokemonData;
            // push the individual pokemon data to the temporary array
            details.push(pokeData);
            // set the state for the pokemonData ([]) to the temporary array
            this.setState( { pokemonData: details } );
          }) 
          .catch(err => console.error(err));
        })
      } )
      console.log(data.next);
    })
    
    .catch(err => console.error(err));
  }
  
  // handleClick() {
  //   this.setState({ currentPageUrl: nextPageUrl });
  // }
  
  render() {
    
    const { pokemonData } = this.state;

    return (
      <div>
        {pokemonData.map((pokemon, _id) => (
          <div key={pokemon.name}>{ pokemon.name }
            <div></div>
          </div>
          
        ))}
        {/* <button onClick={ this.handleClick }>Previous</button> */}
        {/* <button onClick={ this.goToNextPage }>Next</button> */}
      </div>
    );
  }
    
  
}

export default App;