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
// import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import Category from "../pages/Category";
import { ToastContainer } from "react-toastify";

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
        <ToastContainer />

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
                    // <MenuOpenIcon fontSize="large" sx={{ color: "white" }} />
                    <></>
                  )}
                </IconButton>
              </Box>
              <Box sx={{ position: "relative" }}>
                <Routes>
                  <Route path="/" element={ <Category />} />
                </Routes>
              </Box>
            </BrowserRouter>
          </Box>



         
        </Box>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
