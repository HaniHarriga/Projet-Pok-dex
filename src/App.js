import { Route,Routes } from "react-router-dom";
import Header from "./components/Header";
import PokeList from "./components/PokeList";
import Pokedex from "./components/Pokedex"


export default function App() {
        
  return (
    <div>
      <Header/>
      <Routes>
        <Route path="/" element={<PokeList/>}/>
        <Route path="/" element={<Pokedex/>}/>
      </Routes>
    </div>
  
  );
}
