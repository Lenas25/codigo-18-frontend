import { useState, useRef } from "react";
import { useNavigate, Link } from "react-router-dom";
import { TextField } from "../../components";
import { uploadFile, createUser, updateProfileUser } from "../../services/firebase";

export default function Signup() {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    password: "",
    photoUrl: "",
  });
  const navigate = useNavigate();
  const imageInput = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    //obtiene el archivo que se subio dependiendo de la referencia con el boton de upload, current se refiere a una propiedad del input
    const file = imageInput.current.files[0];
    const url = await uploadFile(file);

    //esto es para crear un usuario, se crea solo con email y password
    await createUser(values.email, values.password);
    //actualizar al usuario con el nombre y la foto
    await updateProfileUser(values.fullName, url);

    //cuando termina todo el proceso de registro
    setIsLoading(false);
    //si ya termino de cargar todo entonces me redirige a la pagina principal
    if (isLoading === false){
      //hacia donde quiero que me redireccione cuando me loguee
      navigate("/");
    }
  };

  return (
    <>
      <section className="max-w-md mx-auto flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-md shadow-2xl">
          <div className="my-5">
            <h2 className="text-2xl font-semibold text-center">
              Create a new account 🚀
            </h2>
          </div>
          <form className="my-5" onSubmit={handleSubmit}>
            <TextField
              values={values.fullName}
              handleInputChange={handleInputChange}
              type="text"
              placeholder="Enter your full name"
              name="fullName"
            />
            <TextField
              values={values.email}
              handleInputChange={handleInputChange}
              type="email"
              placeholder="Enter your email"
              name="email"
            />
            <TextField
              values={values.password}
              handleInputChange={handleInputChange}
              type="password"
              placeholder="Enter your password"
              name="password"
            />
            <div className="my-5 text-center">
              <div>
                <button
                  className="border border-dashed px-5 py-2 border-black rounded-md w-full hover:bg-gray-500 hover:text-white hover:border-white transition-all duration-300 ease-in"
                  type="button"
                  onClick={() => {
                    // es para que se abra el input de tipo file
                    imageInput.current.click();
                  }}>
                  Upload your profile picture 📸
                </button>
              </div>
              <input
                ref={imageInput}
                name="photoUrl"
                type="file"
                className="hidden"
                value={values.photoUrl}
                onChange={handleInputChange}
              />
            </div>
            <div className="my-5">
              <button
                type="onSubmit"
                className="flex items-center justify-center p-3 bg-purple-400 w-full rounded-md text-white font-bold hover:bg-purple-300 transition-all duration-300 ease-in">
                {isLoading && (
                    <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-black"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                Sign up
              </button>
              <p className="text-center text-purple-400 mt-5">
                Do you have an account?{" "}
                <Link to="/login" className="underline">
                  Log in here!
                </Link>{" "}
                🫶
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
