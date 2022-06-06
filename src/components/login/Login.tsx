import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { loginAdmin } from "../../redux/actions/loginAdmin";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const dispatch: any = useDispatch();

  const { loading, hasError, errorStatus } = useSelector(
    (state: any) => state.status
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();

      dispatch(loginAdmin(login));
      // navigate("/users");
    },
    [dispatch, login]
  );

  const handleChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const { name, value } = event.target;

      setLogin((oldUser) => ({ ...oldUser, [name]: value }));
    },
    [setLogin]
  );
  return (
    <Box sx={{ height: "100vh" }}>
      <Stack
        component="form"
        spacing={2}
        onSubmit={handleSubmit}
        autoComplete="off"
        sx={{
          width: {
            xs: "30vh",
            md: "50vh",
          },
          margin: "auto",
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-50%)",
          textAlign: "center",
        }}
      >
        <Typography variant="h3" gutterBottom component="h3">
          Login
        </Typography>

        <TextField
          label="Email"
          variant="outlined"
          type="email"
          name="email"
          value={login?.email}
          onChange={handleChange}
        />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
          value={login?.password}
          onChange={handleChange}
        />
            {hasError?  <Alert severity="error">{hasError?errorStatus.message:''}</Alert>:''}
      
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
