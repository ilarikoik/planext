import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import SuccessAlert from "./successAlert";
import { getAuth } from "firebase/auth";
import { addPlansToTrip } from "../firebase/database/trips";
import { trip } from "../interface/triplist";

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

interface AddPlanProps {
  tripId: string;
  handleRefresh: () => void; // haetaan data uudestaa kun päivitetään
}

export default function AddPlan({ tripId, handleRefresh }: AddPlanProps) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  const [planitem, setPlanItem] = useState({
    title: "",
    items: [],
  });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    console.log(planitem);
    console.log(tripId.toString());
    if (user?.uid && tripId) {
      await addPlansToTrip(user?.uid, tripId, planitem);
    }
    handleClose();
    handleRefresh();
    setPlanItem({ ...planitem, title: "" });
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div
          onClick={handleOpen}
          className=" flex hover:cursor-pointer font-bold"
        >
          <Button sx={{ color: "#FCA311" }}>
            <AddIcon></AddIcon>
            <p className="font-bold ">Add container</p>
          </Button>
        </div>
      </div>
      <div>
        <Modal
          open={open}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add new item
            </Typography>
            <Stack spacing={2}>
              <TextField
                id="item"
                label="Flights, hotels, transport..."
                variant="outlined"
                size="medium"
                color="warning"
                value={planitem.title}
                onChange={(e) =>
                  setPlanItem({ ...planitem, title: e.target.value })
                }
              />
              <div className="flex w-full">
                <Button
                  className=" hover:bg-orange-500 hover:text-white w-3/6"
                  color="warning"
                  sx={{ fontWeight: "bold" }}
                  onClick={handleClick}
                >
                  OK
                </Button>
                <Button
                  className=" hover:bg-red-500 hover:text-white w-3/6"
                  color="warning"
                  sx={{ fontWeight: "bold" }}
                  onClick={handleClose}
                >
                  CLOSE
                </Button>
              </div>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}
