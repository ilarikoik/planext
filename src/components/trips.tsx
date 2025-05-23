import { useContext, useEffect, useState } from "react";
import LoadingSkeletonTrip from "./loadingSkeletonTrip";
import { tripsList, trip } from "../interface/triplist";
import { UserContext } from "../utils/userContext";
import { deleteTrip, getTripById } from "../firebase/database/trips";
import { useNavigate } from "react-router";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface ListPara {
  handleRef: () => void;
  trips: trip[];
}

export default function TripList({ handleRef, trips }: ListPara) {
  const user = useContext(UserContext);
  const navigate = useNavigate();

  const getTripDetails = async (tripId: string) => {
    navigate("/plan", { state: { tripId: tripId } });
  };

  const handleDelete = (tripId: string) => {
    deleteTrip(user.uid, tripId);
    handleRef();
  };
  return (
    <>
      {/* {!loading ? (
        <LoadingSkeletonTrip trips={trips} />
      ) : ( */}
      <div className=" w-full h-fit flex flex-col justify-center items-center p-3">
        {trips &&
          trips.map((item, index) => {
            return (
              <div
                key={index}
                className="h-32 w-full max-w-[700px] flex-row justify-center items-center m-5 p-5 rounded-md shadow-lg shadow-grey "
              >
                <div
                  className="flex flex-col justify-center items-center hover:cursor-pointer  "
                  onClick={() => getTripDetails(item.tripId)}
                >
                  <h2 className="text-xl font-semibold md:text-3xl text-accent">
                    {item.destination.toUpperCase()}
                  </h2>
                  <hr className="border-2 border-accent w-4/5" />
                  <h2 className="text-lg font-semibold md:text-2xl text-accent">
                    {item.year}
                  </h2>
                </div>
                <div className=" flex  justify-end ">
                  <DeleteOutlineIcon
                    color="error"
                    className="hover:cursor-pointer"
                    onClick={() => handleDelete(item.tripId)}
                  />
                </div>
              </div>
            );
          })}
      </div>
      {/* )} */}
    </>
  );
}
