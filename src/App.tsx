import Login from "./screens/login";
import Index from "./screens";
import Error from "./screens/error";
import Navbar from "./navigation/navbar";
import Profile from "./screens/profile";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useNavigate,
} from "react-router-dom";
import { useEffect, useState } from "react";

import { UserContext } from "./utils/userContext";
import { auth, handleGoogleLogin } from "./firebase/auth/loginWithGoogle";
import { Auth, signOut } from "firebase/auth";

// useNavigate` ei voi toimia Routerin ulkopuolella, joten AppContent sijoitetaan App-komponenttiin
// jossa se ympäröidään <Router/>-komponentilla. Näin navigaatio toimii oikein.
function AppContent() {
  const navigate = useNavigate();
  const [user, setUser] = useState<any>(null);

  // ainaku sivu päivitetää niin asetetaan localStoragesta user stateen käyttäjä
  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      navigate("/index");
      console.log("kirjaduttu sisään ");
    } else {
      //saattaa aiheuttaa jotai ongelmia myöhemmi jos user tila päivittyy jostai syystä
      navigate("/");
      console.log("kirjaduttu ulos ");
    }
  }, [user]);

  const handleLogin = async () => {
    let res = await handleGoogleLogin();
    if (res) {
      setUser(res);
    }
  };

  const handleLogout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <UserContext.Provider value={user}>
      <div className="min-h-screen bg-primary min-w-full">
        {user && <Navbar handleLogout={handleLogout}></Navbar>}
        <div className="h-20 w-full bg-red-500 justify-around items-center ">
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/index" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent></AppContent>
    </Router>
  );
}
