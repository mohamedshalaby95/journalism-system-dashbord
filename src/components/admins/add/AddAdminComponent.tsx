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
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addAdmin } from "../../../redux/actions/adminAction";

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
  const dispatch:any = useDispatch();
  const [newAdmin,setNewAdmin]=useState({firstName:"",lastName:"",email:"",password:"",role:""})
  const{hasError,errorStatus}=useSelector((state:any)=> state?.status)

  const handleSubmit = useCallback(
    (event: React.SyntheticEvent<EventTarget>) => {
      event.preventDefault();
     console.log(newAdmin);
     
       dispatch(addAdmin(newAdmin));
      // navigate("/users");
    },
    [dispatch,newAdmin]
  );
  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement> | any) => {
      const { name, value } = event.target;
      setNewAdmin((oldUser) => ({ ...oldUser, [name]: value }));
    },
    [setNewAdmin]
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
            value={newAdmin.firstName}
            type="text"
            onChange={handleChange}
          />

          <TextField
            label="Last Name"
            variant="outlined"
            name="lastName"
            type="text"
            value={newAdmin.lastName}
            onChange={handleChange}
          />

          <TextField
            label="Email"
            variant="outlined"
            name="email"
            type="email"
            value={newAdmin.email}
            onChange={handleChange}
          />

          <TextField
            label="password"
            variant="outlined"
            name="password"
            type="password"
            value={newAdmin.password}
            onChange={handleChange}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Role</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Categories"
              name="role"
              value={newAdmin.role}
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
          {hasError?  <Alert severity="error">{hasError?errorStatus.message:''}</Alert>:''}

          <Button variant="contained" color="success" type="submit">
            Add
          </Button>
        </Stack>
      </Box>
    </>
  );
};

export default AddAdminComponent;
