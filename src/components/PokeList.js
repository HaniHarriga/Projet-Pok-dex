import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";
// import Pokemon from "./Pokemon";

export default function PokeList({ addToMyPokedex }) {
  const [pokemons, setPokemons] = useState([]);
  const [image, setImage] = useState([]);
  const [type, setType] = useState("");
  const [type_1, setType_1] = useState("");

  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  const next = () => {
    const newUrl = {
      current: url.next,
      previous: url.current,
      next: null,
    };
    setUrl(newUrl);
  };

  const previous = () => {
    const newUrl = {
      current: url.previous,
      next: url.current,
      previous: null,
    };
    setUrl(newUrl);
  };

  // async function fetchData() {
  //   return new Promise((resolve) => {
  //     fetch("https://pokeapi.co/api/v2/pokemon/1")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         resolve(data);
  //         console.log(data);
  //       });
  //   });
  // }

  // fetchData();

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

  useEffect(() => {});

  useEffect(() => {
    // setImage("");
    // setType("");
    // setType_1("");

    // pokemons.sort((a, b) => {
    //   const idA = a.url.replace(/[$\d]/g, "").substring(1);
    //   const idB = b.url.replace(/[$\d]/g, "").substring(1);

    //   return idA - idB;
    // });

    pokemons.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setImage((current) => [...current, data.sprites.front_default]);

          setType((current) => [...current, data.types[0].type.name]);

          setType_1((current) => [...current, data.types[1]?.type?.name]);
        })
        .then(setImage([]))
        .then(setType(""))
        .then(setType_1(""))
        .catch((err) => console.error(err))
    );
  }, [pokemons]);
  return (
    <ul className="container" style={{ listStyleType: "none" }}>
      {pokemons.map((pokemon, id) => (
        <Card key={id} style={{ width: "18rem" }} className="mb-3">
          <Card.Body>
            <Card.Title className="font-weight-bold">{pokemon.name}</Card.Title>
            <Card.Subtitle className="font-italic">
              {pokemon.url.replace(/[^\d]/g, "").substring(1)}
            </Card.Subtitle>

            <Card.Img src={image[id]} alt="" />
            <Card.Text className="text-primary">
              Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
            </Card.Text>
            <Card.Link
              href=""
              onClick={() =>
                addToMyPokedex({
                  id: pokemon.url.replace(/[^\d]/g, "").substring(1),
                  name: pokemon.name,
                })
              }
            >
              Add to Pokedex
            </Card.Link>
          </Card.Body>
        </Card>
      ))}
      <div>
        <br />
        {url.previous && (
          <button onClick={previous} className="btn btn-primary mr-2">
            Previous
          </button>
        )}
        {url.next && (
          <button onClick={next} className="btn btn-primary">
            Next
          </button>
        )}
      </div>
    </ul>
  );
}
