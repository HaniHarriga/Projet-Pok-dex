import { Link } from "react-router-dom";
import "../styles/Header.css";

export default function Header() {
  return (
    <nav>
      <div>
        <div class="link">
          <div>
            <Link className="nav-link" to="/">
              {" "}
              List of Pokemons{" "}
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="/Pokedex">
              {" "}
              Pokedex{" "}
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="/signup">
              {" "}
              SignUp{" "}
            </Link>
          </div>
          <div>
            <Link className="nav-link" to="/signin">
              {" "}
              Signin{" "}
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
