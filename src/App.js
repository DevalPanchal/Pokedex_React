import React, { Component } from "react";


class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemonList: []
    }
  }

  componentDidMount() {
    const url = "https://pokeapi.co/api/v2/pokemon/";
    fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data) {
        this.setState({pokemonList: data.results}, () => {})
      }
    })
    .catch(err => console.err(err));
  }

  render() {
    return (
      <div>
        <h1>Pokedex</h1>
      </div>
    );
  }

}

export default App;
