import * as classes from "./SideNavbar.module.css";
import { ExpandMore } from "@mui/icons-material";
import styled from "@emotion/styled";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Button,
  Divider,
  Fab,
  InputLabel,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import { Link, useLocation } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";

const Input = styled("input")({
  display: "none",
});
const SideNavbar = () => {
  const location = useLocation();
  const [userInf, setUserInf]: any = useState();

  const getActiveClass = (path: string) => {
    return location.pathname.includes(path) ? "active" : "";
  };
  const getNavLinkClass = (path: string) => {
    return location.pathname === path ? "activeLink" : "";
  };
  useEffect(() => {
    const data = JSON.parse(`${localStorage.getItem("userInf")}`);

    setUserInf(() => data);
  }, []);

  const uploadImage = (files: any) => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", "tl55trty");

    axios
      .post("https://api.cloudinary.com/v1_1/dsvj1cj17/image/upload", formData)
      .then((res) => {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInf.token}`,
          },
        };

        console.log(res.data.secure_url);
        axios
          .patch(
            `${process.env.REACT_APP_BACKEND}/admin`,
            { image: res.data.secure_url },
            config
          )
          .then((res) => {
            console.log(res.data);

            localStorage.setItem("userInf", JSON.stringify(res.data));
            setUserInf(() => res.data);
          })
          .catch((err) => {
            alert("some thing go wrong  " + err);
          });
      })
      .catch((err) => {
        alert("some thing go wrong data base" + err);
      });
  };

  return (
    <>
      <Box sx={{ backgroundColor: "#111827", minHeight: "100vh" }}>
        {/* Start Section User Image */}
        <Box
          pt={5}
          pb={5}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box>
            <Box sx={{}}>
              <Avatar
                alt="User Name"
                src={
                  userInf
                    ? userInf?.image
                    : "https://mui.com/static/images/avatar/1.jpg"
                }
                sx={{ width: "100px", height: "100px" }}
              />
              <label htmlFor="contained-button-file">
                <Input
                  accept="image/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  name="file"
                  onChange={(event) => uploadImage(event.target.files)}
                />
                <CameraAltIcon
                  sx={{
                    position: "absolute",
                    left: "45%",
                    color: "white",
                    marginTop: "5px",
                    cursor: "pointer",
                  }}
                />
              </label>
            </Box>
            <Typography
              sx={{ paddingTop: "8px" }}
              variant="h5"
              mt={2}
              component="h5"
              color="#fff"
            >
              {userInf?.firstName}
            </Typography>
          </Box>
        </Box>
        {/* End Section User Image */}
        <Divider />
        {/* Start Section Navbar */}

        <Box pt={4} sx={{ width: "80%", margin: "auto" }}>
          <Accordion
            sx={{ marginBottom: "20px" }}
            className={
              getActiveClass("/admins")
                ? classes.default.active
                : classes.default.notActive
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Admins</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link
                to="/admins"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/admins")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Show All Admins</Typography>
              </Link>

              <Link
                to="/admins/add"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/admins/add")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography>Add Admin</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              marginBottom: "20px",
              "&:before": {
                display: "none",
              },
            }}
            className={
              getActiveClass("/users")
                ? classes.default.active
                : classes.default.notActive
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Users</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link
                to="/users"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/users")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Show All Users</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              marginBottom: "20px",
              "&:hover": {
                background: "#ffffff14",
              },
              "&:before": {
                display: "none",
              },
            }}
            className={
              getActiveClass("/category")
                ? classes.default.active
                : classes.default.notActive
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link
                to="/category"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/category")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Show All Category</Typography>
              </Link>
              <Link
                to="/category/add"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/category/add")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Add Category</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              marginBottom: "20px",
              "&:before": {
                display: "none",
              },
            }}
            className={
              getActiveClass("/subcategory")
                ? classes.default.active
                : classes.default.notActive
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Sub Category</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link
                to="/subcategory"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/subcategory")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Show All Sub Category</Typography>
              </Link>
              <Link
                to="/subcategory/add"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/subcategory/add")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Add Sub Category</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>

          <Accordion
            sx={{
              marginBottom: "20px",
              "&:before": {
                display: "none",
              },
            }}
            className={
              getActiveClass("/post")
                ? classes.default.active
                : classes.default.notActive
            }
          >
            <AccordionSummary
              expandIcon={<ExpandMore />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <Typography>Post</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Link
                to="/post"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/post")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Show All Posts</Typography>
              </Link>
              <Link
                to="/post/pending"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/post/pending")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Show All Pending Posts</Typography>
              </Link>
              <Link
                to="/post/add"
                style={{ textDecoration: "none" }}
                className={
                  getNavLinkClass("/post/add")
                    ? classes.default.activeLink
                    : classes.default.notActiveLink
                }
              >
                <Typography mb={2}>Add Post</Typography>
              </Link>
            </AccordionDetails>
          </Accordion>
        </Box>

        {/* End Section Navbar */}
      </Box>
    </>
  );
};

export default SideNavbar;
