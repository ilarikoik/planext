import { getAuth, signOut } from "firebase/auth";

const auth = getAuth();

signOut(auth)
  .then(() => {
    console.log("kirjautddu ulos signout metodilla");
  })
  .catch((error) => {
    // An error happened.
    console.log("Logout error: ", error);
  });
