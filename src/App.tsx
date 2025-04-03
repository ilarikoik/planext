import { Route, Routes, Link } from "react-router-dom";
import Login from "./screens/login";
import Index from "./screens"; // Tai mikä tahansa muu komponentti
import Navigation from "./navigation/navigation";

export default function App() {
  return (
    <div className="min-h-screen bg-secondary min-w-full">
      {/* Linkit navigointiin */}
      <Login></Login>
    </div>
  );
}
