import React from "react";
import { Outlet, Link } from "react-router-dom";
import "./Sidebar.css";
import "@fontsource/poppins";
import "@fontsource/poppins/600.css";
import { IconUser } from '@tabler/icons-react';

function Sidebar() {
	return (
		<div className='sidebar'>
			<div className='sidebar-content'>
				<div className='logo-container'>
					<div className='logo'>
						<IconUser stroke={2} />
					</div>
					<div className="name">Maciej</div>
				</div>
				<nav className='nav-menu'>
					<Link to='/planowanie'>
						<button className='nav-item'>
							
							Planowanie
						</button>
					</Link>
					<Link to='/pracownicy'>
						<button className='nav-item'>
							
							Pracownicy
						</button>
					</Link>
					<Link to='/maszyny'>
						<button className='nav-item'>
						
							Maszyny
						</button>
					</Link>
					<Link to='/magazyn'>
						<button className='nav-item'>
							
							Magazyn
						</button>
					</Link>
					<Link to='/finanse'>
						<button className='nav-item'>
							
							Finanse
						</button>
					</Link>
					<Link to='/wyloguj'>
						<button className='nav-item'>
							
							Wyloguj
						</button>
					</Link>
				</nav>
			</div>
		</div>
	);
}

export default Sidebar;
