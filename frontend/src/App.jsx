import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Planning from "./components/Planning";
import Workers from "./components/Workers";
import Machines from "./components/Machines";
import Warehouse from "./components/Warehouse";
import Finance from "./components/Finance";
import NoPage from "./components/NoPage";
import ProtectedRoutes from "./utils/protectedRoutes";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProtectedRoutes />}>
        <Route element={<Layout />}>
          <Route index element={<Planning />} />
          <Route path="planowanie" element={<Planning />} />
          <Route path="pracownicy" element={<Workers />} />
          <Route path="maszyny" element={<Machines />} />
          <Route path="magazyn" element={<Warehouse />} />
          <Route path="finanse" element={<Finance />} />
          <Route path="*" element={<NoPage />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;