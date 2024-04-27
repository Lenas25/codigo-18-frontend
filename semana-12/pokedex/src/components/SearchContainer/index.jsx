
import TextField from "../TextField";
import Button from "../Button";

export default function SearchContainer({inputValue, handleInputValue, handleFetchPokemons}) {
  return (
    <>
      <div className="text-center flex gap-5 items-center justify-center mt-10">
        <TextField
          inputValue={inputValue}
          handleInputValue={handleInputValue} />
        <Button handleFetchPokemons={handleFetchPokemons} />
      </div>
    </>
  );
}
