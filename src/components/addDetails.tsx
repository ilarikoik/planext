import AddIcon from "@mui/icons-material/Add";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Stack, TextField } from "@mui/material";
import { useState } from "react";
import { getAuth } from "firebase/auth";
import { addDetailsToPlans, addPlansToTrip } from "../firebase/database/trips";
import { details, trip } from "../interface/triplist";

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
  handleClose: () => void;
  handleOpen: () => void;
  handleRefresh: () => void; // haetaan data uudestaa kun päivitetään
  tripId: string;
  plansTitle: string;
}

export default function AddDetails({
  handleOpen,
  handleClose,
  handleRefresh,
  tripId,
  plansTitle,
}: handle) {
  const auth = getAuth();
  const user = auth.currentUser;
  const [details, setDetails] = useState<details>({
    detailtitle: "",
    price: "",
    details: "",
  });

  // tallenetaan objekti oikeaan Plans kohtaan
  const handleClick = async () => {
    console.log(details);
    console.log(tripId.toString());
    if (user?.uid && tripId) {
      await addDetailsToPlans(user.uid, tripId, plansTitle, details);
    }
    handleClose();
    handleRefresh();
  };

  return (
    <>
      <div className="flex justify-center items-center w-full pt-7 ">
        <div
          onClick={handleOpen}
          className="h-12 w-fit p-3 text-primary items-center justify-center flex hover:cursor-pointer font-bold"
        ></div>
      </div>
      <div>
        <Modal
          open={true}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Add items - price by group
            </Typography>
            <Stack spacing={2}>
              <TextField
                label="example Flight: HELSINKI to OSLO"
                variant="outlined"
                size="medium"
                color="warning"
                value={details.detailtitle}
                onChange={(e) =>
                  setDetails({ ...details, detailtitle: e.target.value })
                }
              />
              <TextField
                label="Amount: 150€"
                variant="outlined"
                size="medium"
                color="warning"
                value={details.price}
                onChange={(e) =>
                  setDetails({ ...details, price: e.target.value })
                }
              />
              <TextField
                label="Additional info..."
                variant="outlined"
                size="medium"
                color="warning"
                value={details.details}
                onChange={(e) =>
                  setDetails({ ...details, details: e.target.value })
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
