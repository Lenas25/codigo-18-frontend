import pokeball from "../../assets/pokeball.svg";

export default function Header() {
  return (
    <>
      <div className="text-center mt-10 flex items-center justify-center gap-4">
        <img src={pokeball} alt="" className="size-12" />
        <h1 className="text-5xl">
          Poke<span className="font-bold text-primary">Dex</span>
        </h1>
      </div>
    </>
  );
}
