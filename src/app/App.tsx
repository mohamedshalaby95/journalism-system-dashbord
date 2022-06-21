import { Provider, useSelector } from "react-redux";
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
import { ToastContainer } from "react-toastify";

import Home from "../pages/home/Home";
import SubCategory from "../pages/SubCategory";

import { MenuOpen } from "@mui/icons-material";
import PendingPost from "../components/posts/pending-post/PendingPost";
import PostDetails from "../components/posts/post details/PostDetails";

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
    else{
      setUserLogged(false);
    }
  });
  function UserIsLogin({ children }: any) {
    if (localStorage.getItem("userInf")) {
     
      // setUserLogged((old)=> true);
      console.log("here now")
    
      return children;
    } else {
      console.log("here now")
      return <Navigate to="/login" />;
    }
  }

  function ProtectedRoute({ children }: any) {
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
           {/* {userLogged ? ( */}
    
          <Box className={classes.default.routingComponent}>
            <BrowserRouter>
              {userLogged ? (
      
                <>
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
                  </Box>{" "}
                </>
               ):""} 

              <Box sx={{ position: "relative" }}>
                  {/* {userLogged && <Navbar />}*/}
                {userLogged ? <Navbar />:''} 
              
                <Routes>
           

             { UserIsLogin && (<><Route path="/home" element={<Home />} />
                  <Route path="" element={<Navigate to="/home" replace />} />
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
                    <Route path="edit/:id" element={<UserIsLogin><EditAdmin /></UserIsLogin>} />
                  </Route>
                  <Route path="users" element={<UserIsLogin><Users /></UserIsLogin>} />
                  <Route path="category">
                    <Route path="" element={<UserIsLogin><Category /></UserIsLogin>} />
                    
                  </Route>
                  <Route path="subcategory">
                    <Route path="" element={<UserIsLogin><SubCategory /></UserIsLogin>} />
                 
                  </Route>
                  <Route path="post">
                    <Route path="" element={<UserIsLogin><Posts /></UserIsLogin>} />
                    <Route path="pending" element={<UserIsLogin><PendingPost/></UserIsLogin>} />
                    <Route path="add" element={<UserIsLogin><AddPost /></UserIsLogin>} />
                    <Route path="edit/:id" element={<UserIsLogin><EditPost /></UserIsLogin>} />
                    <Route path=":id" element={<UserIsLogin><PostDetails /></UserIsLogin>} />
                  </Route>
                  <Route path="*" element={<Navigate to="/home" replace />} />
                  <Route path="/login" element={<Login />} />
                  </> 
                  )}  
                 
                {/* </Route> */}
                </Routes>
                 
              </Box>
            </BrowserRouter>
          </Box>
              {/* </UserIsLogin> */}
                   {/* </Route>  */}
             
          {/* // ):""} */}
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
