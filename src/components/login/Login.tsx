import { Box, Button, Stack, TextField, Typography } from "@mui/material";

const Login = () => {
  return (
    <Box sx={{height:"100vh"}}>
      <Stack
        component="form"
        spacing={2}
       
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

        <TextField label="Email" variant="outlined" type="email" name="email" />
        <TextField
          label="Password"
          variant="outlined"
          type="password"
          name="password"
        />
        <Button variant="contained" color="primary" type="submit">
          Login
        </Button>
      </Stack>
    </Box>
  );
};

export default Login;
