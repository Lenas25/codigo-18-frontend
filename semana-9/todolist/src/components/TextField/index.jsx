

export default function TextField({ values, handleInputChange, type, placeholder, name}) {
  return (
    <div className="my-5">
      <input
        name={name}
        value={values}
        type={type}
        placeholder={placeholder}
        className="px-5 py-2 w-full border-2 border-purple-400 rounded-md hover:bg-purple-400 hover:text-white hover:placeholder:text-white transition-all duration-300 ease-in"
        onChange={handleInputChange}
        required
      />
    </div>
  );
}
