import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import SideBar from "./components/sidebar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MotorComponent from "./components/pages/motor";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <SideBar />
      <Routes>
        <Route path="/motor" element={<MotorComponent />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
