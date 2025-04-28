import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { getUserByEmail } from "../firebase/database/users";
import { AddToGroup } from "../firebase/database/trips";

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

interface handle {
  tripId: string;
  uid: string;
}

export default function AddPersonToGroup({ tripId, uid }: handle) {
  const [open, setOpen] = useState(false);
  const [searchEmail, setSearchEmail] = useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleClick = async () => {
    if (searchEmail) {
      const person = await getUserByEmail(searchEmail);
      console.log(person, "personnnn");
      if (person && uid && tripId) {
        let res = await AddToGroup(person, uid, tripId);
        console.log(res);
      } else {
        console.log("virhe");
      }
    }
    handleClose();
  };

  return (
    <>
      <div className="flex justify-center items-center ">
        <div
          onClick={handleOpen}
          className=" flex hover:cursor-pointer font-bold"
        >
          <Button color="success">
            <AddIcon></AddIcon>
            <p className="font-bold ">Add Person</p>
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
              Search with email
            </Typography>
            <Stack spacing={2}>
              <TextField
                id="email"
                label="example@gmail.com"
                variant="outlined"
                size="medium"
                color="warning"
                onChange={(e) => setSearchEmail(e.target.value)}
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
