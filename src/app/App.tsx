import { Provider } from "react-redux";
import store from "../redux/store";
import * as classes from "./App.module.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/palette";
import { Box } from "@mui/material";
import { useCallback, useState } from "react";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Navbar from "../components/Navbar/Navbar";

import AddAdmin from "../pages/admins/AddAdmin";
import Login from "../components/login/Login";
import EditAdmin from "../pages/admins/EditAdmin";
import Admins from "../pages/admins/Admins";
import Users from "../pages/users/Users";
import AddPost from "../pages/posts/AddPost";
import EditPost from "../pages/posts/EditPost";
import Posts from "../pages/posts/Posts";

function App() {
  const [statusButton, setStatusButton] = useState<boolean>(false);
  const [toggleNavbar, setToggleNavbar] = useState<number>(-260);
  const [toggleButton, setToggleButton] = useState<number>(0);
  const handelStatusButton = useCallback(() => {
    setStatusButton((oldStatus) => !oldStatus);
    setToggleNavbar((oldState) => (oldState < 0 ? 0 : -260));
    setToggleButton((oldState) => (oldState === 0 ? 260 : 0));
  }, [setStatusButton]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box className="App">
           <Box className={classes.default.routingComponent}>
           <BrowserRouter>
              <Box
                sx={{ left: `${toggleNavbar}px ` }}
                className={classes.default.sideNavbar}
              >
                <SideNavbar />
              </Box>

              <Box
                sx={{ left: `${toggleButton}px ` }}
                className={classes.default.toggleButton}
              >
                <IconButton aria-label="close" onClick={handelStatusButton}>
                  {statusButton ? (
                    <CloseIcon fontSize="large" sx={{ color: "white" }} />
                  ) : (
                    <MenuOpenIcon fontSize="large" sx={{ color: "white" }} />
                  )}
                </IconButton>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Navbar />
                <Routes>
                  <Route path="" element={<>Home</>} />
                  <Route path="admins">
                    <Route
                      path=""
                      element={
                        <Admins />
                      }
                    />
                    <Route path="add" element={<AddAdmin />} />
                    <Route path=":id" element={<>Show Admin</>} />
                    <Route path="edit/:id" element={<EditAdmin />} />
                  </Route>
                  <Route path="users" element={<Users />} />
                  <Route path="category">
                    <Route path="" element={<>Categories</>} />
                    <Route path="add" element={<>Add Category</>} />
                    <Route path="edit/:id" element={<>Edit Category</>} />
                  </Route>
                  <Route path="subcategory">
                    <Route path="" element={<>Sub Categories</>} />
                    <Route path="add" element={<>Add Sub Category</>} />
                    <Route path="edit/:id" element={<>Edit Sub Category</>} />
                  </Route>
                  <Route path="post">
                    <Route path="" element={<Posts />} />
                    <Route path="pending" element={<>Pending Posts</>} />
                    <Route path="add" element={<AddPost />} />
                    <Route path="edit/:id" element={<EditPost />} />
                    <Route path=":id" element={<>Post</>} />
                  </Route>
                  <Route path="*" element={<>Home</>} />
                </Routes>
              </Box>
            </BrowserRouter> 
          </Box>
        {/* <BrowserRouter>
          <Routes>
            {/* <Route path="/login" element={<Login />} /> */}
          {/* </Routes>
        </BrowserRouter> */}
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
