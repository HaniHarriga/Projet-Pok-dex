// import React, { useEffect, useState } from "react";

// export default function Pokemon({ url }) {
//   const [pokemon, setPokemon] = useState([]);

//   useEffect(() => {
//     setPokemon([]);
//     fetch(url)
//       .then((res) => res.json())
//       .then((data) => {
//         setPokemon(data);
//       })
//       .catch((error) => {
//         console.error(error);
//       });
//   }, [url]);

//   return (
//     <ul>
//       {pokemon.map((pokemon, index) => (
//         <li key={index}>{pokemon.name}</li>
//       ))}
//     </ul>
//   );
// }
