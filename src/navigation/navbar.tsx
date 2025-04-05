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
      <div className="h-full w-full flex flex-row">
        <div className="h-full w-1/5 flex justify-start items-center bg-secondary ml-10">
          <h1 className="text-background font-bold text-3xl pt-2">Planext</h1>
        </div>
        <div className="w-full justify-end flex items-center">
          <ul className="flex w-3/5 justify-around font-bold text-lg  text-background">
            <li className="hover:underline">
              <Link to="/index">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/profile">Profile</Link>
            </li>
            <li onClick={handleClick} className="hover:underline text-red-500">
              Log out
              {/* <Link to="/">Log Out</Link> */}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
