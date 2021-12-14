import { useEffect, useState } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Controls from "./components/Controls";
import PokemonList from "./components/PokemonList";
import Pokemon from "./components/Pokemon";

function App() {
  const [pokemons, setPokemons] = useState(null);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [loading, setLoading] = useState(true);

  const [currentURL, setCurrentURL] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=10"
  );

  useEffect(() => {
    fetchPokemons(currentURL);
  }, []);

  useEffect(() => {
    if (pokemons) {
      setNext(pokemons.next);
      setPrev(pokemons.previous);
    }
  }, [pokemons]);

  useEffect(() => {
    fetchPokemons(currentURL);
  }, [currentURL]);

  const fetchPokemons = async (url) => {
    const pokemon = await fetch(url);
    const pokemonJSON = await pokemon.json();
    setPokemons(pokemonJSON);
    setLoading(false);
  };

  const goNext = () => {
    if (!next) return;
    setLoading(true);
    setCurrentURL(next);
  };

  const goPrevious = () => {
    if (!prev) return;
    setLoading(true);
    setCurrentURL(prev);
  };

  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Route path="/" exact>
        <div className="App">
          <h1>Pokedex</h1>
          {!loading ? <PokemonList pokemons={pokemons.results} /> : "loading"}
          <Controls goNext={goNext} goPrevious={goPrevious} />
        </div>
      </Route>
      <Route path="/pokemon/:name" component={Pokemon}></Route>
    </BrowserRouter>
  );
}

export default App;
