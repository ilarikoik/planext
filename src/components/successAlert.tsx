import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";
import ErrorIcon from "@mui/icons-material/Error";
import { useEffect, useState } from "react";

interface successValue {
  success: boolean;
}
export default function SuccessAlert({ success }: successValue) {
  return (
    <>
      {success ? (
        <Alert
          icon={<CheckIcon fontSize="inherit" />}
          severity="success"
          className="flex justify-center items-center"
        >
          New destination added succesfully.
        </Alert>
      ) : (
        <Alert
          icon={<ErrorIcon fontSize="inherit" />}
          severity="error"
          className="flex justify-center items-center"
        >
          Something went wrong. Try again.
        </Alert>
      )}
    </>
  );
}
