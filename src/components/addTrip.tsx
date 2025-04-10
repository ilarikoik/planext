import AddIcon from "@mui/icons-material/Add";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import SuccessAlert from "./successAlert";

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

export default function AddTrip() {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // näytetää alert 3s
  const handleClick = () => {
    setShowAlert(true);
    handleClose();
    // lisää if error ... error alert
    setTimeout(() => {
      setShowAlert(false);
    }, 3000);
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
      <div className="m-5">{showAlert && <SuccessAlert></SuccessAlert>}</div>
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
                id="destination"
                label="Destination"
                variant="outlined"
                size="medium"
                color="warning"
              />
              <TextField
                id="destination"
                label="Year"
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
