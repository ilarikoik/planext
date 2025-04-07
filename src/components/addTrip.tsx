import AddIcon from "@mui/icons-material/Add";
import AddLocationAltOutlinedIcon from "@mui/icons-material/AddLocationAltOutlined";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";

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
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <>
      <div className="flex justify-center items-center w-full pt-7">
        {/* <div
          onClick={handleOpen}
          className="h-12 w-12 bg-accent rounded-full flex justify-center items-center hover:cursor-pointer"
        >
          <AddIcon sx={{ color: "white" }} fontSize="large" />
        </div> */}
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
      <div>
        <Modal
          open={open}
          onClose={handleClose}
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
                onClick={handleClose}
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
