import React, { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

import "../styles/Pokedex.css";

function Pokedex() {
  // useState hook to set the initial state for the search query

  const [query, setQuery] = useState([]);

  // useState hook to set the initial state for the pokemons

  let [pokemons, setPokemons] = useState([]);

  // useState hook to set the initial state for the image

  const [image, setImage] = useState([]);

  // useState hook to set the initial state for the type

  const [type, setType] = useState([]);

  // useState hook to set the initial state for the type_1

  const [type_1, setType_1] = useState([]);

  // useState hook to set the initial state for the searchResult

  let [searchResult, setSearchResult] = useState([]);

  // function to add a pokemon to the pokedex

  const addToMyPokedex = (pokemon) => {
    setPokemons([...pokemons, pokemon]);
    localStorage.setItem("pokedex", JSON.stringify(pokemons));

    console.log(pokemons, "liste du pokedex");
  };

  // function to handle the change of the input query

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  // function to initialize the pokedex from local storage

  const initPokedex = () => {
    pokemons = JSON.parse(localStorage.getItem("pokedex")) || [];
  };
  initPokedex();

  // function to handle the search event

  const search = (event) => {
    event.preventDefault();

    // fetch data from the PokeAPI using the search query

    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(query, data);
        setSearchResult([data]);

        // set the image, type and type_1 state

        setImage([data.sprites.front_default]);
        setType([data.types[0].type.name]);
        setType_1([data.types[1]?.type?.name]);
      })
      .catch((err) => console.error(err));
  };

  // useEffect hook to fetch the pokemons data and update the image, type and type_1 state

  useEffect(() => {
    pokemons.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setImage((current) => [...current, data.sprites.front_default]);

          setType((current) => [...current, data.types[0].type.name]);

          setType_1((current) => [...current, data.types[1]?.type?.name]);
        })
        .catch((err) => console.error(err))
    );
  }, [pokemons]);

  return (
    <div>
      <div align="center">
        {/* Form for searching for a Pokemon */}
        <form onSubmit={search}>
          <FormControl
            className="bar"
            class="container mr-sm-2"
            type="search"
            placeholder="Search for Pokemon"
            value={query}
            onChange={handleChange}
          />
          <div className="button">
            <button class="btn btn-dark" type="submit">
              Search
            </button>
          </div>
        </form>
      </div>
      {/* Displaying the search results as a list of cards */}
      {searchResult.map((pokemon, id) => (
        <div>
          <div class="col d-flex justify-content-center" key={id}>
            <div class="card">
              <div class="card-header">
                <h4 class="text-center">
                  {pokemon.id}
                  {"      "}
                  {pokemon.name.toUpperCase()}
                </h4>
              </div>

              <img className="img-fluid" src={image[id]} alt={pokemon.name} />

              <div class="card-text">
                <p class="text-center">
                  Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
                </p>
              </div>
              {/* Button for adding the Pokemon to the Pokedex */}
              <button
                class="btn btn-secondary"
                onClick={() => addToMyPokedex(pokemon)}
              >
                Add to Pokedex
              </button>
            </div>
          </div>
        </div>
      ))}
      <hr></hr>

      {/* Displaying a list of Pokemons */}
      <div className="container">
        <div class="row">
          {/* map through the pokemons array and display each pokemon in a card */}

          {pokemons.map((pokemon, id) => (
            <div class="col-md-3 mb-3" key={id}>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">
                    {/* display the id and name of the pokemon */}

                    {pokemon.url.replace(/[^\d]/g, "").substring(1)}
                    {"      "}
                    {pokemon.name.toUpperCase()}
                  </h4>
                </div>

                <img
                  className="img-fluid"
                  src={
                    "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                    pokemon.url.replace(/[^\d]/g, "").substring(1) +
                    ".png"
                  }
                  alt={pokemon.name}
                />

                <div class="card-text">
                  <p class="text-center">
                    {/* display the type of the pokemon */}
                    Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
                  </p>
                </div>
                <button
                  class="btn btn-secondary"
                  // on click, call the addToMyPokedex function and pass in the current pokemon

                  onClick={() => addToMyPokedex(pokemon)}
                >
                  Add to Pokedex
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
