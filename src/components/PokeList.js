import { useState, useEffect } from "react";
import "../styles/PokeList.css";

export default function PokeList() {
  //  useState hook to set the initial state for the pokemons, type and type_1

  const [pokemons, setPokemons] = useState([]);
  const [type, setType] = useState([]);
  const [type_1, setType_1] = useState([]);

  //  item is an array used to store the items of the pokedex
  let item = [];

  //  useState hook to set the initial state for the url
  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  //  function to navigate to the next page

  const next = () => {
    const newUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(newUrl);
  };

  // function to navigate to the previous page

  const previous = () => {
    const newUrl = {
      current: url.previous,
      next: url.current,
      previous: null,
    };
    setUrl(newUrl);
  };

  // function to add a pokemon to the pokedex

  const addToMyPokedex = (pokemon) => {
    item.push(pokemon);
    localStorage.setItem("pokedex", JSON.stringify(item));
    console.log(item, "liste des pokedex");
  };

  // function to initialize the pokedex

  const initPokedex = () => {
    item = JSON.parse(localStorage.getItem("pokedex"));
  };
  initPokedex();

  //  useEffect hook to fetch data from the API when the component mounts

  useEffect(() => {
    fetch(url.current)
      .then((res) => res.json())
      .then((data) => {
        setPokemons(data.results);

        setUrl({
          current: url.current,
          next: data.next,
          previous: data.previous,
        });

        console.log(data.results);
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [url.current]);

  //  useEffect hook to fetch data for the types of the pokemons

  useEffect(() => {
    pokemons.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setType((current) => [...current, data.types[0].type.name]);

          setType_1((current) => [...current, data.types[1]?.type?.name]);
        })

        .then(setType([]))
        .then(setType_1([]))
        .catch((err) => console.error(err))
    );
  }, [pokemons]);
  return (
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
        <div class="row">
          <div class="col-md-12 text-center mt-3">
            <br />

            {/* render the previous and next buttons if they exist */}

            {url.previous && (
              <button class="btn btn-dark mr-2" onClick={previous}>
                Previous
              </button>
            )}
            {url.next && (
              <button class="btn btn-dark" onClick={next}>
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
