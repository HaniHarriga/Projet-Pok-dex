import { useState, useEffect } from "react";

export default function PokeList() {
  const [pokemons, setPokemons] = useState([]);

  const [url, setUrl] = useState({
    current: "https://pokeapi.co/api/v2/pokemon/",
    next: null,
    previous: null,
  });

  const [image, setImage] = useState([]);
  const [type, setType] = useState([]);
  // const [type_1, setType_1] = useState([]);

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
      })
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, [url.current]);
  useEffect(() => {
    pokemons.map((pokemon) =>
      fetch(pokemon.url)
        .then((res) => res.json())
        .then((data) => {
          setImage((current) => [...current, data.sprites.front_default]);
          setType((current) => [...current, data.types[0].type.name]);
          // setType_1((current) => [...current, data.types[1].type.name]);
        })

        .catch((err) => console.error(err))
    );
  }, [pokemons]);
  return (
    <div>
      <h2>List of Pokemons</h2>
      <ul>
        {pokemons.map((pokemon, index) => (
          <div>
            <div>
              <h3 key={index}>
                {index + 1} {pokemon.name}
              </h3>
              <div>
                <img src={image[index]} alt="" />
              </div>

              <div>
                <ul>
                  <li>{type[index]}</li>
                  {/* <li>{type_1[index]}</li> */}
                </ul>
                <button type="submit">Add</button>
              </div>
            </div>
          </div>
        ))}
      </ul>
      <div>
        {url.previous && <button onClick={previous}>Previous</button>}
        {url.next && <button onClick={next}>Next</button>}
      </div>
      <br />
    </div>
  );
}
