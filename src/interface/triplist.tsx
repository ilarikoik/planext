import { Timestamp } from "firebase/firestore";
import TripList from "../components/trips";

interface trip {
  destination: string;
  year: string;
  createdAt: Date | null;
  group: string[];
}

interface tripsList {
  trip: trip[];
}

export type { tripsList, trip };
