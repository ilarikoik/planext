//
//

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/userContext";
import TripList from "../components/trips";
import AddTrip from "../components/addTrip";
import { getUserFromList } from "../firebase/database/users";
import { userData } from "../interface/userInterface";

export default function Index() {
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
