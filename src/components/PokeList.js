import { useState, useEffect } from "react";
import Card from "react-bootstrap/Card";

export default function PokeList() {
  const [pokemons, setPokemons] = useState([]);

  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  const [image, setImage] = useState([]);
  const [type, setType] = useState("");
  const [type_1, setType_1] = useState("");

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

  async function fetchData() {
    return new Promise((resolve) => {
      fetch("https://pokeapi.co/api/v2/pokemon/1")
        .then((res) => res.json())
        .then((data) => {
          resolve(data);
          console.log(data);
        });
    });
  }

  fetchData();

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

  useEffect(() => {
    // setImage("");
    // setType("");
    // setType_1("");

    pokemons.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setImage((current) => [...current, data.sprites.front_default]);

          setType((current) => [...current, data.types[0].type.name]);

          setType_1((current) => [...current, data.types[1]?.type?.name]);
        })
        .then(setImage(""))
        .then(setType(""))
        .then(setType_1(""))
        .catch((err) => console.error(err))
    );
  }, [pokemons]);
  return (
    <ul className="container">
      {pokemons.map((pokemon, id) => (
        <Card key={id} style={{ width: "18rem" }}>
          <Card.Body>
            <Card.Title>{pokemon.name}</Card.Title>
            <Card.Subtitle>
              {pokemon.url.replace(/[^\d]/g, "").substring(1)}
            </Card.Subtitle>
            <Card.Img src={image[id]} alt="" />
            <Card.Text>
              Type: {type[id]} {type_1[id] && `, ${type_1[id]}`}
            </Card.Text>
            <Card.Link href="#">Add to Pokedex</Card.Link>
          </Card.Body>
        </Card>
      ))}
      <div>
        <br />
        {url.previous && <button onClick={previous}>Previous</button>}
        {url.next && <button onClick={next}>Next</button>}
      </div>
    </ul>
  );
}
