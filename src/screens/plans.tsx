//
//
import AddIcon from "@mui/icons-material/Add";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import PeopleIcon from "@mui/icons-material/People";
import PersonIcon from "@mui/icons-material/Person";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useEffect, useRef, useState } from "react";
import AddPlan from "../components/addPlan";
import { details, includes, trip } from "../interface/triplist";
import { useLocation } from "react-router";
import {
  deleteDetailsFromPlans,
  getTripById,
} from "../firebase/database/trips";
import { getAuth } from "firebase/auth";
import AddDetails from "../components/addDetails";
import LoadingSkeletonTrip from "../components/loadingSkeletonTrip";
import AddPersonToGroup from "../components/addPersonToGroup";
import { getUserFromList } from "../firebase/database/users";
// hae db kaikki matkat ja sitten navigate tänne ja aseta sen id:n perusteella otsikoks destination jne...
export default function Plans() {
  const [plansTitle, setPlansTitle] = useState("");
  const location = useLocation();
  // const tripdata = location.state?.tripdata;
  const tripId = location.state?.tripId;
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [data, setData] = useState<any>();
  const [group, setGroup] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleRefresh = () => setRefresh(!refresh);
  const [openIndexes, setOpenIndexes] = useState<number[]>([]);

  useEffect(() => {
    const get = async () => {
      if (user?.uid) {
        let res = await getTripById(tripId, user?.uid);
        if (res) {
          setData(res);
          console.log(res);
        }
      }
    };
    get();
  }, [refresh]);

  const handleAdd = (title: string) => {
    setPlansTitle(title);
    handleOpen();
  };

  const handleAddperson = () => {
    console.log("add");
    // hae sähköpostin kautta listasta? palauta uid ja lisätään se group
  };

  const toggleOpen = (index: number) => {
    if (openIndexes.includes(index)) {
      setOpenIndexes(openIndexes.filter((i) => i !== index)); // sulje
    } else {
      setOpenIndexes([...openIndexes, index]); // avaa
    }
  };

  if (!data) {
    return (
      <div className="bg-background h-screen w-screen pt-10">
        <LoadingSkeletonTrip />;
      </div>
    );
  }

  const deletethis = async (detail: details, index: number) => {
    if (user) {
      let res = await deleteDetailsFromPlans(user?.uid, tripId, detail, index);
    }
    handleRefresh();
  };
  return (
    <div className="bg-background h-screen w-screen ">
      <h1 className=" text-accent font-semibold text-3xl w-full justify-center items-center flex pt-10">
        {data.destination && data.destination.toUpperCase()}
      </h1>
      <h1 className="text-accent font-semibold text-lg flex justify-center">
        {"  Group size " + data.group.length + " "}
      </h1>
      <div className=" w-full h-full flex flex-col items-center">
        <div className="flex justify-around items-center flex-row w-3/5">
          <AddPlan tripId={tripId} handleRefresh={handleRefresh}></AddPlan>
          <div className=" flex hover:cursor-pointer font-bold">
            {user?.uid && <AddPersonToGroup />}
          </div>
        </div>
        {open && (
          <AddDetails
            handleClose={handleClose}
            handleOpen={handleOpen}
            handleRefresh={handleRefresh}
            tripId={tripId}
            plansTitle={plansTitle}
          ></AddDetails>
        )}

        {data.plans &&
          data.plans.map((item: includes, index: any) => {
            let summa =
              item.plans &&
              item.plans.reduce((sum, curr) => sum + parseInt(curr.price), 0);
            const isOpen = openIndexes.includes(index);
            return (
              <div
                key={index}
                className="h-fit p-5 w-4/6 shadow-lg border-black rounded-lg "
              >
                <div className="flex flex-col items-center  center w-full">
                  <div className="flex w-full">
                    <h2 className=" w-3/6 flex justify-start p-2 text-primary font-bold text-xl">
                      {item.title}
                    </h2>
                    <div
                      className=" w-full flex items-center justify-evenly hover:cursor-pointer"
                      onClick={() => setGroup(!group)}
                    >
                      <p>
                        <PeopleIcon />
                        {`${(summa / data.group.length).toFixed(2)} €`}
                      </p>
                      <p>
                        <PersonIcon /> {`${summa} €`}
                      </p>
                    </div>
                    <p
                      className="flex justify-end w-3/6 "
                      onClick={() => handleAdd(item.title)}
                    >
                      <AddIcon
                        className="hover:cursor-pointer"
                        sx={{ color: "orange" }}
                        fontSize="large"
                      ></AddIcon>
                    </p>
                  </div>
                  {!isOpen &&
                    item.plans &&
                    item.plans.map((detail: any, idx: number) => {
                      return (
                        // kaikki kaikki plans taulukon kohdat läpi esim lentojen sisällön
                        <div className="h-fit w-full p-2 items-center flex">
                          <div
                            key={idx}
                            className="flex justify-between items-center w-full  font-semibold"
                          >
                            <p
                              className="flex-1 flex justify-start "
                              onClick={() => deletethis(detail, index)}
                            >
                              <DeleteOutlineIcon
                                color="error"
                                className="hover:cursor-pointer"
                              />
                              {detail.detailtitle.toUpperCase()}
                            </p>
                            <p className="flex-1 flex justify-center">
                              {detail.price.toUpperCase()} €
                            </p>
                            <p className="flex-1 flex justify-end ">
                              {detail.details.toUpperCase()}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  <div className="flex justify-center w-full ">
                    {!isOpen ? (
                      <ArrowUpwardIcon
                        className="hover:cursor-pointer"
                        sx={{ color: "orange" }}
                        fontSize="medium"
                        onClick={() => toggleOpen(index)}
                      />
                    ) : (
                      <ArrowDownwardIcon
                        className="hover:cursor-pointer"
                        sx={{ color: "orange" }}
                        fontSize="medium"
                        onClick={() => toggleOpen(index)}
                      />
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        <div className="pt-10">
          {/* <h1 className="text-accent font-semibold text-lg">
            {" ( Group size " + data.group.length + " )"}
          </h1> */}
          {/* <h1>Group:</h1>
          {data.group &&
            data.group.map((item: any) => {
              // let id = await getUserFromList(item);
              return <div>{item}</div>;
            })} */}
        </div>
      </div>
    </div>
  );
}
