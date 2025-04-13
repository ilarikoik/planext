import { Timestamp } from "firebase/firestore/lite";

export interface userData {
  uid: string;
  username: string;
  email: string;
  firsttimelog: boolean;
  created: Date;
}
