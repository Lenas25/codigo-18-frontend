export const fetchAllPokemons = async (offset) => {
    // Fetching data from the API
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=10`);
    // Parsing the response to JSON
    const data = await response.json();

    // map para recorrer el array de pokemons y hacer una peticion a la api por cada uno devolviendo un array de promesas
    const pokemons = data.results.map(async (pokemon) => {
        const response = await fetch(pokemon.url);
        const data = await response.json();
        return data;
    });

    //devuelve una promesa ya que el map devuelve un array de promesas y el Promise.all devuelve una promesa
    return Promise.all(pokemons);
}

