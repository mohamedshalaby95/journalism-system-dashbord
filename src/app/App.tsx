import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { Provider } from "react-redux";
import store from "../redux/store";
import { lazy, Suspense } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <Suspense fallback={<div>Loaaaaaading.....</div>}>
          <BrowserRouter>sjfjbcdejbv</BrowserRouter>
        </Suspense>
      </div>
    </Provider>
  );
}

export default App;
