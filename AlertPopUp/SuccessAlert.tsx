"use client";
import React from "react";
import MuiAlert, { AlertColor, AlertProps } from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";
import { useHiveConfigContext } from "context/Hive/hiveConfig";

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SuccessAlert = () => {
  const hiveConfig = useHiveConfigContext();

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    hiveConfig.setAlertOpen("none");
  };

  return (
    <Snackbar
      open={hiveConfig.alertOpen?.type === "success"}
      autoHideDuration={6000}
      onClose={handleClose}
    >
      <Alert
        onClose={handleClose}
        severity="success"
        sx={{ width: "100%" }}
        onClick={handleClose}
        role="button"
      >
        {hiveConfig.alertOpen?.message}
      </Alert>
    </Snackbar>
  );
};

export default SuccessAlert;
