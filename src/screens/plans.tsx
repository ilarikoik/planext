//
//

import { Button } from "@mui/material";
import { useState } from "react";
import AddPlan from "../components/addPlan";
import { details } from "../interface/triplist";
// hae db kaikki matkat ja sitten navigate tänne ja aseta sen id:n perusteella otsikoks destination jne...
export default function Plans() {
  const [plans, setPlans] = useState<details>({
    detailtitle: "",
    price: "",
    details: "",
  });

  // hae plans tietokannasta ekaks
  return (
    <div className="bg-background h-screen w-screen ">
      <h1 className=" text-accent font-bold text-3xl w-full justify-center items-center flex pt-10">
        DESTINATION
      </h1>
      <div className="bg-slate-600 w-full h-full flex flex-col">
        <AddPlan></AddPlan>
      </div>
    </div>
  );
}
