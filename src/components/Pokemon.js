import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft as Arrow } from "react-icons/ai";

const Pokemon = ({ match }) => {
  const [pokemonData, setPokemonData] = useState();
  const [pokemonSpecies, setPokemonSpecies] = useState();
  
  useEffect(() => {
    fetchPokemon();
    console.log(match)
  }, []);

  useEffect(() => {
    if (pokemonData) fetchPokemonSpecies();
  }, [pokemonData]);

  const fetchPokemon = async () => {
    const pokemon = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${match.params.name}`
    );
    const pokemonJSON = await pokemon.json();
    setPokemonData(pokemonJSON);
  };

  const fetchPokemonSpecies = async () => {
    const species = await fetch(pokemonData.species.url);
    const speciesJSON = await species.json();
    setPokemonSpecies(speciesJSON);
  };

  return (
    <div>
      <Link to="/" className="backBtn btn">
        <Arrow />
      </Link>
      <div className="pokemonData">
        {pokemonData && pokemonSpecies ? (
          <div>
            <div className="stats">
              <h1 className="pokemonName">{match.params.name.toUpperCase()}</h1>
              <div className="pokemonPicture">
                <img src={pokemonData.sprites.front_default} />
              </div>
              <p className="pokemonNumber">nr {pokemonData.id}</p>
              <div className="pokemonTypes">
                {pokemonData.types.map((t) => (
                  <span className={t.type.name + " type"}>{t.type.name} </span>
                ))}
              </div>
              <p className="pokemonHeight">
                height: {pokemonData.height * 10} cm
              </p>
              <p className="pokemonWeight">
                weight: {pokemonData.weight / 10} kg
              </p>
            </div>
            <p className="description">
              {pokemonSpecies.flavor_text_entries[0].flavor_text.replace(
                "\u000c",
                " "
              )}
            </p>
          </div>
        ) : (
          "loading"
        )}
      </div>
    </div>
  );
};

export default Pokemon;
