import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import SuccessAlert from "./successAlert";
import { getAuth } from "firebase/auth";

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

export default function AddPlan() {
  const auth = getAuth();
  const user = auth.currentUser;
  const [open, setOpen] = useState(false);
  //   const [trip, setTrip] = useState<trip>({
  //     destination: "",
  //     year: "",
  //     createdAt: null,
  //     group: [],
  //     plans: [],
  //   });
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = () => {
    handleClose();
  };

  return (
    <>
      <div className="flex justify-center items-center w-full pt-7 ">
        <div
          onClick={handleOpen}
          className="h-12 w-fit p-3 text-primary items-center justify-center flex hover:cursor-pointer font-bold"
        >
          <Button variant="outlined" color="warning">
            <p className="font-bold ">Add item</p>
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
              />
              <Button
                className=" hover:bg-orange-500 hover:text-white"
                color="warning"
                sx={{ fontWeight: "bold" }}
                onClick={handleClick}
              >
                OK
              </Button>
            </Stack>
          </Box>
        </Modal>
      </div>
    </>
  );
}
