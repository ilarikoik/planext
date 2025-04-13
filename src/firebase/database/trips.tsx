import { db } from "../firebaseConfig";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
//

import { trip } from "../../interface/triplist";

export async function addTrip(userId: string, trip: trip) {
  //   console.log(userId + "  " + JSON.stringify(trip));
  try {
    //addDoc,collection() silloin kun tehdään alempi taulu
    // setDoc,doc() kun tehdään parent taulu
    if (trip.destination.length <= 0) {
      console.log("virehee");
      return false;
    }
    await addDoc(collection(db, "users", userId, "trips"), {
      destination: trip.destination,
      year: trip.year,
      createdAt: trip.createdAt,
      group: trip.group,
    });
    return true;
  } catch (error) {
    console.log("error adding new trip: ", error);
    return false;
  }
}
