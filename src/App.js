import React, { Component } from "react";
import Pokemon from './Components/Pokemon';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemonList: [],
      pokemonData: []
    }
  }

  componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemonList: data.results}, () => {
          this.state.pokemonList.map(pokemon => {
            fetch(pokemon.url)
            .then(response => response.json())
            .then(data => {
              if (data) {
                var temp = this.state.pokemonData;
                temp.push(data);
                this.setState({ pokemonData: temp });
              }
            })
            .catch(err => console.error(err));
          })
        })
      }
    })
    .catch(err => console.error(err));
  }

  render() {
    const { pokemonList } = this.state;
    const renderPokemonList = pokemonList.map((pokemon, index) => {
      return (
        <Pokemon pokemonList={pokemonList}/>
      );
    })
    return (
      <div>
        <div>
          { renderPokemonList }
        </div>
      </div>
    );
  }

}

export default App;
