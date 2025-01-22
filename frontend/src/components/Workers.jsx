import { React, useState, useEffect } from "react";
import WorkersPanel from "./WorkersPanel";
import "./Workers.css";
import axios from "axios";
import {
	IconUser,
	IconClockHour4
} from "@tabler/icons-react";

function Workers() {
	const [users, setUsers] = useState([]);
	const [cardId, setCardId] = useState(null);
	const [activeButton, setActiveButton] = useState(0);
	const [buttonText, setButtonText] = useState('Dodaj');
	const [message, setMessage] = useState('');
	const [alertText, setAlertText] = useState('');
	const [alertIsVisible, setAlertIsVisible] = useState(false);
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		machine: [],
		salary: 0,
		startWorkTime: '6:00',
		endWorkTime: '16:00',
	});

	const buttonChangeClick = (index) => {
		setButtonText(index === 0 ? 'Dodaj' : 'Edytuj');
		if (activeButton === null || activeButton !== index) {
			setActiveButton(index);
			
			setFormData({
				name: '',
				phone: '',
				machine: [],
				salary: 0,
				startWorkTime: '6:00',
				endWorkTime: '16:00',
			});
			setCardId(null)
		}
	};

	const fetchAPI = async () => {
		axios
		.get("/api/pracownicy")
		.then((users) => {
			setUsers(users.data)
		})
		.catch((err) => console.log(err));
	};

	const deleteWorker = async (i) => {
		if (activeButton !== 1) {
			return
		}

		const objectId = users[i]._id

		try {
			const response = await axios.delete(`/api/pracownicy/${objectId}`);
	  
			if (response.status === 200) {
			  console.log(response.data);
			  setMessage(response.data.message);
			  setAlertIsVisible(true);
			  fetchAPI();
			  setTimeout(() => {
				setAlertIsVisible(false);
			  }, 3000);
			}

		  } catch (error) {
			console.log(error);
		}
	};

	const updateWorker = async () => {
		try {
			const objectId = users[cardId]._id;
			const response = await axios.put(`/api/pracownicy/${objectId}`, formData);
			setMessage(response.data.message);

			if (response.status === 200) {
			  console.log(response.data.message);
			  setAlertText(response.data.message);
			  setAlertIsVisible(true);
			  fetchAPI();
			  setTimeout(() => {
				setAlertIsVisible(false);
				}, 3000);
			}

		  } catch (error) {
			setAlertText(message);
			setAlertIsVisible(true);
			setTimeout(() => {
				setAlertIsVisible(false);
			}, 3000);
		}
	}

	const editInsert = (i) => {
		if (activeButton !== 1) {
			return
		}

		setFormData({
			name: users[i].name,
			phone: users[i].phone,
			machine: users[i].machine,
			salary: users[i].salary,
			startWorkTime: users[i].startWorkTime,
			endWorkTime: users[i].endWorkTime,
		});
		setCardId(i)
	};

	useEffect(() => {
		fetchAPI();
	}, []);

	const buttonStyle = {
		display: activeButton === 1 ? 'block' : 'none'
	};

	return (
		<div className='workers'>
			<div className='workers-main'>
				{users.map((item, i) => {
					return (
					<div key={i} className={`card-board ${activeButton === 1 ? 'edit' : ''}`} style={{border: cardId === i && activeButton === 1 ? '3px solid whitesmoke' : ''}} onClick={() => {editInsert(i)}}>
						<div className="worker-avatar">
							<div className="status-box">Aktywny</div>
							<div className="circle">
								<IconUser stroke={2} />
							</div>
							<p>{item.name}</p>
						</div>
						<div className="worker-items">
							<div className="item-option">
								<div className="item-option-name">
									<p>Czas Pracy</p>
								</div>
								<div className="item-option-value">
									<p>{`${item.startWorkTime} - ${item.endWorkTime}`}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Pensja</p>
								</div>
								<div className="item-option-value">
									<p>{`${item.salary} PLN`}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Telefon</p>
								</div>
								<div className="item-option-value">
									<p>{item.phone != '' ? item.phone : '-'}</p>
								</div>
							</div>
							<div className="item-option">
								<div className="item-option-name">
									<p>Maszyna</p>
								</div>
								<div className="item-option-value">
									<p>{item.machine != '' ? item.machine : 'brak'}</p>
								</div>
							</div>
							<button className="delete-option" onClick={() => {deleteWorker(i)} } style={buttonStyle}>Delete</button>
						</div>
					</div>)
				})}
			</div>
			<WorkersPanel activeButton={activeButton} buttonChangeClick={buttonChangeClick} buttonText={buttonText} fetchAPI={fetchAPI} setAlertText={setAlertText} setAlertIsVisible={setAlertIsVisible} formData={formData} setFormData={setFormData} updateWorker={updateWorker}/>
			<div className={`workers-alert ${alertIsVisible ? 'show' : ''}`}><p>{alertText}</p></div>
		</div>
	);
}

export default Workers;
