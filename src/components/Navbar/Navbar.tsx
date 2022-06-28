import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useDispatch } from "react-redux";
import { userLogout } from "../../redux/actions/loginAdmin";
import { useNavigate } from "react-router-dom";
import useLoged from "../../hooks/IsLoginHooks";
import adminApi from "../../api/adminApi";
import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { Badge } from "@mui/material";
// import NotificationsIcon from "@mui/icons-material/Notifications";
// import {userLogout} from ""

const Navbar = () => {
  const [userLogged, changeState, changeStateTo] = useLoged(false);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );
  const [socket, setSocket] = useState(() =>
    io(`${process.env.REACT_APP_BACKEND}`)
  );
  const [notify, setNotify] = useState<any>([]);
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const navigate = useNavigate();

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  useEffect(() => {
    const { email } = JSON.parse(`${localStorage.getItem("userInf")}`);
    console.log(email);
    socket.on("connect", () => {
      console.log("here nav");

      socket.emit("addUser", email);
    });
  }, []);
  useEffect(() => {
    socket.on("hamada", (data: any) => {
      console.log(data);
      setNotify((old: any) => [...old, data]);
    });
    console.log(notify);
  }, []);
  useEffect(() => {
    const { token } = JSON.parse(`${localStorage.getItem("userInf")}`);

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: ` Bearer ${token}`,
      },
    };
    adminApi
      .get(`/notify`, config)
      .then((res) => {
        setNotify(res.data);
      })
      .catch((err) => {
        // alert(err)
      });
  }, []);
  const dispatch: any = useDispatch();
  const handelClickLogOut = React.useCallback(() => {
    dispatch(userLogout());
    changeStateTo();
    navigate("/");
  }, [dispatch]);
  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#fff", color: "#000" }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Typography>

            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: "flex", md: "none" },
                flexGrow: 1,
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".3rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Dashboard
            </Typography>

            <Box
              sx={{ flexGrow: 1, display: "flex", justifyContent: "flex-end" }}
            >
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt="user name"
                    src="https://mui.com/static/images/avatar/1.jpg"
                  />
                </IconButton>
              </Tooltip>

              <MenuItem>
                <IconButton
                  size="large"
                  aria-label="show 17 new notifications"
                  color="error"
                >
                  <Badge badgeContent={notify?.length} color="error">
                    {/* <NotificationsIcon /> */}
                  </Badge>
                </IconButton>
                <p>Notifications</p>
              </MenuItem>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>

                <MenuItem onClick={handleCloseUserMenu}>
                  <Typography textAlign="center" onClick={handelClickLogOut}>
                    Logout
                  </Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </>
  );
};

export default Navbar;
