import { React, useState, useEffect } from "react";
import "./Workers.css";
import axios from "axios";

function Workers() {
	const [users, setUsers] = useState([]);

	const fetchAPI = async () => {
		axios
			.get("http://127.0.0.1:3000/api")
			.then((users) => setUsers(users.data))
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	return (
		<div className='workers'>
			
			{users.map((item, i) => {
				return (
				<div key={i} className='card-board'>
					<p>{item.name}</p>
					<p>{item.email}</p>
					<p>{item.age}</p>
				</div>)
			})}
			
		</div>
	);
}

export default Workers;
