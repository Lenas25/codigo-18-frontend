//funcion para capitalizar la primera letra de una palabra
const capitalizeFirstLetter = (string) => {
  return string && string.charAt(0).toUpperCase() + string.slice(1); 
};

export default function PokeCard({ pokemon }) {
  return (
    <>
      <div className="flex gap-5 items-center justify-between p-5">
        <div className="size-[100px]">
          <img
            src={pokemon?.sprites.other.dream_world.front_default}
            alt={pokemon?.name}
            className="size-22 object-cover"
          />
        </div>
        <div className="text-right">
          <span className="text-center text-2xl font-bold">#{pokemon?.id}</span>
          <ul className="text-md">
            {pokemon?.types.map((type) => (
              <li key={type.slot}>{capitalizeFirstLetter(type.type.name)}</li>
            ))}
          </ul>
        </div>
      </div>
      <div className="bg-primary p-5 rounded-t-xl rounded-b-lg">
        <h2 className="text-center text-2xl font-bold">
          {capitalizeFirstLetter(pokemon?.name)}
        </h2>
      </div>
    </>
  );
}
