import { useEffect } from "react";
import { Link, redirect, useNavigate } from "react-router-dom";

interface prop {
  user: boolean;
  handleUser: () => void;
}

export default function Login({ user, handleUser }: prop) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/index");
    }
  }, [user]);

  return (
    <div className="bg-secondary h-screen w-screen">
      <div className="h-24 w-full flex justify-center items-center bg-secondary">
        <h1 className="text-white font-bold text-4xl pt-20">Planext</h1>
      </div>
      <div className="min-h-[500px] w-full bg-secondary items-center justify-center flex">
        <div className="h-48 w-4/5 max-w-[800px] border-2 rounded-md border-primary items-center justify-center flex hover:bg-primary text-2xl font-bold text-primary hover:text-white">
          <button onClick={() => handleUser()} className="hover:underline">
            Login with Google
          </button>
        </div>
      </div>
    </div>
  );
}
