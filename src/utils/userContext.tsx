import { createContext } from "react";
import { userData } from "../interface/userInterface";

export const UserContext = createContext<userData | null>(null);
