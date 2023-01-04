import { useState, useEffect } from "react";

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

  // async function fetchData() {
  //   return new Promise((resolve) => {
  //     fetch("https://pokeapi.co/api/v2/pokemon/1")
  //       .then((res) => res.json())
  //       .then((data) => {
  //         resolve(data);
  //         // console.log(data);
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

  useEffect(() => {
    setImage("");
    setType("");
    setType_1("");

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
    <ul>
      {pokemons.map((pokemon, id) => (
        <div>
          <h3 key={id}>
            {pokemon.url.replace(/[^\d]/g, "").substring(1)} {pokemon.name}
          </h3>
          <div>
            <img src={image[id]} alt="" />
          </div>

          <div>
            <ul>
              <li>{type[id]}</li>
              <li>{type_1[id]}</li>
            </ul>

            <button type="submit">ADD TO POKEDEX</button>
          </div>
        </div>
      ))}
      <div>
        <br />
        {url.previous && <button onClick={previous}>Previous</button>}
        {url.next && <button onClick={next}>Next</button>}
      </div>
    </ul>
  );
}
