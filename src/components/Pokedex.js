import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import Card from "react-bootstrap/Card";

function Pokedex() {
  const [query, setQuery] = useState("");
  const [pokemons, setPokemons] = useState([]);
  const [image, setImage] = useState([]);
  const [type, setType] = useState([]);
  const [type_1, setType_1] = useState([]);

  const addToMyPokedex = (pokemon) => {
    setPokemons([...pokemons, pokemon]);
  };

  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    fetch(`https://pokeapi.co/api/v2/pokemon/${query}`)
      .then((res) => res.json())
      .then((data) => {
        setPokemons([data]);
        setImage([data.sprites.front_default]);
        setType([data.types[0].type.name]);
        setType_1([data.types[1]?.type?.name]);
      })
      .catch((err) => console.error(err));
  };

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
      {pokemons.map((pokemon, id) => (
        <Card key={id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            <Card.Subtitle>{pokemon.id}</Card.Subtitle>
            <Card.Img src={image[id]} alt="" />
            <Card.Text>
              Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
            </Card.Text>
            <Button
              onClick={() =>
                addToMyPokedex({
                  name: pokemon.name,
                  id: pokemon.id,
                  image: image[id],
                  type: type[id],
                  type_1: type_1[id],
                })
              }
            >
              Add to My Pokedex
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Pokedex;
