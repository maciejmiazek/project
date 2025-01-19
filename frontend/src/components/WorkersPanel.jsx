import { React, useState, useEffect } from "react";
import "./WorkersPanel.css";
import axios from "axios";

function WorkersPanel() {
	const [formData, setFormData] = useState({
		name: '',
		phone: '',
		machine: [],
		salary: 0,
		startWorkTime: 0,
		endWorkTime: 0,
	});
	const [message, setMessage] = useState('');
	const [buttonText, setButtonText] = useState('Dodaj');
	const [activeButton, setActiveButton] = useState(0);
	
	const handleChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const buttonChangeClick = (index) => {
		setButtonText(index === 0 ? 'Dodaj' : 'Edytuj');
		if (activeButton === null || activeButton !== index) {
			setActiveButton(index); // Ustaw aktywny przycisk
		}
	};

	const handleSubmit = async (e) => {
		e.preventDefault()
	
		try {
		  // Wysyłanie danych do serwera za pomocą axios
		  const response = await axios.post('http://localhost:3000/api/pracownicy', formData);
	
		  // Obsługa odpowiedzi z serwera
		  if (response.status === 200) {
			setMessage(`Sukces: ${response.data.message}`);
		  }
		} catch (error) {
		  // Obsługa błędów
		  if (error.response) {
			setMessage(`Błąd: ${error.response.data.message}`);
		  } else {
			setMessage('Błąd podczas łączenia z serwerem.');
		  }
		}
	};

	return (
		<div className="workers-panel-box">
			<div className="workers-panel-action-buttons">
				<button onClick={() => {buttonChangeClick(0)}} className={activeButton === 0 ? 'active' : ''}>Dodaj</button>
				<button onClick={() => {buttonChangeClick(1)}} className={activeButton === 1 ? 'active' : ''}>Edytuj</button>
			</div>
			<form onSubmit={handleSubmit}>
				<div className="form-bulk">
					<div className="input-name"><p>Imie i Nazwisko</p></div>
					<input type="text" name="name" value={formData.name} onChange={handleChange} required/>
				</div>
				<div className="form-bulk">
					<div className="input-name"><p>Telefon</p></div>
					<input type="text" name="phone" value={formData.phone} onChange={handleChange}/>
				</div>
						
				<div className="form-bulk">
					<div className="input-name"><p>Czas Pracy</p></div>
					<input type="time" name="startWorkTime" value={formData.startWorkTime} onChange={handleChange}/>
					<input type="time" name="endWorkTime" value={formData.endWorkTime} onChange={handleChange}/>
				</div>	
				<div className="form-bulk">
					<div className="input-name"><p>Pensja</p></div>
					<input type="number" name="salary" value={formData.salary} onChange={handleChange}/>
				</div>
				<div className="form-bulk">
					<div className="input-name"><p>Maszyna</p></div>
					<input type="text" name="machine" value={formData.machine} onChange={handleChange}/>
				</div>	
				<button type="submit">{buttonText}</button>
			</form>
		</div>
	)
}

export default WorkersPanel;
export const myVariable = 'Hello from config.js!';
