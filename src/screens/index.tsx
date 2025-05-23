//
//

import { useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/userContext";
import TripList from "../components/trips";
import AddTrip from "../components/addTrip";
import { getAllUsersTrips } from "../firebase/database/trips";
import LoadingSkeletonTrip from "../components/loadingSkeletonTrip";

export default function Index() {
  const user = useContext(UserContext);
  const [trips, setTrips] = useState<any>();
  const [loading, setLoading] = useState(true);

  const [ref, setRef] = useState(false);
  const handleRef = () => setRef(!ref);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    const get = async () => {
      const data = await getAllUsersTrips(user.uid);
      if (data) {
        setTrips(data);
      }
    };
    setLoading(false);
    get();
  }, [user, open, ref]);

  return (
    <div className="bg-background h-screen w-screen">
      <AddTrip
        handleOpen={handleOpen}
        handleClose={handleClose}
        open={open}
      ></AddTrip>
      {loading ? (
        <LoadingSkeletonTrip />
      ) : (
        <TripList trips={trips} handleRef={handleRef}></TripList>
      )}
    </div>
  );
}
