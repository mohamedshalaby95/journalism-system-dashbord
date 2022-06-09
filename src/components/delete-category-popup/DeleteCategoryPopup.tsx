import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategory } from "../../redux/actions/CategoryActions";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const notify = (input:string) => toast(input);
  const [open, setOpen] = React.useState(false);
  // const [toast, setToast] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const dispatch: any = useDispatch();
  const { success } = useSelector((state: any) => state.status);

  const confirmDelete = React.useCallback(() => {
    dispatch(deleteCategory(props.id));
    // handleClose();
    // if (success) {
    //   //  alert("deleted");
    //   notify("deleted");
    // } else {
    //   notify("some thing went wrong");
    // }
  }, [props, dispatch, success]);
  return (
    <Box py={4}>
      <Button variant="contained" color="error" onClick={handleOpen}>
        Delete
      </Button>
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
