import AddIcon from "@mui/icons-material/Add";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import SuccessAlert from "./successAlert";
import { getAuth } from "firebase/auth";
import { addTrip } from "../firebase/database/trips";
import { trip, tripsList } from "../interface/triplist";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

interface handleOpenClose {
  handleOpen: () => void;
  handleClose: () => void;
  open: boolean;
}

export default function AddTrip({
  handleOpen,
  handleClose,
  open,
}: handleOpenClose) {
  const auth = getAuth();
  const user = auth.currentUser;
  // const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [success, setSuccess] = useState(true);
  const [trip, setTrip] = useState<trip>({
    destination: "",
    year: "",
    createdAt: null,
    group: [],
    plans: [],
  });
  // const [open, setOpen] = useState(false);
  // const handleOpen = () => setOpen(true);
  // const handleClose = () => setOpen(false);

  const handleClick = () => {
    handleTrip();
    setShowAlert(true);
    handleClose();
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
  };

  const handleTrip = async () => {
    setSuccess(true);
    if (user?.uid) {
      const send = {
        destination: trip.destination,
        year: trip.year,
        createdAt: new Date(),
        group: [...trip.group, user.uid],
        plans: [],
      };
      const succ = await addTrip(user?.uid, send);
      if (!succ) {
        setSuccess(false);
      }
    }
    setTrip({ ...trip, createdAt: null, destination: "", year: "", group: [] });
  };

  return (
    <>
      <div className="flex justify-center items-center w-full pt-7 ">
        <div
          onClick={handleOpen}
          className="h-12 w-fit p-3 text-primary items-center justify-center flex hover:cursor-pointer font-bold"
        >
          <AddLocationAltOutlinedIcon
            sx={{ color: "#00a6a6" }}
            fontSize="medium"
          />
          Add destination
        </div>
      </div>
      <div className=" h-8 w-full">
        {showAlert && <SuccessAlert success={success}></SuccessAlert>}
      </div>
      <div>
        <Modal
          open={open}
          // onClose={handleClick}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new destination
            </Typography>
            <Stack spacing={2}>
              <TextField
                onChange={(e) =>
                  setTrip({ ...trip, destination: e.target.value })
                }
                value={trip.destination}
                id="destination"
                label="Destination"
                variant="outlined"
                size="medium"
                color="warning"
              />
              <TextField
                onChange={(e) => setTrip({ ...trip, year: e.target.value })}
                value={trip.year}
                id="destination"
                label="Year"
                variant="outlined"
                size="medium"
                color="warning"
              />
              <div className="w-full h-full  flex justify-center items-center">
                <Button
                  className=" hover:bg-orange-500 hover:text-white w-2/5"
                  color="warning"
                  sx={{ fontWeight: "bold" }}
                  onClick={handleClick}
                >
                  OK
                </Button>
                <Button
                  className=" hover:bg-red-500 hover:text-white w-2/5"
                  color="error"
                  sx={{ fontWeight: "bold" }}
                  onClick={handleClose}
                >
                  Close
                </Button>
              </div>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}
