import React from 'react';
import { Component } from 'react';
import Pokemon from './Components/Pokemon'

const url = "https://pokeapi.co/api/v2/pokemon/";

class App extends Component {
  constructor() {
    super();
    this.state = {
      currentUrl: url,
      nextPageUrl: "",
      previousPageUrl: "",
      pokemonList: [],
      pokemonData: []
    }
    this.handleNextPageClick = this.handleNextPageClick.bind(this);
    this.handlePreviousPageClick = this.handlePreviousPageClick.bind(this);
  }

  handleNextPageClick() {
    this.setState({ currentPageUrl: this.state.nextPageUrl });
  }

  handlePreviousPageClick() {
    this.setState({ currentPageUrl: this.state.nextPageUrl });
  }

  componentDidMount() {
    this.getPokemon(this.state.currentUrl);
  }

  async getPokemon(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data) {
        console.log(data);
        this.setState({ nextPageUrl: data.next, previousPageUrl: data.previous });

        console.log(this.state.nextPageUrl);
        console.log(this.state.previousPageUrl);

        this.setState({ pokemonList: data.results }, () => {
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

  render() {
    const { pokemonList, pokemonData } = this.state;

    

    const displayPokemon = pokemonData.map((pokemon, index) => {
      return (
        <Pokemon pokemon={pokemon} />
      );
    });

    return (
      <div>
        <div>
          { displayPokemon }
        </div>
      </div>
    );
  }

}

export default App;