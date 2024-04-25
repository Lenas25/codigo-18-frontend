import { useEffect, useState } from "react";
import search from "./assets/search.svg";
import filter from "./assets/filter.svg";
import pokeball from "./assets/pokeball.svg";
import arrowRight from "./assets/arrow-right.svg";
import arrowLeft from "./assets/arrow-left.svg";
import { fetchPokemons } from "./services/api";

function App() {
  const [pokemons, setPokemons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [inputValue, setInputValue] = useState("");

  const handleInputValue = (e) => {
    console.log(searchPokemon);
    setInputValue(e.target.value);
  };

  const getData = async () => {
    // Fetching data from the function fetchPokemons that returns a promise
    const data = await fetchPokemons();
    setPokemons(data);
    console.log(data);
  }

  useEffect(() => {
    getData();
  },[])

  return (
    <>
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#135D66_100%)]"></div>
      <div className="text-center mt-10 flex items-center justify-center gap-4">
        <img src={pokeball} alt="" className="size-12"/>
        <h1 className="text-5xl">
          Poke<span className="font-bold text-primary">Dex</span>
        </h1>
      </div>
      <div className="text-center flex gap-5 items-center justify-center mt-10">
        <div className="relative flex items-center">
          <div className="absolute left-3 pointer-events-none">
            <img src={search} alt="" />
          </div>
          <input
            value={inputValue}
            type="text"
            placeholder="Search..."
            className="ps-12 py-2 border-2 border-primary rounded-xl outline-none pe-5"
            onChange={handleInputValue}
          />
        </div>
        <button className="border-2 border-primary p-2 rounded-full">
          <img src={filter} alt="" />
        </button>
      </div>
      <div className="mt-12 flex flex-col gap-14 items-center justify-center">

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">

          <div className=" bg-white shadow-2xl rounded-lg flex flex-col gap-5 justify-between">
            <div className="flex gap-5 items-center justify-between p-5">
              <div className="size-20">
                <img
                  src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
                  alt="Pikachu"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="text-right">
                <span className="text-center text-2xl font-bold">#1</span>
                <p className="text-center text-md">Electric</p>
              </div>
            </div>
            <div className="bg-primary p-5 rounded-t-xl rounded-b-lg">
              <h2 className="text-center text-2xl font-bold">Pikachu</h2>
            </div>
          </div>
        </div>

        <div className="flex gap-3">
          <button>
            <img src={arrowLeft} alt="" />
          </button>
          <button>
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
