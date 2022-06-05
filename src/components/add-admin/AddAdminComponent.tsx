import { Box, MenuItem, TextField } from "@mui/material";
import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const AddAdminComponent = () => {
    const rules = [
        {
          value: 'administrator',
          label: 'administrator',
        },
        {
          value: 'editor',
          label: 'editor',
        },
        {
            value: 'reviewer',
            label: 'reviewer',
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
  const handleChange = useCallback((event:React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    // setNewUser((oldUser) => ({ ...oldUser, [name]: value }));
}, []);

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField  name="firstName"	onChange={handleChange} helperText="Please enter your name" fullWidth label="First Name" id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField name="lastName"	onChange={handleChange} fullWidth label="Last Name" id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField  name="email"	onChange={handleChange} fullWidth label="Email" id="fullWidth" />
        </Box>
        <Box
          sx={{
            width: 500,
            maxWidth: "100%",
          }}
        >
          <TextField name="password"	onChange={handleChange} fullWidth label="Password" type="password" id="fullWidth" />
        </Box>

        <TextField
        name="role"
          id="outlined-select-currency"
          select
          label="Select"
          value={rules}
          onChange={handleChange}
          helperText="Please select your currency"
          sx={{width:"40%"}}
        >
          {rules.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </form>
    </div>
  );
};

export default AddAdminComponent;
