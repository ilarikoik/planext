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

// jos käyttäjää ei ole niin se palaa samantie Login pagelle
// useNavigate` ei voi toimia Routerin ulkopuolella, joten AppContent sijoitetaan App-komponenttiin
// jossa se ympäröidään <Router/>-komponentilla. Näin navigaatio toimii oikein.
function AppContent() {
  const navigate = useNavigate();

  const user = {
    user:"ilari",
    logged: true
  }

// auth yhteydessä tämä ja Navbar näkyvyys pitäs toimia oikein 
  useEffect(() => {
    if (!user) {
      navigate("/");
      console.log("kirjaduttu ulos ");
    }
  }, [user]);

  //userContextilla helppo antaa arvoja mihin vaan sovelluksessa mutta niiden tilan päivittäminen vähän vaikeampaa koska ei voi useStatella päivittää suoraan sitä arvoa vaan useState päivittää sitten arvoa paikallisesti vaan. Pitää tehdä erillinen funnktio sitä varten.
  return (
    <UserContext.Provider value={user}>
    <div className="min-h-screen bg-secondary min-w-full">
      {user && <Navbar></Navbar>}
      <div className="h-20 w-full bg-red-500 justify-around items-center ">
        <Routes>
          <Route
            path="/"
            element={<Login />}
            />
          <Route
            path="/index"
            element={<Index />}
            />
          <Route
            path="/profile"
            element={<Profile />}
            />
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
