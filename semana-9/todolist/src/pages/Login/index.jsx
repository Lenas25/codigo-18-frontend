import { useState } from "react";
import { loginUser } from "../../services/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { TextField } from "../../components";

export default function Login() {
  const [values, setValues] = useState({ email: "", password: "" });
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const logeado = await loginUser(values.email, values.password);
    if (logeado) {
      //hacia donde quiero que me redireccione cuando me loguee
      navigate("/");
    } else {
      setError("Email or password incorrect");
    }
  };

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
            {error && (
              <p className="text-red-500 text-sm">{error}</p>
            )}

            <div className="my-5">
              <button className="p-3 bg-purple-400 w-full rounded-md text-white font-bold hover:bg-purple-300 transition-all duration-300 ease-in">
                Log In
              </button>
              <p className="text-center text-purple-400 mt-5 ">
                Do not have an account?{" "}
                <Link to="/signup" className="underline">
                  Sign up here!
                </Link>{" "}
                🚀
              </p>
            </div>
          </form>
        </div>
      </section>
    </>
  );
}
