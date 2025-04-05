
import { createContext } from "react";
import { userInterface } from "../interface/userInterface";

export const UserContext = createContext<userInterface | null>(null);

