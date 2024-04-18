import { useState } from "react";
import { loginUser } from "../../services/firebase";
import { useNavigate } from "react-router-dom";
export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const {name, value} = event.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    //esto es para crear un usuari
    //await createUser(values.email, values.password);
    const logeado=await loginUser(values.email, values.password);
    if (logeado) {
      console.log("Usuario logueado");
      //hacia donde quiero que me redireccione cuando me loguee
      navigate('/');
    }
  }

  return (
    <>
      <section className="max-w-md mx-auto flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-10 rounded-md shadow-2xl">
          <div className="my-5">
            <h2 className="text-2xl font-semibold text-center">
              Nice to see you again 🫶
            </h2>
          </div>
          <form className="my-5" onSubmit={handleSubmit}>
            <div className="my-5">
              <input
                name="email"
                value={values.email}
                type="email"
                placeholder="Enter your email"
                className="px-5 py-2 w-full border-2 border-purple-400 rounded-md hover:bg-purple-400 hover:text-white hover:placeholder:text-white transition-all duration-300 ease-in"
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <input
                name="password"
                value={values.password}
                type="password"
                placeholder="Enter your Password"
                className="px-5 py-2 w-full border-2 border-purple-400 rounded-md hover:bg-purple-400 hover:text-white hover:placeholder:text-white transition-all duration-300 ease-in"
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="my-5">
              <button className="p-3 bg-purple-400 w-full rounded-md text-white font-bold hover:bg-purple-300 transition-all duration-300 ease-in">
                Sign In
              </button>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
