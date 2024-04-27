import { useEffect, useState, useCallback } from "react";
import arrowRight from "./assets/arrow-right.svg";
import arrowLeft from "./assets/arrow-left.svg";
import { fetchAllPokemons } from "./services/api";
import { useGetPokemon, useInputValue } from "./hooks";
import { ToastContainer } from "react-toastify";
import { Header, PokeCard, SearchContainer } from "./components";

function App() {
  const { inputValue, handleInputValue } = useInputValue();
  const { pokemon, fetchPokemons } = useGetPokemon(inputValue);
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);

  //obtener los datos de la api
  const getData = async (offset) => {
    const data = await fetchAllPokemons(offset);
    setPokemons(data);
  };

  const handleFetchPokemons = async () => {
    if (inputValue === "") {
      getData();
      return;
    }

    await fetchPokemons(inputValue);
  };

  //el callback sirve para que no se vuelva a crear la funcion cada vez que se renderiza el componente
  const handlePrevious = useCallback(() => {
    if (offset > 0) {
      setOffset(offset - 10);
    }
  }, [offset]);

  const handleNext = useCallback(() => {
    setOffset(offset + 10);
  }, [offset]);

  //useEffect para obtener los datos de la al cargar la pagina
  useEffect(() => {
    getData(offset);
    //para que se ejecute cada vez que cambie el offset
  }, [offset]);

  useEffect(() => {
    if (pokemon) {
      setPokemons([pokemon]);
    }
  }, [pokemon]);

  return (
    <>
      <ToastContainer />
      <div className="fixed inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#135D66_100%)]"></div>
      <Header />
      <SearchContainer
        inputValue={inputValue}
        handleFetchPokemons={handleFetchPokemons}
        handleInputValue={handleInputValue}
      />
      <div className="mt-12 flex flex-col gap-14 items-center justify-center">
        <div className="grid grid-cols-1 grid-rows-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {pokemons &&
            pokemons.map((pokemon) => (
              <div
                key={pokemon?.id}
                className=" bg-white shadow-2xl rounded-lg flex flex-col gap-3 justify-between">
                <PokeCard pokemon={pokemon} />
              </div>
            ))}
        </div>

        <div className="flex gap-3 py-10">
          <button onClick={handlePrevious}>
            <img src={arrowLeft} alt="" />
          </button>
          <button onClick={handleNext}>
            <img src={arrowRight} alt="" />
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
