import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getCurrentUser, logoutUser } from "../../services/auth";

export default function MainLayout() {
    const [user, setUser] = useState(null);
  
    const navigate = useNavigate();
  
    const fetchUser = async () => {
      try {
        const currentUser = await getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        navigate("/login");
      }
    };

    const userLogout = async () => {
      try{
        await logoutUser();
        navigate("/login");
      }catch(error){
        console.log(error.code);
        console.log(error.message);
        return null;
      }
    }
  
    useEffect(() => {
      fetchUser();
    }, []);
  
    return (
      <div>
        <nav className="bg-white py-5 px-12 flex items-center justify-between">
            <div>
                <h1 className="text-2xl font-bold">To Do List</h1>
            </div>
          <div className="flex items-center gap-5 justify-end">
            <div>
              <p className="font-bold">{user?.displayName}</p>
              <p className="text-xs font-light">{user?.email}</p>
            </div>
            <img
              src={user?.photoURL}
              className="rounded-full w-[40px] h-[40px] object-cover"
              alt=""
            />
          </div>
          <div>
            <button
              className="p-2 bg-purple-400 text-white font-bold rounded-md hover:bg-purple-300 transition-all duration-300 ease-in"
              onClick={() => userLogout()}
            >
              Log Out
            </button>
          </div>
        </nav>
        <Outlet />
      </div>
    );
  }