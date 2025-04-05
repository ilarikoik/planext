import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";

interface prop {
  user: boolean;
  handleUser: () => void;
}

export default function Login() {
  const navigate = useNavigate();
  const userContxt = useContext(UserContext);
  const [user, setUser] = useState(userContxt);

  useEffect(() => {
    if (user?.logged) {
      navigate("/index");
      console.log("kirjauduttu sisään")
    }
  }, [user?.logged]);

  const handleClick = () => {
    if (user) {
      setUser({ ...user, logged: !user.logged });
    }
    console.log(user?.logged)
  };
  

  return (
    <div className="bg-secondary h-screen w-screen">
      <div className="h-24 w-full flex justify-center items-center bg-secondary">
        <h1 className="text-white font-bold text-4xl pt-20">Planext</h1>
      </div>
      <div className="min-h-[500px] w-full bg-secondary items-center justify-center flex">
        <div className="h-48 w-4/5 max-w-[800px] border-2 rounded-md border-primary items-center justify-center flex hover:bg-primary text-2xl font-bold text-primary hover:text-white">
          <button onClick={handleClick} className="hover:underline">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
