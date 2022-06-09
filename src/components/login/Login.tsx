import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Joi from "joi";

import { loginAdmin } from "../../redux/actions/loginAdmin";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [login, setLogin] = useState({ email: "", password: "" });
  const [errorList, setErrorList] = useState([]);
  const dispatch: any = useDispatch();
  const navigate=useNavigate()

  function validateLoginForm(login: any) {
    const schema = Joi.object({
      password: Joi.string()
        .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net"] } })
        .required(),
    });

    return schema.validate(login, { abortEarly: false });
  }

  const { loading, hasError, errorStatus } = useSelector(
    (state: any) => state.status
  );

  const handleSubmit = useCallback(
    (event: React.FormEvent) => {
      event.preventDefault();
      let validationLoginFormResult: any = validateLoginForm(login);
      if (validationLoginFormResult.error) {
        setErrorList(validationLoginFormResult.error.details);
      } else {
        dispatch(loginAdmin(login));
     
      }
    },
    [dispatch, login]
    );
    useEffect(()=>{
      if(hasError){
        setLogin((old:any)=> ({email:old.email,password:old.passwoed=""}) )
      }
      
    },[setLogin,hasError])
    if(!hasError){
       navigate("");
      
  }
  

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
        {hasError ? (
          <Alert severity="error">{hasError ? errorStatus.message : ""}</Alert>
        
        ) : (
          ""
        ) }

        {errorList
          ? errorList.map((error: any, index: any) => {
              if (error.path[0] === "password") {
                return (
                  <Alert key={index} severity="error">
                    Password InValid
                  </Alert>
                );
              } else {
                return (
                  <Alert key={index} severity="error">
                    {error.message}
                  </Alert>
                );
              }
            })
          : ""}

        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
