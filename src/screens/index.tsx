//
//

import { useContext } from "react";
import { UserContext } from "../utils/userContext";
import TripList from "../components/trips";
import AddTrip from "../components/addTrip";
// interface prop {
//   user: boolean;
//   handleUser: () => void;
// }
// { user, handleUser }: prop

export default function Index() {
  const user = useContext(UserContext);

  const list = [
    {
      place: "Thailand",
      year: 2025,
    },
    {
      place: "Malaysia",
      year: 2025,
    },
    {
      place: "Spain",
      year: 2020,
    },
    {
      place: "Portugal",
      year: 2018,
    },
  ];

  return (
    <div className="bg-background h-screen w-screen">
      <AddTrip></AddTrip>
      <TripList list={list}></TripList>
    </div>
  );
}
