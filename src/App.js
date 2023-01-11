import { Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import PokeList from "./components/PokeList";
import Pokedex from "./components/Pokedex";
import SignUp from "./components/SignUp";
import Singin from "./components/Singin";

export default function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<PokeList />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/Pokedex" element={<Pokedex />} />
        <Route path="/Singin" element={<Singin />} />
      </Routes>
    </div>
  );
}
