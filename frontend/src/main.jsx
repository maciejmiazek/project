import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App.jsx";

const Finanse = () => <h2>Finanse</h2>;

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Finanse />} />
				<Route path="*" element={<App />} />
			</Routes>
		</BrowserRouter>
	</StrictMode>
);
