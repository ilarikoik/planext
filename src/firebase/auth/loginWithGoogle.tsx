import { signInWithPopup, GoogleAuthProvider, getAuth } from "firebase/auth";
import app from "../firebaseConfig";

const provider = new GoogleAuthProvider();
const auth = getAuth(app);

export const handleGoogleLogin = async () => {
  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    localStorage.setItem("user", JSON.stringify(user));
    console.log("User info:", user.uid);
    return user;
  } catch (error: any) {
    console.error("Error during Google login:", error.message);
  }
};

export { auth };
