import Box from "@mui/material/Box";



import { Link, useLocation } from "react-router-dom";

const SideNavbar = () => {
  const location = useLocation();

  const getNavLinkClass = (path: string) => {
    return location.pathname === path ? "active" : "";
  };
  return (
    <>
      <Box sx={{  backgroundColor:"#111827", height: "100vh" }}>
      
      </Box>
    </>
  );
};

export default SideNavbar;
