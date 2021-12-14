import { Link } from "react-router-dom";

const PokemonList = ({ pokemons }) => {
  return (
    <div className="pokemonList">
      {pokemons.map((p) => (
        <Link to={`pokemon/${p.name}`} className="pokemonListMember">
          <p key={p.name} className="pokemonListMemberText">
            {/* number */}
            {p.url
              .replace("https://pokeapi.co/api/v2/pokemon/", "")
              .replace("/", "")
              .padStart(3, "0")}{" "}
            {p.name.toUpperCase()}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default PokemonList;
