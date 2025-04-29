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
import { addUserList, getUserFromList } from "./firebase/database/users";
import { userData } from "./interface/userInterface";
import Plans from "./screens/plans";

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
    const login = async () => {
      if (user) {
        navigate("/index");
        console.log("kirjaduttu sisään ");
        const adduser = {
          uid: user.uid,
          username: user.displayName,
          email: user.email,
          firsttimelog: true,
          created: new Date(),
        };
        const isUser = await getUserFromList(user.uid);
        if (!isUser) {
          await addUserList(adduser);
        }
      } else {
        navigate("/");
        console.log("kirjaduttu ulos ");
      }
    };
    login();
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
      <div className="min-h-screen ">
        {user && <Navbar handleLogout={handleLogout}></Navbar>}
        <div className="h-20 w-full justify-around items-center ">
          <Routes>
            <Route path="/" element={<Login handleLogin={handleLogin} />} />
            <Route path="/index" element={<Index />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/plan" element={<Plans />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}
``;
export default function App() {
  return (
    <Router>
      <AppContent></AppContent>
    </Router>
  );
}
