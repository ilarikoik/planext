import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../utils/userContext";
import palmtree from "../assets/palm-tree-svgrepo-com.svg";
import { signOut } from "firebase/auth";
import { auth } from "../firebase/auth/loginWithGoogle";

interface handleLogOut {
  handleLogout: () => void;
}
export default function Navbar({ handleLogout }: handleLogOut) {
  return (
    <div className="h-20 w-full">
      <div className="h-full w-full flex flex-row items-center">
        <div className="h-4/5 w-1/6 flex justify-center items-center  ml-10 rounded-lg">
          <img src={palmtree} className="w-8 h-8 " alt="Google-icon" />
          <h1 className="text-background font-bold text-3xl ">Travelist</h1>
        </div>
        <div className="hidden md:w-full justify-end md:flex items-center">
          <ul className="flex w-3/5 justify-around font-bold text-lg  text-background">
            <li className="hover:underline">
              <Link to="/index">Home</Link>
            </li>
            <li className="hover:underline">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="hover:underline text-yellow-300">
              <Link to="/plan">plan{"(poista kun valmis)"}</Link>
            </li>
            <li
              onClick={handleLogout}
              className="hover:underline text-red-300 cursor-pointer"
            >
              Log out
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
