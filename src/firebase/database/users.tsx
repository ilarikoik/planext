import { setDoc, doc, getDoc, collection, getDocs } from "firebase/firestore";
import { auth } from "../auth/loginWithGoogle";
import { userData } from "../../interface/userInterface";
import { app, db } from "../firebaseConfig";

export async function addUserList(user: userData) {
  if (!user) {
    console.log("user NULLLL");
  }
  try {
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      username: user.username,
      email: user.email,
      firsttimelog: true,
      created: user.created,
    });
    console.log(`user ${user.email} added to database`);
  } catch (error) {
    console.log("error while adding user to database ", error);
  }
}

export async function getUserFromList(uid: string) {
  if (!uid) {
    return;
  }
  try {
    const user = doc(db, "users", uid);
    const userdata = await getDoc(user);
    if (userdata.exists()) {
      console.log("käyttäjä löyty");
      return true;
    } else {
      console.log("käyttäjää ei löytynyt");
      return false;
    }
  } catch (error) {
    console.log("error while fetching user: ", error);
  }
}

export async function getUserByEmail(email: string) {
  try {
    const usersRef = collection(db, "users");
    const snapshot = await getDocs(usersRef);
    // forEach ei voi returnaa kesken loopin vaa pitää käyttää tätä
    for (const doc of snapshot.docs) {
      let curremail = doc.data().email;
      if (curremail == email.trim()) {
        console.log(doc.data().uid + " uid");
        return doc.data().uid;
      }
    }
    return null;
  } catch (error) {
    console.log("error fetcinh user with email ", error);
  }
}
