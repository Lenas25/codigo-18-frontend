import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser } from "../../services/auth";

//esto solo funciona para el layout de auth o sea el path login y signup
export default function AuthLayout() {
  const navigate = useNavigate();
  const [showPage, setShowPage] = useState(false);

  const fetchUser = async () => {
    //try catch se usa para manejar errores, si hay un error se va a ejecutar el catch
    try{
      const user = await getCurrentUser();

      if(user){
        navigate("/");
      }
      
    }catch(error){
      setShowPage(true);
    }
  };

  useEffect(() => {
    fetchUser()
  }, []);

  //solo quiero que se muestre el outlet cuando la demas funcion termine  
  return (
    <div>
      {showPage && <Outlet />}
    </div>
  );
}
