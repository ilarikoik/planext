import { db } from "../firebaseConfig";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
} from "firebase/firestore";
//

import { includes, trip } from "../../interface/triplist";

export async function addTrip(userId: string, trip: trip) {
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
      plans: trip.plans,
    });
    return true;
  } catch (error) {
    console.log("error adding new trip: ", error);
    return false;
  }
}

export async function addPlansToTrip(
  userId: string,
  tripId: string,
  plan: includes
) {
  try {
    await addDoc(collection(db, "users", userId, "trips", tripId), {
      title: plan.title,
      details: plan.plans,
    });
  } catch (error) {
    console.log("error adding plans to trip ", error);
  }
}

export async function getAllUsersTrips(userId: string) {
  try {
    const list: any[] = [];
    const alltrips = await getDocs(collection(db, "users", userId, "trips"));
    alltrips.forEach((doc) => {
      list.push({
        tripId: doc.id,
        ...doc.data(),
      });
    });
    list.sort((a, b) => {
      const yearA = parseInt(a.year) || 0; // jos ei ole luku, käytetään oletusarvoa 0
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
    return list;
  } catch (error) {
    console.log("error fetching trips from db ", error);
  }
}
