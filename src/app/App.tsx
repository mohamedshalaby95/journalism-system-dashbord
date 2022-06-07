import { Provider } from "react-redux";
import store from "../redux/store";
import * as classes from "./App.module.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../theme/palette";
import { Box } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import SideNavbar from "../components/sideNavbar/SideNavbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Category from "../pages/Category";
import { ToastContainer } from "react-toastify";
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Navbar from "../components/Navbar/Navbar";

import AddAdmin from "../pages/admins/AddAdmin";
import Login from "../components/login/Login";
import EditAdmin from "../pages/admins/EditAdmin";
import Admins from "../pages/admins/Admins";
import Users from "../pages/users/Users";
import AddPost from "../pages/posts/AddPost";
import EditPost from "../pages/posts/EditPost";
import Posts from "../pages/posts/Posts";

import Home from "../pages/home/Home";

import CategotyTable from "../components/category-table/CategoryTable";
import { MenuOpen } from "@mui/icons-material";

import CategotyTable from "../components/category-table/CategoryTable";

function App() {
  const [statusButton, setStatusButton] = useState<boolean>(false);
  const [toggleNavbar, setToggleNavbar] = useState<number>(-260);
  const [toggleButton, setToggleButton] = useState<number>(0);
  const handelStatusButton = useCallback(() => {
    setStatusButton((oldStatus) => !oldStatus);
    setToggleNavbar((oldState) => (oldState < 0 ? 0 : -260));
    setToggleButton((oldState) => (oldState === 0 ? 260 : 0));
  }, [setStatusButton]);

  const [userLogged, setUserLogged] = useState<boolean>(false);
  useEffect(() => {
    const loggedInUser = localStorage.getItem("userInf");
    if (loggedInUser) {
      setUserLogged(true);
    }
  }, []);

  function UserIsLogin({ children }: any) {
    if (localStorage.getItem("userInf")) {
      return children;
    } else {
      return <Navigate to="/login" />;
    }
  }

  function ProtectedRoute({ children }:any) {
    if (!localStorage.getItem("userInf")) {
      return <Navigate to="/login" />;
    } else {
      return children;
    }
  }

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Box className="App">

        <ToastContainer />
          {userLogged ? (
            
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
                      <MenuOpen fontSize="large" sx={{ color: "white" }} />
                    )}
                  </IconButton>
                </Box>
                <Box sx={{ position: "relative" }}>
                  <Navbar />
                  <Routes>
                    <Route path="/home" element={<Home /> } />
                    <Route path="" element={<Navigate to="/home" replace /> } />
                    <Route path="admins">
                      <Route
                        path=""
                        element={
                          <UserIsLogin>
                            <Admins />
                          </UserIsLogin>
                        }
                      />
                      <Route
                        path="add"
                        element={
                          <UserIsLogin>
                            <AddAdmin />
                          </UserIsLogin>
                        }
                      />
                      <Route path=":id" element={<>Show Admin</>} />
                      <Route path="edit/:id" element={<EditAdmin />} />
                    </Route>
                    <Route path="users" element={<Users />} />
                    <Route path="category">
                      <Route path="" element={<Category />} />
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
                    <Route path="*" element={<Navigate to="/home" replace />} />
                  </Routes>
                </Box>
              </BrowserRouter>
            </Box>
          ) : (
            <BrowserRouter>
              <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Navigate to="/login" replace />} />
              </Routes>
            </BrowserRouter>
          )}

        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
