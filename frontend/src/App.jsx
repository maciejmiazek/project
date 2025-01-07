import React from "react";
import Sidebar from "./components/Sidebar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import Workers from "./components/Workers";
import NoPage from "./components/NoPage";

const Planowanie = () => <h2>Strona Planowanie</h2>;
const Maszyny = () => <h2>Strona Maszyny</h2>;
const Magazyn = () => <h2>Strona Magazyn</h2>;
const Finanse = () => <h2>Strona Finanse</h2>;

function App() {
	return (
		<BrowserRouter>
			<Sidebar />
			<main style={{ flex: 1}}>
				<Routes>
					<Route
						path='/'
						element={<Planowanie />}
					/>
					<Route
						path='/planowanie'
						element={<Planowanie />}
					/>
					<Route
						path='/pracownicy'
						element={<Workers />}
					/>
					<Route
						path='/maszyny'
						element={<Maszyny />}
					/>
					<Route
						path='/magazyn'
						element={<Magazyn />}
					/>
					<Route
						path='/finanse'
						element={<Finanse />}
					/>
					<Route
						path='/wyloguj'
						element={<NoPage />}
					/>
					<Route
						path='*'
						element={<NoPage />}
					/>
				</Routes>
			</main>
		</BrowserRouter>
	);
}

export default App;
