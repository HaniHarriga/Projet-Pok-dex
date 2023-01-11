import React, { useState, useEffect } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

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

    console.log(pokemons, "liste des pokedex");
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
      <Form inline onSubmit={search}>
        <FormControl
          type="text"
          placeholder="Search"
          className="mr-sm-2"
          value={query}
          onChange={handleChange}
        />
        <Button type="submit">Search</Button>
      </Form>

      {searchResult.map((pokemon, id) => (
        <Card key={id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            <Card.Subtitle>{pokemon.id}</Card.Subtitle>
            <Card.Img src={image[id]} alt="" />
            <Card.Text>
              Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
            </Card.Text>
            <button onClick={() => addToMyPokedex(pokemon)}>
              Add to Pokedex
            </button>
          </Card.Body>
        </Card>
      ))}
      <hr></hr>

      {pokemons.map((pokemon, id) => (
        <div key={id}>
          <div>
            <div>{pokemon.url.replace(/[^\d]/g, "").substring(1)}</div>
            <h4>{pokemon.name}</h4>

            <img
              src={
                "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/" +
                pokemon.url.replace(/[^\d]/g, "").substring(1) +
                ".png"
              }
              alt={pokemon.name}
            />
            <div>
              <ul>
                <li>
                  Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
                </li>
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Pokedex;
