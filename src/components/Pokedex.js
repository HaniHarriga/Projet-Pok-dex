import React from "react";

export default function Pokedex() {
  // const handlechange = (e) => {
  //   setPokemons(e.target.value.toLowerCase());
  // };

  return (
    <div>
      <br />
      <form onSubmit={Pokedex}>
        <label>
          <input
            type="text"
            onChange={Pokedex}
            placeholder="Search for Pokemon"
          />
        </label>
      </form>

      <br />
      {/* <button onClick={""}></button> */}
    </div>
  );
}
