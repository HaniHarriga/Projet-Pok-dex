import { useState, useEffect } from "react";
// import Card from "react-bootstrap/Card";
// import Pokemon from "./Pokemon";

export default function PokeList() {
  const [pokemons, setPokemons] = useState([]);
  const [image, setImage] = useState([]);
  const [type, setType] = useState("");
  const [type_1, setType_1] = useState("");
  let [item, setItem] = useState([]);

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

  const addToMyPokedex = (pokemon) => {
    item.push(pokemon);
    localStorage.setItem("pokedex", JSON.stringify(item));
    console.log(item, "liste des pokedex");
  };

  const initPokedex = () => {
    item = JSON.parse(localStorage.getItem("pokedex"));
  };
  initPokedex();

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
    <div>
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
            <button onClick={() => addToMyPokedex(pokemon)}>
              Add to Pokedex
            </button>
          </div>
        </div>
      ))}
      <div>
        <br />
        {url.previous && <button onClick={previous}>Previous</button>}
        {url.next && <button onClick={next}>Next</button>}
      </div>
    </div>
  );
}
