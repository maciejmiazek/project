import { React, useState, useEffect } from "react";
import "./Workers.css";
import axios from "axios";
import {
	IconUser,
} from "@tabler/icons-react";

function Workers() {
	const [users, setUsers] = useState([]);

	const fetchAPI = async () => {
		axios
			.get("/api")
			.then((users) => setUsers(users.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	function minutesToTime(minutes) {
		const hours = Math.floor(minutes / 60);
		const mins = minutes % 60;
		return `${String(hours).padStart(2, '0')}:${String(mins).padStart(2, '0')}`;
	}

	return (
		<div className='workers'>

			{users.map((item, i) => {
				return (
				<div key={i} className='card-board'>
					<div className="worker-avatar">
						<div className="status-box">Aktywny</div>
						<div className="circle">
							<IconUser stroke={2} />
						</div>
						<p>{item.name}</p>
					</div>
					<div className="worker-items">
						<div className="item-option"><p>Czas Pracy</p><p>{`${minutesToTime(item.startWorkTime)} - ${minutesToTime(item.endWorkTime)}`}</p></div>
						<div className="item-option"><p>Pensja</p><p>{`${item.salary} PLN`}</p></div>
						<div className="item-option"><p>Telefon</p><p>{item.phone}</p></div>
						<div className="item-option"><p>Przydzielona Maszyna</p><p>{item.machine}</p></div>
					</div>
				</div>)
			})}
			
		</div>
	);
}

export default Workers;
