import { useContext, useEffect, useState } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import googleIcon from "../assets/google-icon.svg";
import palmTree from "../assets/palm-tree-svgrepo-com.svg";

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
      // navigate("/index");
      console.log("kirjauduttu sisään");
    }
  }, [user?.logged]);

  const handleClick = () => {
    if (user) {
      setUser({ ...user, logged: !user.logged });
    }
    console.log(user?.logged);
  };

  return (
    <div className="bg-background h-screen w-screen">
      <div className="h-32 w-full bg-primary flex flex-row justify-center items-center ">
        <img src={palmTree} className="w-8 h-8" alt="palm tree" />
        <h1 className="text-background font-bold text-4xl">Travelist</h1>
      </div>
      <div className="min-h-[500px] w-full items-center justify-center flex">
        <div className="h-48 w-4/5 max-w-[800px] items-center justify-center flex  text-2xl font-bold text-primary  ">
          <img src={googleIcon} className="w-8 h-8 mr-2 " alt="Google-icon" />
          <button onClick={handleClick} className=" hover:underline">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
