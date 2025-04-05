//
//

import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import TripList from "../components/trips";
// interface prop {
//   user: boolean;
//   handleUser: () => void;
// }
// { user, handleUser }: prop

export default function Index() {
    const user = useContext(UserContext)


    const list = [{
        place: 'Portugal',
        year: 2018,
    },
    {
        place: 'Spain',
        year: 2020,
    },
    {
        place: 'Thailand',
        year: 2025,
    }]

  return (
    <div className="bg-background h-screen w-screen">
      <button  className=" hover:underline">
        ETUSIVU {user?.user.toString()}
      </button>
      <TripList list={list}></TripList>
    </div>
  );
}
