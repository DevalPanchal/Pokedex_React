import React from 'react';
import { Component } from 'react';
import Pokemon from './Components/Pokemon'
import './stylesheet/style.css'

const url = "https://pokeapi.co/api/v2/pokemon/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUrl: url,
      nextPageUrl: "",
      previousPageUrl: "",
      pokemonList: [],
      pokemonData: [],
    
    }
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  componentDidMount() {
    this.getPokemon(this.state.currentUrl);
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.currentUrl !== this.state.currentUrl) {
      console.log('pokemon url has changed');
    }
  }

  async getPokemon(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data) {
        console.log(data);


        this.setState({ pokemonList: data.results, nextPageUrl: data.next, previousPageUrl: data.previous }, () => {
          this.state.pokemonList.map(async pokemon => {
            try {
              let response = await fetch(pokemon.url);
              let data = await response.json();

              if (data) {
                var temp = this.state.pokemonData;
                temp.push(data);
                this.setState({ pokemonData: temp })
              }
            } catch (error) {
              console.error(error);
            }

          })
        })
      }
    } catch (error) {
      console.error(error);
    }
  }

  handleNextPageClick() {
    this.setState({ currentPageUrl: this.state.nextPageUrl }, () => {
    
    });
  }

  handlePreviousPageClick() {
    this.setState({ currentPageUrl: this.state.nextPageUrl }, () => {
      
    });
  }



  render() {
    const { pokemonData, previousPageUrl, nextPageUrl } = this.state;

    const displayPokemon = pokemonData.map((pokemon, index) => {
      return (
        <Pokemon pokemon={pokemon} key={index}/>
      );
    });

    return (
      <div className="pokemons">
        <div className="pokemon-display">
          { displayPokemon }
        </div>
        { previousPageUrl && <button onClick={this.handlePreviousPageClick}>Previous</button>}
        { nextPageUrl && <button onClick={this.handleNextPageClick}>Next</button>}
      </div>
    );
  }
}

export default App;