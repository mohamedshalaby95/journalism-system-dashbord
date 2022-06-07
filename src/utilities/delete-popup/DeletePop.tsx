import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, Input, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Delete } from "@mui/icons-material";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

function DeleteCategoryPopus(props: any) {
  const notify = (input: string) => toast(input);
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch: any = useDispatch();
  const { loading, hasError } = useSelector((state: any) => state.status);

  const confirmDelete = React.useCallback(() => {
    dispatch(props.dispatchFunction(props.id));

    handleClose();
    let check: any = localStorage.getItem("check");

    if (check) {
      notify("deleted");
      localStorage.removeItem("check");
    } else {
      notify("some thing went wrong");
    }
  }, [props, dispatch, notify, hasError, loading]);

  return (
    <Box py={4}>
      <IconButton aria-label="delete" size="large" onClick={handleOpen}>
        <Delete color="error" />
      </IconButton>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            variant="h6"
            component="h2"
            align={"center"}
            sx={{ marginBottom: "20px" }}
          >
            Delete Category
          </Typography>
          <Stack spacing={2} direction={"row"} justifyContent={"center"}>
            <Button variant="contained" color="error" onClick={confirmDelete}>
              Confirm
            </Button>
            <Button variant="contained" color="primary" onClick={handleClose}>
              Cancel
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}

export default React.memo(DeleteCategoryPopus);
