import styled from "@emotion/styled";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import postsApi from "../../../api/postsApi";
import { FetchCategories } from "../../../redux/actions/CategoryActions";
import { fetchSubCategory } from "../../../redux/actions/subCategoryAction";

const Input = styled("input")({
  display: "none",
});

const EditPost = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch: any = useDispatch();
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [region, setRegion] = useState("");
  const [image, setImage] = useState("");

  const [file, setFile] = useState(null);

  const [categories, setCategories] = useState([]);
  const [subCategories, setSubCategories] = useState([]);
  console.log(category);
  const categoriesRedux = useSelector((state: any) => state.category.data);
  const subCategoriesRedux = useSelector(
    (state: any) => state.subCategory.data
  );
  useEffect(() => {
    dispatch(FetchCategories());
    dispatch(fetchSubCategory());

    postsApi
      .get(`/get_one/${id}`)
      .then((data) => {
        console.log("daaaataaaaaa", data.data);
        const { title, description, image, category, subCategory, region } =
          data.data;
        setImage(image);
        setRegion(region);
        setSubCategory(subCategory);
        setCategory(category);
        setDesc(description);
        setTitle(title);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setCategories(categoriesRedux);
    setSubCategories(subCategoriesRedux);
  }, [categoriesRedux, subCategoriesRedux]);

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
  console.log("region is", region);
  const titleChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setTitle(event.target.value);
  const descChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDesc(event.target.value);
  const categoryChangeHandler = (event: SelectChangeEvent) =>
    setCategory(event.target.value);
  const subCategoryChangeHandler = (event: SelectChangeEvent) =>
    setSubCategory(event.target.value);
  const regionChangeHandler = (event: SelectChangeEvent) =>
    setRegion(event.target.value);

  const imageChangeHandler = (event: any) => {
    setImage(event.target.value);
    setFile(event.target.files[0]);

    // const formData = new FormData();
    // formData.append("file", event.target.files[0]);
    // formData.append("upload_preset", "tl55trty");
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
            Edit Post
          </Typography>

          <TextField
            label="Title"
            variant="outlined"
            name="title"
            type="text"
            value={title}
            onChange={titleChangeHandler}
          />

          <TextField
            id="outlined-textarea"
            label="Post Description"
            placeholder="Post Description"
            value={desc}
            rows={6}
            multiline
            name="description"
            onChange={descChangeHandler}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="category"
              name="category"
              defaultValue=""
              onChange={categoryChangeHandler}
              value={category}
            >
              {/* <MenuItem value="Category1">Category1</MenuItem>
              <MenuItem value="Category2">Category2</MenuItem>
              <MenuItem value="Category3">Category3</MenuItem>
              <MenuItem value="Category4">Category4</MenuItem> */}
              {categories.map((category: { title: string; parent: string }) => (
                <MenuItem value={category.title}>{category.title}</MenuItem>
              ))}
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
              onChange={subCategoryChangeHandler}
              value={subCategory}
            >
              {/* <MenuItem value="subCategory1">subCategory1</MenuItem>
              <MenuItem value="subCategory2">subCategory2</MenuItem>
              <MenuItem value="subCategory3">subCategory3</MenuItem>
              <MenuItem value="subCategory4">subCategory4</MenuItem> */}
              {subCategories.map(
                (category: { title: string; parent: string }) => (
                  <MenuItem value={category.title}>{category.title}</MenuItem>
                )
              )}
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">region </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="region"
              name="region"
              defaultValue=""
              value={region}
              onChange={regionChangeHandler}
            >
              <MenuItem value="egypt">Egypt</MenuItem>
              <MenuItem value="america">America</MenuItem>
              <MenuItem value="england">England</MenuItem>
            </Select>
          </FormControl>

          <label htmlFor="mostafa">
            <input
              accept="image/*"
              id="mostafa"
              multiple
              type="file"
              name="mostafa"
              onChange={imageChangeHandler}
            />
            {/* <Button variant="contained" component="span">
              Upload Image
            </Button> */}
            <Box>upload</Box>
          </label>


          {image && (
          <img
            src={
              file
                ? URL.createObjectURL(file)
                : image
            }
            width="200px"
            height="200px"
            alt="post images"
          />
        )}

          {/* <img src={image} alt="" /> */}


          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default EditPost;
