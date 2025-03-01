import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Sidebar.css";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import {
	IconUser,
	IconLayoutDashboardFilled,
	IconUsers,
	IconTool,
	IconBuildingWarehouse,
	IconFileDollar,
	IconLogout,
} from "@tabler/icons-react";

function Sidebar() {
	const navigate = useNavigate();

	const handleLogout = async () => {
		await axios.post("/api/logout", {})
		navigate("/");
	}

	return (
		<div className='sidebar'>
			<div className='sidebar-content'>
				<div className='logo-container'>
					<div className='logo'>
						<IconUser stroke={2} />
					</div>
					<div className='name'>Administrator</div>
				</div>
				<nav className='nav-menu'>
					<NavLink
						to='/planowanie'
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<button className='nav-item'>
							<IconLayoutDashboardFilled />
							Planowanie
						</button>
					</NavLink>
					<NavLink
						to='/pracownicy'
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<button className='nav-item'>
							<IconUsers stroke={2.5} />
							Pracownicy
						</button>
					</NavLink>
					<NavLink
						to='/maszyny'
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<button className='nav-item'>
							<IconTool stroke={2} />
							Maszyny
						</button>
					</NavLink>
					<NavLink
						to='/magazyn'
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<button className='nav-item'>
							<IconBuildingWarehouse stroke={2} />
							Magazyn
						</button>
					</NavLink>
					<NavLink
						to='/finanse'
						className={({ isActive }) => (isActive ? "active" : "")}
					>
						<button className='nav-item'>
							<IconFileDollar stroke={2} />
							Finanse
						</button>
					</NavLink>
				</nav>
			</div>
			<div className='logout'>
				<button className='nav-item' onClick={() => {handleLogout()}}>
					<IconLogout stroke={2} />
					Wyloguj
				</button>
			</div>
		</div>
	);
}

export default Sidebar;
