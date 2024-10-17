import React, { useEffect, useState } from "react";
import axios from "axios";
import PokemonCard from "./components/PokemonCard";
import Loader from "./components/Loader";

const App = () => {
  const [pokemonList, setPokemonList] = useState([]);
  const [search, setSearch] = useState("");
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        console.log("response", response);

        const promises = response.data.results.map((pokemon) =>
          axios.get(pokemon.url)
        );
        const results = await Promise.all(promises);
        setPokemonList(results.map((res) => res.data));
      } catch (error) {
        console.error("Error fetching Pokémon data:", error);
      }
      setLoading(false);
    };

    fetchPokemon();
  }, []);

  const filteredPokemon = pokemonList.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="text-center p-6">
      <h1 className="text-4xl font-bold mb-6">Pokemon List</h1>
      <input
        type="text"
        placeholder="Search Pokemon"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border border-gray-300 rounded p-2 sm:w-72 mb-6"
      />
      
      {
        loading ? (
          <div className="flex items-center justify-center min-h-[70vh]">
            <Loader />
          </div>
        ) : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPokemon.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      }
      
    </div>
  );
};

export default App;
