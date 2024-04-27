import { toast } from "react-toastify";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

export default function useGetPokemon(inputValue) {
  const [pokemon, setPokemon] = useState(null);
  //dependendiendo del input que se le pase, se hace la peticion a la api
  const fetchPokemons = async () => {
    const url = `https://pokeapi.co/api/v2/pokemon/${inputValue.toLocaleLowerCase()}`;
    const response = await fetch(url);

    if (!response.ok) {
      toast.error("Pokemon not found", {
        autoClose: true,
        closeButton: true,
      });
      return;
    }

    const data = await response.json();
    setPokemon(data);
    return data;
  };

  return { pokemon, fetchPokemons };
}
