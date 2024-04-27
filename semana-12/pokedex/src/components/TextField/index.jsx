import search from "../../assets/search.svg";

export default function TextField({ inputValue, handleInputValue }) {
  return (
    <>
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
    </>
  );
}
