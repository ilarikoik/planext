import { db } from "../firebaseConfig";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  QuerySnapshot,
  setDoc,
  updateDoc,
} from "firebase/firestore";
//

import { details, includes, trip } from "../../interface/triplist";

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
  item: { title: string; items: any[] }
) {
  try {
    const tripRef = doc(db, "users", userId, "trips", tripId);
    const tripSnap = await getDoc(tripRef);

    if (!tripSnap.exists()) {
      console.error("Trip not found");
      return;
    }

    const tripData = tripSnap.data();
    const currentPlans = tripData.plans || [];

    const newPlan = {
      title: item.title,
      plans: item.items,
    };
    await updateDoc(tripRef, {
      plans: [...currentPlans, newPlan],
    });

    console.log("Plan added successfully!");
  } catch (error) {
    console.error("Error adding plans to trip", error);
  }
}

export async function addDetailsToPlans(
  userId: string,
  tripId: string,
  plansTitle: string,
  detail: details
) {
  try {
    const tripRef = doc(db, "users", userId, "trips", tripId);
    const tripSnap = await getDoc(tripRef);
    if (!tripSnap.exists()) {
      console.error("Trip not found");
      return;
    }
    const tripData = tripSnap.data();
    const plansArray = tripData.plans || [];
    // Käydään plans läpi ja lisätään detail oikeaan kohtaan
    const updatedPlans = plansArray.map((plan: includes) => {
      if (plan.title === plansTitle) {
        return {
          ...plan,
          plans: [...plan.plans, detail],
        };
      }
      return plan;
    });
    await updateDoc(tripRef, {
      plans: updatedPlans,
    });
    console.log("Successfully added detail to plan!");
  } catch (error) {
    console.error("Error adding details to plan", error);
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
      const yearA = parseInt(a.year) || 0;
      const yearB = parseInt(b.year) || 0;
      return yearB - yearA;
    });
    return list;
  } catch (error) {
    console.log("error fetching trips from db ", error);
  }
}

// lisää tripId/plans[hotellit[item1,item2],lennot[item1,item2],kuljetus[item1,item2]]

export async function getTripById(tripId: string, uid: string) {
  try {
    const td = doc(db, "users", uid, "trips", tripId);
    const tripData = await getDoc(td);
    if (tripData) {
      const data = tripData.data();
      return {
        ...data,
        tripId: tripData.id,
      };
      // return tripData.data();
    }
    return null;
  } catch (error) {
    console.log("error while fetching trip data: ", error);
  }
}
