import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Input, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/actions/CategoryActions";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};
type propType = { state: boolean };

export default function AddCategoryPopup(props: propType) {
  const [open, setOpen] = React.useState(props.state);
  const [inputValue, setInputValue] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: any = useDispatch();
  const { success } = useSelector((state: any) => state.status);
  const addHandler = () => {
    dispatch(addCategory(inputValue));
    // console.log(success)
    // if (success) {
    //   // alert()
    // }
    handleClose();
    setInputValue("")
  };
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <Box py={4}>
      <Button variant="outlined" onClick={handleOpen}>
        Add Category
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
            sx={{ marginBottom: "10px" }}
          >
            Add Category
          </Typography>
          <Stack spacing={5}>
            <Input
              placeholder="Add Category"
              value={inputValue}
              onChange={inputHandler}
            />
            <Button variant="contained" onClick={addHandler}>
              Add
            </Button>
          </Stack>

          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </Box>
  );
}