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

const AddAdminComponent = () => {
  const roles = [
    {
      value: "administrator",
      label: "administrator",
    },
    {
      value: "editor",
      label: "editor",
    },
    {
      value: "reviewer",
      label: "reviewer",
    },
  ];

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
      <Box  width="70%" margin="40px auto" >
        <Stack
          component="form"
          spacing={2}
          noValidate
          autoComplete="off"
          encType="multipart/form-data"
          onSubmit={handleSubmit}
        >
          <Typography variant="h3" gutterBottom component="h3">
            Add New Admin
          </Typography>

          <TextField
            label="First Name"
            variant="outlined"
            name="firstName"
            type="text"
            onChange={handleChange}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            type="text"
            onChange={handleChange}
          />

          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            onChange={handleChange}
          />

          <TextField
            label="password"
            variant="outlined"
            name="password"
            type="password"
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Categories"
              name="role"
              defaultValue=""
              onChange={handleChange}
            >
              {roles &&
                roles.map((role: any) => {
                  return (
                    <MenuItem value={role.value} key={role.value}>
                      {role.label}
                    </MenuItem>
                  );
                })}
            </Select>
          </FormControl>

          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddAdminComponent;
