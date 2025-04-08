import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect } from "react";

export default function SuccessAlert() {
  return (
    <Alert
      icon={<CheckIcon fontSize="inherit" />}
      severity="success"
      className="flex justify-center items-center"
    >
      New destination added succesfully.
    </Alert>
  );
}
