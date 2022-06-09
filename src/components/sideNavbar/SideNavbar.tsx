import * as classes from "./SideNavbar.module.css";
import { ExpandMore } from "@mui/icons-material";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Avatar,
  Divider,
  Typography,
} from "@mui/material";
import Box from "@mui/material/Box";


import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const SideNavbar = () => {
  const location = useLocation();
  const [userInf,setUserInf]:any=useState()

  const getActiveClass = (path: string) => {
    return location.pathname.includes(path) ? "active" : "";
  };
  const getNavLinkClass = (path: string) => {

    return location.pathname === path ? "activeLink" : "";
  };
  useEffect(()=>{
    const data= JSON.parse(`${localStorage.getItem("userInf")}`)  

    
    setUserInf(()=> (data) )
     
      
  },[])

  
  return (
    <>
      <Box sx={{ backgroundColor: "#111827", height: "100vh" }}>
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
            <Avatar
              alt="User Name"
              src="https://mui.com/static/images/avatar/1.jpg"
              sx={{ width: "100px", height: "100px" }}
            />
            <Typography variant="h5" mt={2} component="h5" color="#fff">
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
              '&:hover': {
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
