import styled from "@emotion/styled";
import {
  Alert,
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
import axios from "axios";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { categoryApi } from "../../../api/category";
import { addPost } from "../../../redux/actions/postAction";
import validatePostForm from "../../../validation/post/postValidation";

const Input = styled("input")({
  display: "none",
});
const instance = axios.create();

const AddPost = () => {
  const navigate = useNavigate();
  const dispatch: any = useDispatch();
  const [file, setFile] = React.useState<any>();
  const [errorList, setErrorList] = useState([]);
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    category: "",
    subCategory: "",
    regien: "",
    image: "",
    auther: "",
  });

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);

  const getAllCategories = async () => {
    const { data }: any = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/categories`
    );
    setCategories(data);
  };

  const getSubCategories = async (category: any) => {
    const { data }: any = await axios.get(
      `${process.env.REACT_APP_BACKEND}/api/subcategories/${category}`
    );
    setSubCategories(data);
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  const { hasError, errorStatus } = useSelector((state: any) => state?.status);

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
      
      setErrorList([])
      // dispatch(addPost(newPost));
      let validationPostFormResult: any = validatePostForm(newPost);
      console.log(validationPostFormResult.error);
      
      if (validationPostFormResult.error) {
        setErrorList(validationPostFormResult.error.details);
      } else {
        
        
        uploadImagePost(file);
      }

    },
    [file]
  );

  const addedPost = useSelector((state: any) => state?.post);

  useEffect(() => {
    
    if (addedPost?.length > 0) {
      setNewPost({
        title: "",
        description: "",
        category: "",
        subCategory: "",
        regien: "",
        image: "",
        auther: "",
      });
      setFile("");
    }
  }, [addedPost]);

  const uploadImagePost = async (files: any) => {
    const data = new FormData();

    data.append("file", files[0]);

    data.append("upload_preset", "tl55trty");

    await instance
      .post("https://api.cloudinary.com/v1_1/dsvj1cj17/image/upload", data)
      .then((res) => {
        dispatch(addPost({ ...newPost, image: res.data.secure_url }));
      })
      .catch((err) => {
        alert("some thing go wrong data base" + err);
      });
  };

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | any) => {
      const { name, value } = event.target;
      if (name === "category") {
        getSubCategories(value);
      }

      setNewPost((oldPost) => ({ ...oldPost, [name]: value }));
    },
    [setNewPost]
  );

  const imageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFile(event.target.files);
  };
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
            value={newPost.title}
            onChange={handleChange}
          />

{errorList
            ? errorList.map((error: any, index: any) => {
                if (error.path[0] === "title") {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                }
              })
            : ""}

          <TextField
            id="outlined-textarea"
            label="Post Description"
            placeholder="Post Description"
            value={newPost.description}
            rows={6}
            multiline
            name="description"
            onChange={handleChange}
          />

{errorList
            ? errorList.map((error: any, index: any) => {
                if (error.path[0] === "description") {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                }
              })
            : ""}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              name="category"
              value={newPost.category}
              defaultValue=""
              onChange={handleChange}
            >
              {categories &&
                categories.map((category: any) => {
                  return (
                    <MenuItem value={category.title} key={category._id}>
                      {category.title}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          {errorList
            ? errorList.map((error: any, index: any) => {
                if (error.path[0] === "category") {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                }
              })
            : ""}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Sub Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="subCategory"
              name="subCategory"
              defaultValue=""
              value={newPost.subCategory}
              onChange={handleChange}
            >
              {subCategories &&
                subCategories.map((subCategory: any) => {
                  return (
                    <MenuItem value={subCategory.title} key={subCategory._id}>
                      {subCategory.title}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          {errorList
            ? errorList.map((error: any, index: any) => {
                if (error.path[0] === "subCategory") {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                }
              })
            : ""}

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">region </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="regien"
              name="regien"
              value={newPost.regien}
              defaultValue=""
              onChange={handleChange}
            >
              <MenuItem value="egypt">Egypt</MenuItem>
              <MenuItem value="america">America</MenuItem>
              <MenuItem value="england">England</MenuItem>
            </Select>
          </FormControl>

          {errorList
            ? errorList.map((error: any, index: any) => {
                if (error.path[0] === "regien") {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                }
              })
            : ""}

          <input type="file" name="file" onChange={(e) => imageHandler(e)} />

          {errorList
            ? errorList.map((error: any, index: any) => {
                if (error.path[0] === "image") {
                  return (
                    <Alert key={index} severity="error">
                      {error.message}
                    </Alert>
                  );
                }
              })
            : ""}

          {/* <label htmlFor="contained-button-file">
            <Input
              accept="image/*"
              id="contained-button-file"
              multiple
              type="file"
              name="file"
            />
            <Button variant="contained" component="span">
              Upload Image
            </Button>
          </label> */}

          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddPost;
