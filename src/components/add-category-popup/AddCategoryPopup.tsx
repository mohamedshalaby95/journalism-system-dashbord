import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Alert, Stack, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { addCategory } from "../../redux/actions/CategoryActions";
import Joi from "joi";
import validateCategoryForm from "../../validation/category/categoryValidation";
import styled from "@emotion/styled";
import axios from "axios";

const instance = axios.create();

const Input = styled("input")({
  display: "none",
});

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
  const [descriptionValue, seDescriptionValue] = React.useState("");
  const [imageValue, setImageValue] = React.useState("");
  const [file, setFile] = React.useState<any>();
  const [errorList, setErrorList] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const dispatch: any = useDispatch();
  const { success } = useSelector((state: any) => state.status);

  const uploadImageCategory = async (files: any) => {
    const data = new FormData();

    data.append("file", files[0]);

    data.append("upload_preset", "tl55trty");

    await instance
      .post("https://api.cloudinary.com/v1_1/dsvj1cj17/image/upload", data)
      .then((res) => {
        dispatch(
          addCategory(inputValue, descriptionValue, res.data.secure_url)
        );
        handleClose();
        setInputValue("");
        seDescriptionValue("");
        setImageValue("");
        setErrorList([]);
      })
      .catch((err) => {
        alert("some thing go wrong data base" + err);
      });
  };

  const addHandler = async () => {
    let validateCategoryFormResult: any = validateCategoryForm({
      category: inputValue,
      description: descriptionValue,
      image: imageValue,
    });
    if (validateCategoryFormResult.error) {
      setErrorList(validateCategoryFormResult.error.details);
    } else {
      uploadImageCategory(file);
    }
  };
  const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };
  const descriptionHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    seDescriptionValue(event.target.value);
  };

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files);
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
            {/* <Input
              placeholder="Add Category"
              value={inputValue}
              onChange={inputHandler}
            /> */}
            <TextField
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={inputValue}
              onChange={inputHandler}
            />

            <TextField
              id="filled-multiline-static"
              label="Category Description"
              multiline
              rows={4}
              variant="outlined"
              value={descriptionValue}
              onChange={descriptionHandler}
            />

            <input type="file" name="file" onChange={(e) => imageHandler(e)} />

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

          {/* <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography> */}
        </Box>
      </Modal>
    </Box>
  );
}
