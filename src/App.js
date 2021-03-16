import React from 'react';
import { Component } from 'react';
import Pokemon from './Components/Pokemon'

const url = "https://pokeapi.co/api/v2/pokemon";

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemonDetails: [],
    }
  }

  componentDidMount() {
    this.getPokemon(url);
  }

  async getPokemon(url) {
    try {
      let response = await fetch(url);
      let data = await response.json();

      if (data) {
        this.setState({ pokemons: data.results }, () => {
          this.state.pokemons.map(async pokemon => {
            try {
              let response = await fetch(pokemon.url);
              let data = await response.json();

              if (data) {
                var temp = this.state.pokemonDetails;
                temp.push(data);
                this.setState({ pokemonDetails: temp })
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
    const { pokemonDetails } = this.state;

    const renderedPokemonList = pokemonDetails.map((pokemon, index) => {
      return (<Pokemon pokemon={pokemon} />);
    });

    return (
      <div className="container">
        <div className="card-columns">
          {renderedPokemonList}
        </div>
      </div>
    );
  }
}

export default App;