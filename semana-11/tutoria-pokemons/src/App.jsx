import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [page, setPage] = useState(1);

  const fetchPokemons = async (page = 1) => {
    const limit = 8;
    const offset = (page - 1) * limit;
    const response = await fetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    );
    const data = await response.json();
    const results = data.results.map((result) => {
      const id = result.url.split("/")[6];
      const image = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${id}.gif`;
      return { name: result.name, id, image };
    });
    setPokemons(results);
  };

  useEffect(() => {
    fetchPokemons(page);
  }, [page]);

  const handleNextPage = () => {
    setPage(page + 1);
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1);
    }
  }

  return (
    <>
      <div className="flex items-center justify-center flex-col gap-10">
        <h1 className="text-4xl font-bold my-3">Pokemon List</h1>
        <div className="flex items-center gap-10 flex-wrap">
          {pokemons.map((pokemon, index) => (
            <div key={index} className="flex flex-col gap-6 justify-center items-center">
              <div className="size-20">
                <img src={pokemon.image} alt={pokemon.name} className="w-full"/>
              </div>
              <h3 className="font-semibold text-xl">{pokemon.name}</h3>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-5">
          <button type="submit" className="bg-purple-400 px-5 py-2 rounded-xl" onClick={handlePreviousPage}>
            Previous
          </button>
          <button type="submit" className="bg-purple-400 px-5 py-2 rounded-xl" onClick={handleNextPage}>
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
