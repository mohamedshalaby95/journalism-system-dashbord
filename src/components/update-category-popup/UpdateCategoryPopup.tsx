import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Alert, CardMedia, Stack, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Icategory } from "../../types/category";
import { UpdateCategory } from "../../redux/actions/CategoryActions";
import validateCategoryForm from "../../validation/category/categoryValidation";
import axios from "axios";
import styled from "@emotion/styled";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  p: 4,
};

const instance = axios.create();

const Input = styled("input")({
  display: "none",
});

export default function UpdateCategoryPopus({ category }: any) {
  const [open, setOpen] = React.useState(false);
  const [errorList, setErrorList] = React.useState([]);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [value, setValue] = React.useState(category.title);
  const [description, setDescription] = React.useState(category.description);
  const [image, setImage] = React.useState(category.image);
  const [file, setFile] = React.useState<any>();

  const dispatch: any = useDispatch();
  const data = useSelector((state: any) => state.status.hasError);
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const handleDescriptionChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setDescription(event.target.value);
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files);
  };

  const uploadImageCategory = async (files: any) => {
    const data = new FormData();

    data.append("file", files[0]);

    data.append("upload_preset", "tl55trty");

    await instance
      .post("https://api.cloudinary.com/v1_1/dsvj1cj17/image/upload", data)
      .then((res: any) => {
        dispatch(
          UpdateCategory(category, value, description, res.data.secure_url)
        );
        handleClose();
        setValue("");
        setDescription("");
        setImage("");
        setErrorList([]);
      })
      .catch((err: any) => {
        alert("some thing go wrong data base" + err);
      });
  };

  const updateHandler = () => {
    let validateCategoryFormResult: any = validateCategoryForm({
      category: value,
      description: description,
      image: image,
    });
    if (validateCategoryFormResult.error) {
      setErrorList(validateCategoryFormResult.error.details);
    } else {
      if (file) {
        uploadImageCategory(file);
      } else {
        dispatch(UpdateCategory(category, value, description, image));
        handleClose();
      }
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
            {/* <Input
              placeholder="Update Category"
              value={value}
              onChange={handleInputChange}
            /> */}

            <TextField
              id="outlined-basic"
              label="Category Name"
              variant="outlined"
              value={value}
              onChange={handleInputChange}
            />

            <TextField
              id="filled-multiline-static"
              label="Category Description"
              multiline
              rows={4}
              variant="outlined"
              value={description}
              onChange={handleDescriptionChange}
            />

<label htmlFor="update-image-category">
        <Input accept="image/*" id="update-image-category" multiple type="file" name="file" onChange={(e) => handleImageChange(e)} />
        <Button variant="contained" component="span">
          Upload
        </Button>
      </label>

            
            <CardMedia
        component="img"
        height="194"
        image={image}
        alt={value}
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
