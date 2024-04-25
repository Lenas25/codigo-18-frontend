export const fetchPokemons = async () => {
    // Fetching data from the API
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=20');
    // Parsing the response to JSON
    const data = await response.json();
    // Returning the results
    return data.results;
}