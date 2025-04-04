//
//

import { Link } from "react-router";

export default function Error() {
  return (
    <div className="bg-background h-screen w-screen flex flex-col justify-center items-center">
      <h1 className=" text-red-500 text-3xl">Error 404</h1>
      <p className="text-lg text-red-500">Sivua ei löytynyt</p>
    </div>
  );
}
