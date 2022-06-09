import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Alert, Input, Stack, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Icategory } from "../../types/category";
import { UpdateCategory } from "../../redux/actions/CategoryActions";
import validateCategoryForm from "../../validation/category/categoryValidation";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

export default function UpdateCategoryPopus({ category }: any) {
  const [open, setOpen] = React.useState(false);
  const [errorList, setErrorList] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(category.title);
  const dispatch: any = useDispatch();
  const data = useSelector((state:any) => state.status.hasError);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  
    setValue(event.target.value);
  };
  const updateHandler = () => {
    let validateCategoryFormResult: any = validateCategoryForm({
      category: value,
    });
    if (validateCategoryFormResult.error) {
      setErrorList(validateCategoryFormResult.error.details);
    } else {
      dispatch(UpdateCategory(category, value));
    handleClose()
    }
    
  };
 
  return (
    <Box py={4}>
      <Button variant="contained" onClick={handleOpen}>
        Update
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
            Update Category
          </Typography>
          <Stack spacing={5}>
            <Input
              placeholder="Update Category"
              value={value}
              onChange={handleInputChange}
            />
            {errorList
              ? errorList.map((error: any, index: any) => {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                })
              : ""}
            <Button variant="contained" onClick={updateHandler}>
              Update
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
