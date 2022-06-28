import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import {
  Input,
  Stack,
  Typography,
  InputLabel,
  MenuItem,
  Select,
  FormControl,
  TextField,
  SelectChangeEvent,
  Alert,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Icategory } from "../../types/category";
import { UpdateCategory } from "../../redux/actions/CategoryActions";
import { FetchCategories } from "../../redux/actions/CategoryActions";
import { updateSubCategory } from "../../redux/actions/subCategoryAction";
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

export default function UpdateSubCategoryPopus({ subCategory }: any) {
  const [errorList, setErrorList] = React.useState([]);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [categorySubTitle, setSubCategoryTitle] = React.useState(
    subCategory.title
  );
  const [categorySubParent, setSubCategoryParent] = React.useState(
    // subCategory.parent
    "ahmed12"
  );
  const dispatch: any = useDispatch();
  const categories = useSelector((state: any) => state.category.data);
  React.useEffect(() => {
    dispatch(FetchCategories());

    //   console.log("category parent",categories.find((element: any) => element._id !== subCategory._id))
  }, []);
  React.useEffect(() => {
    if (categories.length) {
      setSubCategoryParent(
        categories?.find((element: any) => element._id === subCategory.parent)
          ?.title
      );
      //   console.log("test",categories.find((element: any) =>{
      //     console.log(element._id)
      //     console.log(subCategory._id)
      // })
      // console.log("cate",categories)

      //   )
    }
  }, [categories]);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSubCategoryTitle(event.target.value);
  };
  const handleSelectChange = (event: SelectChangeEvent) => {
    setSubCategoryParent(event.target.value);
  };
  const updateHandler = () => {
    let validateSubCategoryFormResult: any = validateSubCategoryForm({
      category: categorySubParent,
      subcategory: categorySubTitle,
    });
    if (validateSubCategoryFormResult.error) {
      setErrorList(validateSubCategoryFormResult.error.details);
    } else {
      dispatch(
        updateSubCategory(subCategory._id, {
          title: categorySubTitle,
          parent: categorySubParent,
        })
      );

      handleClose();
      setErrorList([]);
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
            align={"center"}
          >
            Update Sub-Category
          </Typography>

          <Stack spacing={5}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Category</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={categorySubParent}
                label="Category"
                onChange={handleSelectChange}
              >
                {/* <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem> */}
                {categories.map(
                  (category: { title: string; parent: string }) => (
                    <MenuItem value={category.title}>{category.title}</MenuItem>
                  )
                )}
              </Select>
            </FormControl>

            {/* <Input
              placeholder="Update Sub-Category"
              value={categorySubTitle}
              onChange={handleInputChange}
            /> */}
            <TextField
              id="outlined-basic"
              label="Sub Category"
              variant="outlined"
              onChange={handleInputChange}
              value={categorySubTitle}
              name={subCategory}
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
