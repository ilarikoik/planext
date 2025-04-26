import { Timestamp } from "firebase/firestore";
import TripList from "../components/trips";

interface details {
  detailtitle: string; // HEL - ROME
  price: string; // 200€
  details: string; //lähtö porttti 3 klo.15.00
}
interface includes {
  title: string; // lennot
  plans: details[];
}

interface trip {
  tripId: string;
  destination: string;
  year: string;
  createdAt: Date | null;
  group: string[];
  plans: includes[];
}

interface tripsList {
  trips: trip[];
}

export type { tripsList, trip, details, includes };
