import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Input = styled("input")({
    display: "none",
  });

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      // dispatch();
      // navigate("/users");
    },
    [dispatch]
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | any) => {
      const { name, value } = event.target;
      // setNewUser((oldUser) => ({ ...oldUser, [name]: value }));
    },
    []
  );
  return (
    <>
      <Box width="70%" margin="40px auto">
        <Stack
          component="form"
          spacing={2}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Typography
            variant="h3"
            gutterBottom
            component="h3"
            textAlign="center"
          >
            Add New Post
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            name="title"
            type="text"
            onChange={handleChange}
          />

          <TextField
            id="outlined-textarea"
            label="Post Description"
            placeholder="Post Description"
            rows={6}
            multiline
            name="description"
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              name="category"
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value="Category1">Category1</MenuItem>
              <MenuItem value="Category2">Category2</MenuItem>
              <MenuItem value="Category3">Category3</MenuItem>
              <MenuItem value="Category4">Category4</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="subcategory"
              name="subcategory"
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value="subCategory1">subCategory1</MenuItem>
              <MenuItem value="subCategory2">subCategory2</MenuItem>
              <MenuItem value="subCategory3">subCategory3</MenuItem>
              <MenuItem value="subCategory4">subCategory4</MenuItem>
            </Select>
          </FormControl>

          <label htmlFor="contained-button-file">
          <Input
            accept="image/*"
            id="contained-button-file"
            multiple
            type="file"
            name="file"
            
          />
          <Button variant="contained" component="span" >
            Upload Image
          </Button>
        </label>

          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddPost;
