//
//

import { useContext } from "react";
import { UserContext } from "../utils/userContext";

// interface prop {
//   user: boolean;
//   handleUser: () => void;
// }
// { user, handleUser }: prop

export default function Index() {
    const user = useContext(UserContext)
  return (
    <div className="bg-background h-screen w-screen">
      <button  className=" hover:underline">
        ETUSIVU {user?.user.toString()}
      </button>
    </div>
  );
}
