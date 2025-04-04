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

// jos käyttäjää ei ole niin se palaa samantie Login pagelle
// useNavigate` ei voi toimia Routerin ulkopuolella, joten AppContent sijoitetaan App-komponenttiin
// jossa se ympäröidään <Router/>-komponentilla. Näin navigaatio toimii oikein.
function AppContent() {
  const [user, setUser] = useState(true);
  const navigate = useNavigate();

  const handleUser = () => {
    setUser(!user);
  };

  useEffect(() => {
    console.log(user);
    if (!user) {
      navigate("/");
    }
  }, [user]);

  return (
    <div className="min-h-screen bg-secondary min-w-full">
      {user && <Navbar></Navbar>}
      <div className="h-20 w-full bg-red-500 justify-around items-center ">
        <Routes>
          <Route
            path="/"
            element={<Login user={user} handleUser={handleUser} />}
          />
          <Route
            path="/index"
            element={<Index user={user} handleUser={handleUser} />}
          />
          <Route
            path="/profile"
            element={<Profile user={user} handleUser={handleUser} />}
          />
          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent></AppContent>
    </Router>
  );
}
