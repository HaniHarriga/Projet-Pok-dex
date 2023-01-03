import { Link } from "react-router-dom";

export default function Header() {
  return (
    <div>
      <nav>
        <Link to="/"> List of Pokemons </Link>
        <Link to="/Pokedex"> My Pokedex </Link>
      </nav>
    </div>
  );
}
