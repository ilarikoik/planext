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

import { details, includes, trip, tripsList } from "../../interface/triplist";
import { useReducer } from "react";

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

export async function deleteDetailsFromPlans(
  userId: string,
  tripId: string,
  detail: details,
  index: number
) {
  try {
    const tripRef = doc(db, "users", userId, "trips", tripId);
    const tripSnap = await getDoc(tripRef);
    if (!tripSnap.exists()) {
      console.error("Trip not found");
      return;
    }

    const tripData = tripSnap.data();
    const plans = tripData.plans || [];

    const updated = plans[index].plans.filter(
      (item: details) => item.detailtitle !== detail.detailtitle
    );

    // pävittää vaan tän tietyn containerin
    plans[index] = {
      ...plans[index],
      plans: updated,
    };

    await updateDoc(tripRef, {
      plans: plans,
    });
  } catch (error) {
    console.error("Error deleting details from plan", error);
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

export async function deleteTripContainer(
  tripdId: string,
  uid: string,
  givenIndex: number
) {
  try {
    const td = doc(db, "users", uid, "trips", tripdId);
    const tripSnap = await getDoc(td);

    if (!tripSnap.exists()) {
      console.error("Trip not found");
      return;
    }

    const tripData = tripSnap.data();
    const plans = tripData.plans || [];

    // !! tää poistaa kaikki saalla titlellä olevat
    // const udpt = plans.filter(
    //   (item: includes) => item.title !== plans[givenIndex].title
    // );
    const udpt: includes[] = [];
    plans.forEach((item: any, index: number) => {
      if (index !== givenIndex) {
        udpt.push(item);
      }
    });
    await updateDoc(td, {
      plans: udpt,
    });
  } catch (error) {
    console.log("Virhe poistettaessa containeria ", error);
  }
  return false;
}

// toinen saa näkyviin tän tripin mutta sen update ei näy muille sitte
// myöskään trip group ei kulje mukana ilmeisesti
// poistan käytöstä ja kokeilla uudestaa joskus
// firebase luvat kaikki auki atm tän sekoilun jälkee
// export async function AddToGroup(
//   person: string,
//   userId: string,
//   tripId: string
// ) {
//   try {
//     const tripRef = doc(db, "users", userId, "trips", tripId);
//     const tripSnap = await getDoc(tripRef);

//     if (!tripSnap.exists()) {
//       console.error("Trip not found");
//       return;
//     }
//     const tripData = tripSnap.data();
//     const currentGroup = tripData.group || [];

//     await updateDoc(tripRef, {
//       group: [...currentGroup, person],
//     });
//     // kopioidaan trip toisen käyttäjälle, mutta päivitys ei toimi
//     const tripDoc = tripSnap.data();
//     await addDoc(collection(db, "users", person, "trips"), {
//       ...tripDoc,
//     });

//     return "Added person to group and updated person’s trip list";
//   } catch (error) {
//     console.log("error while adding person to group ", error);
//   }
// }
