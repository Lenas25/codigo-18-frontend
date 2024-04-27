
import filter from "../../assets/filter.svg";

export default function Button({handleFetchPokemons}) {
  return (
    <>
      <button
        className="border-2 border-primary p-2 rounded-full"
        onClick={handleFetchPokemons}>
        <img src={filter} alt="" />
      </button>
    </>
  );
}
