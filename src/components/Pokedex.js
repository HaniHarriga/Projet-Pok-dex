import React, { useState, useEffect } from "react";
import { FormControl } from "react-bootstrap";

import "../styles/Pokedex.css";

function Pokedex() {
  const [query, setQuery] = useState("");
  let [pokemons, setPokemons] = useState([]);
  const [image, setImage] = useState([]);
  const [type, setType] = useState([]);
  const [type_1, setType_1] = useState([]);

  let [searchResult, setSearchResult] = useState([]);

  const addToMyPokedex = (pokemon) => {
    setPokemons([...pokemons, pokemon]);
    localStorage.setItem("pokedex", JSON.stringify(pokemons));

    console.log(pokemons, "liste du pokedex");
  };
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const initPokedex = () => {
    pokemons = JSON.parse(localStorage.getItem("pokedex")) || [];
  };
  initPokedex();

  const search = (event) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(query, data);
        setSearchResult([data]);

        setImage([data.sprites.front_default]);
        setType([data.types[0].type.name]);
        setType_1([data.types[1]?.type?.name]);
      })
      // .then(setImage([]))
      // .then(setType(""))
      // .then(setType_1(""))
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    pokemons.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setImage((current) => [...current, data.sprites.front_default]);

          setType((current) => [...current, data.types[0].type.name]);

          setType_1((current) => [...current, data.types[1]?.type?.name]);
        })
        // .then(setImage([]))
        // .then(setType(""))
        // .then(setType_1(""))
        .catch((err) => console.error(err))
    );
  }, [pokemons]);

  return (
    <div>
      <div align="center">
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

      <div className="container">
        <div class="row">
          {pokemons.map((pokemon, id) => (
            <div class="col-md-3 mb-3" key={id}>
              <div class="card">
                <div class="card-header">
                  <h4 class="text-center">
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
                    Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Pokedex;
