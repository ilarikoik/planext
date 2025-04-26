//
//
import AddIcon from "@mui/icons-material/Add";

import { Button } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import AddPlan from "../components/addPlan";
import { details, includes, trip } from "../interface/triplist";
import { useLocation } from "react-router";
import { getTripById } from "../firebase/database/trips";
import { getAuth } from "firebase/auth";
import AddDetails from "../components/addDetails";
// hae db kaikki matkat ja sitten navigate tänne ja aseta sen id:n perusteella otsikoks destination jne...
export default function Plans() {
  const [plansTitle, setPlansTitle] = useState("");
  const location = useLocation();
  // const tripdata = location.state?.tripdata;
  const tripId = location.state?.tripId;
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<any>();

  // if (tripdata) {
  //   console.log(tripdata);
  // }

  useEffect(() => {
    const get = async () => {
      if (user?.uid) {
        let res = await getTripById(tripId, user?.uid);
        if (res) {
          setData(res);
        }
      }
    };
    get();
  }, [refresh]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRefresh = () => setRefresh(!refresh);

  const handleAdd = (title: string) => {
    setPlansTitle(title);
    handleOpen();
  };

  if (!data) {
    return <p>emptyyyyyyyyyyyyyyyyyyyy</p>;
  }
  return (
    <div className="bg-background h-screen w-screen ">
      <h1 className=" text-accent font-semibold text-3xl w-full justify-center items-center flex pt-10">
        {data.destination.toUpperCase()}
      </h1>
      <div className=" w-full h-full flex flex-col items-center">
        <AddPlan tripId={tripId} handleRefresh={handleRefresh}></AddPlan>
        {open && (
          <AddDetails
            handleClose={handleClose}
            handleOpen={handleOpen}
            handleRefresh={handleRefresh}
            tripId={tripId}
            plansTitle={plansTitle}
          ></AddDetails>
        )}
        {data.plans &&
          data.plans.map((item: includes, index: any) => {
            return (
              <div
                key={index}
                className="h-fit p-5 w-4/6 shadow-lg border-black rounded-lg m-4"
              >
                <div className="flex flex-col items-center  center w-full">
                  <div className="flex w-full">
                    <h2 className=" w-3/6 flex justify-start ml-5 text-primary font-bold text-xl">
                      {item.title}
                    </h2>
                    <p
                      className="flex justify-end  w-3/6 "
                      onClick={() => handleAdd(item.title)}
                    >
                      <AddIcon
                        className="hover:cursor-pointer"
                        sx={{ color: "orange" }}
                        fontSize="large"
                      ></AddIcon>
                    </p>
                  </div>
                  {item.plans.map((detail: any, idx: number) => {
                    return (
                      // kaikki kaikki plans taulukon kohdat läpi esim lentojen sisällön
                      <div className=" h-fit w-full p-2 items-center flex">
                        <div
                          key={idx}
                          className="flex justify-between items-center w-full font-semibold"
                        >
                          <p>{detail.detailtitle.toUpperCase()} </p>
                          <p>{detail.price.toUpperCase()} €</p>
                          <p>{detail.details.toUpperCase()}</p>
                          {/* <p>{sum}</p> */}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
