import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import {
  Alert,
  FormControl,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  FetchCategories,
} from "../../redux/actions/CategoryActions";
import {
  addSubCategory,
  addSubCategoryAction,
} from "../../redux/actions/subCategoryAction";
import validateSubCategoryForm from "../../validation/subCategory/subCategoryValidation";

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

export default function AddSubCategoryPopup() {
  const [open, setOpen] = React.useState(false);
  const [errorList, setErrorList] = React.useState([]);
  const [inputValue, setInputValue] = React.useState("");
  const [category, setCategory] = React.useState("");
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: any = useDispatch();
  const { success } = useSelector((state: any) => state.status);
  React.useEffect(() => {
    dispatch(FetchCategories());
  }, [dispatch]);
  const data = useSelector((state: any) => state.category.data);
  const addHandler = () => {
    // dispatch(addCategory(inputValue));
    //add add sub category action creator
    let validateSubCategoryFormResult: any = validateSubCategoryForm({
      category: category,
      subcategory: inputValue,
    });
    if (validateSubCategoryFormResult.error) {
      setErrorList(validateSubCategoryFormResult.error.details);
    } else {
      dispatch(addSubCategory({ title: inputValue, parent: category }));
      handleClose();
      setInputValue("");
      setErrorList([]);
    }
  };
  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  return (
    <Box py={4}>
      <Button variant="outlined" onClick={handleOpen}>
        Add Sub Category
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
            Add Sub Category
          </Typography>
          <Stack spacing={5}>
            <Box sx={{ minWidth: 120 }}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Category</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={category}
                  label="Age"
                  onChange={handleChange}
                >
                  {data.length &&
                    data.map((category: { _id: string; title: string }) => (
                      <MenuItem value={category.title}>
                        {category.title}
                      </MenuItem>
                    ))}
                </Select>
              </FormControl>
            </Box>
            <Input
              placeholder="Add Sub Category"
              value={inputValue}
              onChange={inputHandler}
              name="inputValue"
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
            <Button variant="contained" onClick={addHandler}>
              Add
            </Button>
          </Stack>
        </Box>
      </Modal>
    </Box>
  );
}
