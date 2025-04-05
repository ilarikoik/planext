import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";

export default function Navbar() {
  const [user, setUser] = useState();
    
    
    const handleClick = () => {
      if (!user) {
        console.log("Kirjauduttu ulos, käytä firebasen tarjoamaa LogOut funktiiosa tässä")
    }
  };
  return (
    <div className="h-20 w-full">
      <div className="h-full w-full flex flex-row items-center">
        <div className="h-4/5 w-1/6 flex justify-center items-center  ml-10 rounded-lg">
          <h1 className="text-background font-bold text-3xl pt-2" >Travelist</h1>
        </div>
        <div className="hidden md:w-full justify-end md:flex items-center">
          <ul className="flex w-3/5 justify-around font-bold text-lg  text-background">
            <li className="hover:underline">
              <Link to="/index">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={handleClick} className="hover:underline text-red-300">
              Log out
              {/* <Link to="/">Log Out</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
