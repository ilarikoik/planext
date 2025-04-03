import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="bg-secondary h-screen w-screen">
      <div className="h-24 w-full flex justify-center items-center bg-secondary">
        <h1 className="text-white font-bold text-4xl pt-20">Planext</h1>
      </div>
      <div className="min-h-[500px] w-full bg-secondary items-center justify-center flex">
        <div className="h-48 w-4/5 max-w-[800px] border-2 rounded-md border-primary items-center justify-center flex hover:bg-primary text-2xl font-bold text-primary hover:text-white">
          {/* <Link to="/index"> */}
            <button className="hover:underline">Login with Google</button>
          {/* </Link> */}
        </div>
      </div>
    </div>
  );
}
