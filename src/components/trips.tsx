import { useEffect, useState } from "react";
import LoadingSkeletonTrip from "./loadingSkeletonTrip";
import { tripsList } from "../interface/triplist";

interface trip {
  place: string;
  year: number;
}
// trip - place, year
// + lisätään kohtia kuten lennot , kuljetus, ruoka, hotelli jne
// ne sitte lisätään trip taulun sisää ja sitte map() tuodaan ne kaikki sieltä joteki?

// pitäs yhistää TRIP taulu ja CATEGORIES(kuten lennot, hotelli,ruoka jne..) taulu joteki? onko FK käytössä firebasessa?
// CATEGORIES taulussa jokaselle kohdalle pitäs sitte tehä oma taulu jossa attribuuttina esim hotellin nimi ja hinta?

export default function TripList({ trips }: tripsList) {
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
                <div className="flex flex-col justify-center items-center hover:cursor-pointer">
                  <h2 className="text-xl font-semibold md:text-3xl text-accent">
                    {item.destination}
                  </h2>
                  <hr className="border-2 border-accent w-4/5" />
                  <h2 className="text-lg font-semibold md:text-2xl text-accent">
                    {item.year}
                  </h2>
                </div>
              </div>
            );
          })}
      </div>
      {/* )} */}
    </>
  );
}
